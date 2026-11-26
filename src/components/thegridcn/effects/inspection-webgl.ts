import {
  defaultEffectPalette,
  type EffectPalette,
  placeCanvasOverlay,
} from "./html-canvas-surface";

const vertexShader = `
  attribute vec2 p;
  varying vec2 vUv;
  void main() {
    vUv = vec2(p.x * .5 + .5, .5 - p.y * .5);
    gl_Position = vec4(p, 0., 1.);
  }
`;

const header = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D beforePanel;
  uniform vec2 size;
  uniform vec4 control;
  uniform float radius;
  uniform float effectStrength;
  uniform vec3 themeAccent;
  uniform vec3 themeBackground;
  uniform vec3 themeForeground;
  uniform vec3 themeSecondary;

  vec2 unit(vec2 xy) {
    return clamp(xy / size, vec2(.001), vec2(.999));
  }
`;

const lensShader =
  header +
  `
  void main() {
    vec2 pixel = vUv * size;
    vec2 target = control.xy * size;
    vec2 center = clamp(target, vec2(radius + 3.), size - radius - 3.);
    vec2 d = pixel - center;
    float r = length(d) / radius;
    if (r > 1.07) {
      gl_FragColor = vec4(0.);
      return;
    }

    // A raised, curved surface: the center stays readable, the bevel bends
    // and disperses light. Each channel samples the actual HTML texture.
    vec2 normal = d / max(1., length(d));
    float bevel = smoothstep(.65, .99, r);
    float dispersive = bevel * bevel * effectStrength;
    float crop = radius / control.z;
    vec2 sampleCenter = clamp(target, vec2(crop), size - crop);
    vec2 bent = sampleCenter + d * (1. + .53 * dispersive) / control.z;
    vec2 fringe = normal * (9.0 * dispersive);
    vec4 source = texture2D(beforePanel, unit(bent));
    vec3 refracted = vec3(
      texture2D(beforePanel, unit(bent - fringe)).r,
      source.g,
      texture2D(beforePanel, unit(bent + fringe)).b
    );
    vec3 shade = mix(themeBackground, refracted, source.a);
    shade = mix(shade, shade * .87 + themeAccent * .13, bevel);
    #ifdef CONTRAST_LENS
    float luminance = dot(source.rgb, vec3(.2126, .7152, .0722));
    shade = mix(themeBackground, themeForeground, smoothstep(.045, .43, luminance) * source.a);
    shade += themeAccent * .055 * bevel;
    #endif
    float glass = 1. - smoothstep(.982, 1.005, r);
    float edge = 1. - smoothstep(.006, .025, abs(r - .985));
    float specular = pow(max(0., dot(normal, vec2(-.62, -.78))), 5.);
    float reflection = exp(-abs(r - .90) * 46.) * specular;
    float innerCaustic = exp(-abs(r - .82) * 42.) * specular;
    float tick = step(.96, cos(atan(d.y, d.x) * 18.)) *
      (1. - smoothstep(.016, .035, abs(r - .90)));
    float halo = exp(-abs(r - 1.02) * 40.) * (1. - step(1.068, r));
    vec3 color = shade * glass + themeAccent * (edge * (.55 + .52 * specular) + reflection * .60 + innerCaustic * .17 + tick * .26 + halo * .21);
    gl_FragColor = vec4(color, max(glass, max(edge, halo * .28)));
  }
