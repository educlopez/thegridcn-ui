import type { EffectPalette } from "./html-canvas-surface";

// A sheared Voronoi mesh with extra cuts for thin splinters.
type Point = [number, number];

function clipPolygon(poly: Point[], distance: (point: Point) => number) {
  return poly.flatMap((a, k) => {
    const b = poly[(k + 1) % poly.length];
    const da = distance(a);
    const db = distance(b);
    if (da > 0 === db > 0) {
      return da <= 0 ? [a] : [];
    }
    const t = da / (da - db);
    const hit: Point = [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    return da <= 0 ? [a, hit] : [hit];
  });
}

// Front faces sample the actual HTML-in-Canvas raster.
function fractureCells(width: number, height: number) {
  const cols = Math.max(4, Math.round(width / 111));
  const rows = Math.max(4, Math.round(height / 100));
  const wobble = (n: number) => {
    const value = Math.sin(n * 57.713 + 8.219) * 43_758.5453;
    return value - Math.floor(value);
  };
  const sites = Array.from({ length: cols * rows }, (_, i) => [
    (((i % cols) + 0.17 + wobble(i * 2) * 0.66) * width) / cols,
    ((Math.floor(i / cols) + 0.17 + wobble(i * 2 + 1) * 0.66) * height) / rows,
  ]);

  return sites.flatMap(([x, y], i) => {
    let points: Point[] = [
      [0, 0],
      [width, 0],
      [width, height],
      [0, height],
    ];
    for (const [j, [otherX, otherY]] of sites.entries()) {
      if (i === j) {
        continue;
      }
      const dx = otherX - x;
      const dy = otherY - y;
      // A rotated distance metric stretches cells diagonally, without moving
      // the shared edges out of alignment when the shards reassemble.
      const nx = dx * 1.28 + dy * 0.64;
      const ny = dx * 0.64 + dy * 0.94;
      const bisector = (nx * (x + otherX)) / 2 + (ny * (y + otherY)) / 2;
      points = clipPolygon(points, ([px, py]) => px * nx + py * ny - bisector);
    }

    const angle = wobble(i + 421) * Math.PI;
    const cut = ([px, py]: Point) =>
      (px - x) * Math.cos(angle) +
      (py - y) * Math.sin(angle) -
      (wobble(i + 513) - 0.5) * 25;
    const fragments =
      wobble(i + 697) < 0.8
        ? [clipPolygon(points, cut), clipPolygon(points, (p) => -cut(p))]
        : [points];
    return fragments.flatMap((polygon, part) => {
      if (polygon.length < 3) {
        return [];
      }
      const center = polygon.reduce(
        ([cx, cy], [px, py]) => [
          cx + px / polygon.length,
          cy + py / polygon.length,
        ],
        [0, 0]
      );
      const seed = i * 2 + part;
      return [
        {
          points: polygon,
          random: [wobble(seed + 101), wobble(seed + 221), wobble(seed + 377)],
          x: center[0],
          y: center[1],
        },
      ];
    });
  });
}

function createMesh(width: number, height: number) {
  const mesh: number[] = [];
  for (const { x, y, points, random } of fractureCells(width, height)) {
    const back = -0.65 - random[2] * 0.85;
    const vertex = (
      [px, py]: Point,
      z: number,
      face: number,
      normalX = 0,
      normalY = 0,
      edge = 0
    ) => {
      mesh.push(
        px - x,
        py - y,
        z,
        x,
        y,
        ...random,
        face,
        normalX,
        normalY,
        edge
      );
    };
    for (const [i, a] of points.entries()) {
      const b = points[(i + 1) % points.length];
      const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const nx = (b[1] - a[1]) / length;
      const ny = (a[0] - b[0]) / length;
      const edge = Math.abs((x - a[0]) * nx + (y - a[1]) * ny);
      vertex([x, y], 0, 0, 0, 0, edge);
      vertex(a, 0, 0);
      vertex(b, 0, 0);

      vertex([x, y], back, 1, 0, 0, edge);
      vertex(b, back, 1);
      vertex(a, back, 1);

      vertex(a, 0, 2, nx, ny);
      vertex(a, back, 2, nx, ny);
      vertex(b, 0, 2, nx, ny);
      vertex(b, 0, 2, nx, ny);
      vertex(a, back, 2, nx, ny);
      vertex(b, back, 2, nx, ny);
    }
  }
  return new Float32Array(mesh);
}

const vertexShader = `
  attribute vec3 point;
  attribute vec2 center;
  attribute vec3 random;
  attribute vec4 surface;
  uniform vec2 panel;
  uniform vec2 viewport;
  uniform float progress;
  varying vec2 uv;
  varying vec3 normal;
  varying float energy;
  varying float material;
  varying float edgeDistance;

  mat3 swing(float x, float y, float z) {
    float cx = cos(x), sx = sin(x), cy = cos(y), sy = sin(y), cz = cos(z), sz = sin(z);
    mat3 rx = mat3(1., 0., 0., 0., cx, sx, 0., -sx, cx);
    mat3 ry = mat3(cy, 0., -sy, 0., 1., 0., sy, 0., cy);
    mat3 rz = mat3(cz, sz, 0., -sz, cz, 0., 0., 0., 1.);
    return rz * ry * rx;
  }

  void main() {
    vec2 origin = center - panel * .5;
    float arrival = distance(center / panel, vec2(.88, .9)) * .105;
    float release = smoothstep(arrival, arrival + .21 + random.z * .10, progress);
    // Approach the original plane, then lock every fragment on the same beat.
    float approach = smoothstep(.40 + random.x * .13, .87, progress);
    float snap = pow(clamp((progress - .88) / .12, 0., 1.), 3.5);
    float spread = release * (1. - approach * .72) * (1. - snap);
    float slow = sin(progress * 3.14159) * spread;
    vec2 drift = origin / panel * vec2(108., 90.);
    drift += vec2((random.x - .5) * 105., (random.y - .5) * 72.);
    drift *= min(1., panel.x / 650.);
    float depth = mix(-105., 163., random.z) * spread;
    mat3 rotation = swing(
      (random.x - .49) * 2.6 * spread + .3 * slow,
      (random.y - .49) * 2.55 * spread,
      (random.z - .49) * 1.05 * spread
    );
    vec3 world = rotation * vec3(point.xy * (1. - .085 * spread), point.z)
      + vec3(origin + drift * spread, depth);
    float perspective = max(520., panel.x * .73);
    float w = 1. - world.z / perspective;
    gl_Position = vec4(world.x * 2. / viewport.x, world.y * -2. / viewport.y, -world.z / perspective, w);
    uv = (center + point.xy) / panel;
    normal = rotation * (surface.x > 1.5 ? vec3(surface.yz, 0.) : vec3(0., 0., 1. - 2. * surface.x));
    material = surface.x;
    edgeDistance = surface.w;
    energy = spread;
  }
`;

const fragmentShader = `
  precision highp float;
  uniform sampler2D livePanel;
  uniform vec3 themeAccent;
  uniform vec3 themeForeground;
  varying vec2 uv;
  varying vec3 normal;
  varying float energy;
  varying float material;
  varying float edgeDistance;
  void main() {
    vec3 n = normalize(normal);
    float light = max(0., dot(n, normalize(vec3(-.45, -.58, .72))));
    vec3 source = texture2D(livePanel, clamp(uv, 0., 1.)).rgb;
    float glare = pow(max(0., dot(n, normalize(vec3(-.32, -.45, 1.)))), 16.);
    float rim = pow(1. - abs(n.z), 2.2);
    float reflectedEdge = 1. - smoothstep(.22, 1.65, edgeDistance);
    vec2 bend = n.xy * energy * .012;
    vec3 glass = vec3(
      texture2D(livePanel, clamp(uv + bend * .82, 0., 1.)).r,
      texture2D(livePanel, clamp(uv + bend, 0., 1.)).g,
      texture2D(livePanel, clamp(uv + bend * 1.22, 0., 1.)).b
    );
    vec3 lit = mix(glass, glass * .66 + themeAccent * .12, .52) * (.6 + light * .65);
    vec3 gleam = mix(themeAccent, themeForeground, light * .42);
    lit += gleam * (.14 * glare + .09 * rim + reflectedEdge * (.16 + .48 * light));
    vec3 face = mix(source, lit, min(1., energy * 1.28));
    vec3 side = gleam * (.25 + .6 * light) + source * .18;
    vec3 back = face * .70 + themeAccent * energy * .16;
    gl_FragColor = vec4(material > 1.5 ? side : (material > .5 ? back : face), 1.);
  }
`;

export function createShatterRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    depth: true,
  });
  if (!gl) {
    return null;
  }

  const compile = (type: number, code: string) => {
    const shader = gl.createShader(type);
    if (!shader) {
      return null;
    }
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      return shader;
    }
    console.warn(
      "Reboot shader compilation failed",
      gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  };

  const vertex = compile(gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
  const program = gl.createProgram();
  if (vertex && fragment && program) {
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
  }
  if (vertex) {
    gl.deleteShader(vertex);
  }
  if (fragment) {
    gl.deleteShader(fragment);
  }
  if (!(program && gl.getProgramParameter(program, gl.LINK_STATUS))) {
    if (program) {
      console.warn("Reboot shader link failed", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }
    return null;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL program binding is not a React hook.
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  for (const [name, size, offset] of [
    ["point", 3, 0],
    ["center", 2, 3],
    ["random", 3, 5],
    ["surface", 4, 8],
  ] as const) {
    const slot = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(slot);
    gl.vertexAttribPointer(slot, size, gl.FLOAT, false, 48, offset * 4);
  }

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.uniform1i(gl.getUniformLocation(program, "livePanel"), 0);
  const panelUniform = gl.getUniformLocation(program, "panel");
  const viewport = gl.getUniformLocation(program, "viewport");
  const timeline = gl.getUniformLocation(program, "progress");
  const themeAccent = gl.getUniformLocation(program, "themeAccent");
  const themeForeground = gl.getUniformLocation(program, "themeForeground");
  const limit = Math.min(
    gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
    gl.getParameter(gl.MAX_TEXTURE_SIZE)
  );
  let meshWidth = 0;
  let meshHeight = 0;
  let vertices = 0;
  let uploadedVersion = -1;

  return {
    dispose() {
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
    draw(
      source: HTMLCanvasElement,
      progress: number,
      palette: EffectPalette,
      captureVersion: number
    ) {
      if (gl.isContextLost() || source.width > limit || source.height > limit) {
        return false;
      }
      const width = source.clientWidth;
      const height = source.clientHeight;
      const outputWidth = canvas.clientWidth;
      const outputHeight = canvas.clientHeight;
      if (!(width && height && outputWidth && outputHeight)) {
        return false;
      }
      const scale = Math.min(
        source.width / width,
        limit / outputWidth,
        limit / outputHeight
      );
      const w = Math.round(outputWidth * scale);
      const h = Math.round(outputHeight * scale);
      if (canvas.width !== w) {
        canvas.width = w;
      }
      if (canvas.height !== h) {
        canvas.height = h;
      }
      if (meshWidth !== width || meshHeight !== height) {
        meshWidth = width;
        meshHeight = height;
        const mesh = createMesh(width, height);
        gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW);
        vertices = mesh.length / 12;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.enable(gl.DEPTH_TEST);
      // biome-ignore lint/suspicious/noBitwiseOperators: WebGL clear accepts a bit mask.
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      if (captureVersion !== uploadedVersion) {
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source
        );
        uploadedVersion = captureVersion;
      }
      gl.uniform2f(panelUniform, width, height);
      gl.uniform2f(viewport, outputWidth, outputHeight);
      gl.uniform1f(timeline, progress);
      gl.uniform3f(themeAccent, ...palette.accent);
      gl.uniform3f(themeForeground, ...palette.foreground);
      gl.drawArrays(gl.TRIANGLES, 0, vertices);
      return true;
    },
  };
}
