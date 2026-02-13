import axios from "axios"
import { plannerPrompt } from "../agents/planner"
import { generatorPrompt } from "../agents/generator"
import { explainerPrompt } from "../agents/explainer"

const LLM_API_KEY = import.meta.env.VITE_LLM_API_KEY

const client = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    Authorization: `Bearer ${LLM_API_KEY}`,
    "Content-Type": "application/json"
  }
})

async function callLLM(prompt: string): Promise<string> {
  const res = await client.post("/chat/completions", {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0
  })

  return res.data.choices[0].message.content
}

export async function runAgent(
  userPrompt: string,
  previousCode?: string
): Promise<{
  plan: string
  code: string
  explanation: string
}> {
  const plan = await callLLM(
    plannerPrompt(userPrompt, previousCode)
  )

  const code = await callLLM(
    generatorPrompt(plan, previousCode)
  )

  const explanation = await callLLM(
    explainerPrompt(plan, userPrompt)
  )

  return {
    plan,
    code,
    explanation
  }
}