`;

const revealShader =
  header +
  `
  uniform sampler2D afterPanel;

  vec4 sampleState(vec2 px, float edge) {
    vec2 grid = unit(px);
    return mix(texture2D(beforePanel, grid), texture2D(afterPanel, grid), step(px.x, edge));
  }

  float inkChange(vec2 px) {
    vec2 uv = unit(px);
    vec3 difference = abs(texture2D(afterPanel, uv).rgb - texture2D(beforePanel, uv).rgb);
    return max(difference.r, max(difference.g, difference.b));
  }

  void main() {
    vec2 px = vUv * size;
    float t = control.w;
    if (t <= 0. || t >= 1.) {
      gl_FragColor = mix(texture2D(beforePanel, vUv), texture2D(afterPanel, vUv), step(1., t));
      return;
    }
    float extent = min(55., size.x * .11);
    float front = mix(-extent, size.x + extent, 1. - pow(1. - t, 1.15));
    float edge = front + (.5 - vUv.y) * extent * .86;
    float d = px.x - edge;
    vec4 clean = sampleState(px, edge);
    if (abs(d) >= extent) {
      gl_FragColor = clean;
      return;
    }
    float band = 1. - smoothstep(2., extent, abs(d));
    float stripe = floor(px.y / 5.);
    float wave = sin(stripe * .61 - t * 29.);
    float jitter = step(.68, abs(wave)) * wave;

    // Read the changed glyphs from the two captures instead of accenting
    // every pixel under the beam equally. Adjacent taps soften the ink mask.
    float diff = max(inkChange(px), max(
      inkChange(px + vec2(-3., 1.5)),
      inkChange(px + vec2(3., -1.5))
    ));
    float change = smoothstep(.055, .50, diff);
    float impact = change * (1. - smoothstep(3., extent * .74, abs(d))) * effectStrength;
    float surge = 1. + impact * .92;
    vec2 shift = vec2(24. * sin(d * .125 - px.y * .027) + jitter * 17., 5.5 * sin(stripe * .46 - t * 19.)) * band * surge;
    vec2 warped = px + shift;
    vec4 bent = sampleState(warped, edge);
    float channelShift = band * (5. + 6. * impact);
    vec3 split = vec3(
      sampleState(warped - vec2(channelShift, 0.), edge).r,
      bent.g,
      sampleState(warped + vec2(channelShift, 0.), edge).b
    );
    float scanline = .50 + .50 * step(.44, fract(px.y * .27));
    float core = exp(-abs(d) * .32);
    float echo = exp(-abs(d + 12. + wave * 3.) * .19);
    vec3 highlight = mix(themeAccent, themeForeground, .32);
    vec3 color = mix(clean.rgb, split, band) + themeAccent * (core * .71 + echo * .22 + band * scanline * .14);
    color += highlight * impact * (.29 + core * .27 + echo * .19);
    gl_FragColor = vec4(color, max(clean.a, max(bent.a * band, core * .85)));
  }
`;

// These modes keep the same pair of live raster captures as Scan Reveal.
const pulseShader =
  header +
  `
  uniform sampler2D afterPanel;
  void main() {
    float t = control.w;
    vec4 before = texture2D(beforePanel, vUv);
    vec4 after = texture2D(afterPanel, vUv);
    if (t <= 0. || t >= 1.) {
      gl_FragColor = mix(before, after, step(1., t));
      return;
    }
    vec2 p = vUv * size;
    vec2 origin = size * vec2(.5, .54);
    float maxRadius = length(max(origin, size - origin));
    float front = mix(-24., maxRadius + 42., 1. - pow(1. - t, 1.18));
    float r = length(p - origin);
    float d = r - front;
    float wave = exp(-abs(d) * .11) * effectStrength;
    vec2 ray = (p - origin) / max(r, 1.);
    vec2 shift = ray * sin(d * .21) * wave * 15.;
    vec4 oldPixel = texture2D(beforePanel, unit(p + shift));
    vec4 newPixel = texture2D(afterPanel, unit(p - shift));
    vec4 base = mix(oldPixel, newPixel, 1. - smoothstep(-2., 2., d));
    float core = exp(-abs(d) * .45);
    float echo = exp(-abs(d + 13.) * .34) * .28;
    float lines = .65 + .35 * step(.5, fract(atan(ray.y, ray.x) * 13.));
    vec3 light = themeAccent * (core * .72 + echo * lines + wave * .105);
    gl_FragColor = vec4(base.rgb + light, max(base.a, core * .9));
  }
