export function explainerPrompt(
  uiPlanJson: string,
  userPrompt: string
) {
  return `
You are a UI Explainer agent.

Your job:
- Explain why each component was chosen
- Explain layout decisions
- Explain how the UI satisfies the user's request

User request:
"${userPrompt}"

UI Plan:
${uiPlanJson}

Explain in clear, simple English.
Do NOT mention code.
`
}