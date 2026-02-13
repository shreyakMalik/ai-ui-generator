export function generatorPrompt(
  plan: string,
  previousCode?: string
): string {
  return `
You are a UI code generator.

UI plan:
${plan}

${
  previousCode
    ? `Existing UI code to modify incrementally:
${previousCode}`
    : "Generate UI code from scratch."
}

Return ONLY valid React component code.
`
}
