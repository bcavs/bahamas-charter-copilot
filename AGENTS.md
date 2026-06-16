<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Bahamas Charter Copilot

Before product or implementation work, read:

1. `README.md`
2. `docs/05-agent-handoff.md`
3. The specific doc under `docs/` that matches the task

Project constraints:

- First customer: Bahamas charter and tour operators.
- First channel: WhatsApp.
- First product boundary: inbound lead capture and conversion, ending around quote/deposit intent.
- First trust model: copilot, not autonomous bot. Captains approve customer-facing messages.
- Do not start with a marketplace, native app, hotel integration, vacation rental integration, or full booking calendar.
- Keep the UI mobile-first because captains are likely operating from phones.
- Use App Router patterns and read the local Next.js docs in `node_modules/next/dist/docs/` before changing framework-specific code.

Verification before claiming work is complete:

```bash
npm run lint
npm run build
```
