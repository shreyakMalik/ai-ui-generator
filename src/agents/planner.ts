export function plannerPrompt(
  userPrompt: string,
  previousCode?: string
): string {
  return `
You are a UI planning agent.

User request:
${userPrompt}

${
  previousCode
    ? `Previous UI code (for incremental modification):
${previousCode}`
    : "No previous UI exists."
}

Return a JSON plan describing the UI structure.
Only output valid JSON.
`
}
