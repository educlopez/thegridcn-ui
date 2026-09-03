<!-- friction-log:agents -->

## Friction log

Contributor and agent papercuts in this repository live as GitHub issues
labeled `friction`, not as files in the tree. A daily Cursor Cloud Agent
investigates them.

When you hit a papercut you cannot — or should not — fix inside the current
change, file it before you forget:

```bash
gh issue create --repo educlopez/thegridcn-ui --title "Friction: …" --label friction --body-file -
```

Full policy and the investigator contract:
[`docs/contributing/friction-log.md`](docs/contributing/friction-log.md).
Harnesses that load skills on demand read the same policy from
`.claude/skills/friction-log/SKILL.md` or
`.cursor/skills/friction-log/SKILL.md`.