`;

const pixelsShader =
  header +
  `
  uniform sampler2D afterPanel;
  float hash(vec2 v) {
    return fract(sin(dot(v, vec2(127.1, 311.7))) * 43758.5453);
  }
  void main() {
    float t = control.w;
    if (t <= 0. || t >= 1.) {
      gl_FragColor = mix(texture2D(beforePanel, vUv), texture2D(afterPanel, vUv), step(1., t));
      return;
    }
    vec2 p = vUv * size;
    float tile = clamp(size.x / 25., 12., 27.);
    vec2 index = floor(p / tile);
    vec2 center = (index + .5) * tile;
    float seed = hash(index);
    float order = .17 + .44 * center.x / size.x + .13 * center.y / size.y + .15 * seed;
    float d = t - order;
    float active = 1. - smoothstep(.015, .105, abs(d));
    vec2 sampleUV = unit(mix(p, center, active * .93));
    vec4 before = texture2D(beforePanel, sampleUV);
    vec4 after = texture2D(afterPanel, sampleUV);
    vec4 base = mix(before, after, step(0., d));
    vec2 tileUV = fract(p / tile);
    float margin = min(min(tileUV.x, 1. - tileUV.x), min(tileUV.y, 1. - tileUV.y));
    float edge = 1. - smoothstep(.02, .07, margin);
    vec3 color = base.rgb * (1. - active * .48);
    color += themeAccent * active * (.045 + seed * .17 + edge * .38) * effectStrength;
    gl_FragColor = vec4(color, max(base.a, active * edge));
  }
`;

const prismShader =
  header +
  `
  uniform sampler2D afterPanel;
  void main() {
    float t = control.w;
    if (t <= 0. || t >= 1.) {
      gl_FragColor = mix(texture2D(beforePanel, vUv), texture2D(afterPanel, vUv), step(1., t));
      return;
    }
    vec2 p = vUv * size;
    vec2 normal = normalize(vec2(1., -.38));
    float diagonal = abs(normal.y) * size.y;
    float width = clamp(size.x * .15, 32., 95.);
    float progress = t * t * (3. - 2. * t);
    float crease = mix(-diagonal - width, normal.x * size.x + width, progress);
    float d = dot(p, normal) - crease;
    float fold = 1. - smoothstep(0., width, abs(d));
    float ridge = exp(-abs(d) * .24);
    vec4 oldClean = texture2D(beforePanel, vUv);
    vec4 newClean = texture2D(afterPanel, vUv);
    if (fold <= 0.) {
      gl_FragColor = mix(newClean, oldClean, step(0., d));
      return;
    }
    vec2 bend = normal * (fold * fold * width * .55 * effectStrength);
    vec4 front = texture2D(beforePanel, unit(p + bend));
    vec4 back = texture2D(afterPanel, unit(p - bend * .34));
    vec4 surface = mix(back, front, smoothstep(-1., 1., d));
    float dispersion = fold * 6. * effectStrength;
    float litFace = smoothstep(0., width * .28, d) * fold;
    vec3 facets = vec3(
      mix(back.r, texture2D(beforePanel, unit(p + bend + normal * dispersion)).r, step(0., d)),
      surface.g,
      mix(texture2D(afterPanel, unit(p - bend * .34 - normal * dispersion)).b, front.b, step(0., d))
    );
    vec3 shade = facets * (1. - fold * (.46 - .25 * step(0., d)));
    shade += themeAccent * ridge * .72 + themeSecondary * litFace * .3;
    gl_FragColor = vec4(shade, max(surface.a, ridge * .78));
  }
`;

// Each field returns signed distance from its moving front in CSS pixels,
// followed by the texture displacement around that front.
function protocolShader(field: string) {
  return (
    header +
    `
    uniform sampler2D afterPanel;
    void main() {
      float t = control.w;
      if (t <= 0. || t >= 1.) {
        gl_FragColor = texture2D(beforePanel, vUv);
        if (t >= 1.) gl_FragColor = texture2D(afterPanel, vUv);
        return;
      }
      vec2 p = vUv * size;
      vec2 c = p - size * .5;
      float d;
      vec2 shift;
      float trim = 1.;
      ${field}
      float envelope = smoothstep(0., .06, t) * (1. - smoothstep(.94, 1., t));
      float strength = effectStrength * envelope;
      vec4 oldState = texture2D(beforePanel, unit(p + shift * strength));
      vec4 nextState = texture2D(afterPanel, unit(p - shift * strength * .35));
      vec4 panel = mix(nextState, oldState, smoothstep(-1., 1., d));
      float edge = exp(-abs(d) * .5);
      float wake = exp(-abs(d + 6.) * .12) * .38;
      vec3 light = (themeAccent * edge + themeSecondary * wake) * trim * strength;
      gl_FragColor = vec4(panel.rgb + light, max(panel.a, edge * min(strength, 1.)));
    }`
  );
}

const lightcycleShader = protocolShader(`
  float lane = floor(p.y / 24.);
  float bend = mod(lane, 3.) * 26.;
  float turn = clamp(mod(p.y, 24.) - 9., 0., 6.) * 2.;
  d = p.x + bend + turn - mix(-16., size.x + 80., t);
  float stripe = exp(-abs(mod(p.y, 24.) - 12.) * .42);
  trim = .35 + stripe * 1.6;
  shift = vec2(exp(-abs(d + 10.) * .04) * (8. + 18. * stripe), 0.);
`);
const discShader = protocolShader(`
  float r = length(c);
  float angle = fract(atan(c.x, -c.y + .0001) / 6.2831853 + 1.);
  d = (angle - t) * max(r, 12.) * 6.2831853;
  trim = .45 + .75 * pow(.5 + .5 * cos(r * .35), 3.);
  shift = vec2(-c.y, c.x) / max(r, 1.) * exp(-abs(d) * .06) * 18.;
`);
const rezShader = protocolShader(`
  float col = floor(p.x / 9.);
  float delay = fract(sin(col * 78.23) * 4375.);
  d = p.y - size.y * (t * 1.5 - .45 * delay) - t * 16.;
  float strip = exp(-abs(d) * .035);
  shift = vec2(0., strip * (12. + delay * 44.));
  trim = .3 + .7 * step(.26, fract(p.x / 9.));
`);
const gateShader = protocolShader(`
  float notch = clamp((abs(c.y) - size.y * .19) * .7, 0., 18.);
  float side = c.x + notch;
  d = abs(side) - t * (size.x * .5 + 21.);
  shift = vec2(-sign(side) * (t * size.x * .44) * step(0., d), 0.);
  trim = .75 + .25 * step(.5, fract(p.y / 7.));
`);

export type InspectionMode =
  | "lightcycle"
  | "disc"
  | "rez"
  | "gate"
  | "contrast"
  | "lens"
  | "pixel"
  | "prism"
  | "pulse"
  | "reveal";
const shaders: Record<InspectionMode, string> = {
  contrast: `#define CONTRAST_LENS 1\n${lensShader}`,
  disc: discShader,
  gate: gateShader,
  lens: lensShader,
  lightcycle: lightcycleShader,
  pixel: pixelsShader,
  prism: prismShader,
  pulse: pulseShader,
  reveal: revealShader,
  rez: rezShader,
};

interface RenderFrame {
  height: number;
  palette?: EffectPalette;
  pixelHeight: number;
  pixelWidth: number;
  progress?: number;
  radius?: number;
  strength?: number;
  width: number;
  x?: number;
  y?: number;
  zoom?: number;
}

export function normalizeInspectionStrength(value: number) {
  return Number.isFinite(value) ? Math.min(2, Math.max(0, value)) : 1;
}

function compile(gl: WebGLRenderingContext, kind: number, code: string) {
  const shader = gl.createShader(kind);
  if (!shader) {
    return null;
  }
  gl.shaderSource(shader, code);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  }
  gl.deleteShader(shader);
  return null;
}

export function makeInspectionWebGL(
  stage: HTMLElement,
  mode: InspectionMode,
  onLoss: () => void
) {
  const canvas = document.createElement("canvas");
  let gl: WebGLRenderingContext | null;
  try {
    gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: false,
    });
  } catch {
    return null;
  }
  if (!gl) {
    return null;
  }
  const context = gl;
  const program = gl.createProgram();
  const vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, shaders[mode]);
  const buffer = gl.createBuffer();
  const textures = [gl.createTexture(), gl.createTexture()] as const;
  const lose = gl.getExtension("WEBGL_lose_context");

  function free() {
    context.deleteProgram(program);
    context.deleteBuffer(buffer);
    for (const texture of textures) {
      context.deleteTexture(texture);
    }
    lose?.loseContext();
  }

  if (program && vertex && fragment) {
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
  }
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);
  if (
    !(
      program &&
      buffer &&
      textures[0] &&
      textures[1] &&
      gl.getProgramParameter(program, gl.LINK_STATUS)
    )
  ) {
    free();
    return null;
  }

  // biome-ignore lint/correctness/useHookAtTopLevel: WebGL program binding, not a React hook.
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );
  const position = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const size = gl.getUniformLocation(program, "size");
  const control = gl.getUniformLocation(program, "control");
  const radius = gl.getUniformLocation(program, "radius");
  const strength = gl.getUniformLocation(program, "effectStrength");
  const themeAccent = gl.getUniformLocation(program, "themeAccent");
  const themeBackground = gl.getUniformLocation(program, "themeBackground");
  const themeForeground = gl.getUniformLocation(program, "themeForeground");
  const themeSecondary = gl.getUniformLocation(program, "themeSecondary");
  gl.uniform1i(gl.getUniformLocation(program, "beforePanel"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "afterPanel"), 1);
  const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);

  for (const [index, texture] of textures.entries()) {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array(4)
    );
  }

  canvas.dataset.effectRenderer = "webgl";
  canvas.dataset.effectMode = mode;
  canvas.addEventListener("webglcontextlost", onLoss);
  placeCanvasOverlay(stage, canvas);

  return {
    canvas,
    dispose() {
      canvas.removeEventListener("webglcontextlost", onLoss);
      canvas.remove();
      free();
    },
    draw(frame: RenderFrame) {
      if (context.isContextLost()) {
        return false;
      }
      if (canvas.width !== frame.pixelWidth) {
        canvas.width = frame.pixelWidth;
      }
      if (canvas.height !== frame.pixelHeight) {
        canvas.height = frame.pixelHeight;
      }
      context.viewport(0, 0, canvas.width, canvas.height);
      context.uniform2f(size, frame.width, frame.height);
      context.uniform4f(
        control,
        frame.x ?? 0,
        frame.y ?? 0,
        frame.zoom ?? 1,
        frame.progress ?? 0
      );
      context.uniform1f(radius, frame.radius ?? 0);
      const value = frame.strength ?? 1;
      context.uniform1f(strength, value);
      const { accent, background, foreground, secondary } =
        frame.palette ?? defaultEffectPalette;
      context.uniform3f(themeAccent, ...accent);
      context.uniform3f(themeBackground, ...background);
      context.uniform3f(themeForeground, ...foreground);
      context.uniform3f(themeSecondary, ...secondary);
      if (canvas.dataset.effectStrength !== String(value)) {
        canvas.dataset.effectStrength = String(value);
      }
      context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
      return true;
    },
    upload(index: 0 | 1, source: HTMLCanvasElement) {
      if (
        context.isContextLost() ||
        source.width > maxTexture ||
        source.height > maxTexture ||
        !source.width ||
        !source.height
      ) {
        return false;
      }
      try {
        context.activeTexture(context.TEXTURE0 + index);
        context.bindTexture(context.TEXTURE_2D, textures[index]);
        context.texImage2D(
          context.TEXTURE_2D,
          0,
          context.RGBA,
          context.RGBA,
          context.UNSIGNED_BYTE,
          source
        );
        return context.getError() === context.NO_ERROR;
      } catch {
        return false;
      }
    },
  };
}
