import { useState } from "react"
import Navbar from "./components/Navbar"
import LivePreview from "./components/LivePreview"
import { runAgent } from "./lib/ai"
import type { UIComponentNode } from "./types/ui"
import { validateTree } from "./lib/validateUI"


type Snapshot = {
  id: number
  parentId: number | null
  prompt: string
  code: string
  plan: UIComponentNode[] | null
  createdAt: string
}

function App() {
  const [userPrompt, setUserPrompt] = useState("")
  const [generatedCode, setGeneratedCode] = useState(
    "// UI generation will go here"
  )
  const [plan, setPlan] = useState<UIComponentNode[] | null>(null)

  
  const [history, setHistory] = useState<Snapshot[]>([])


  const [activeSnapshotId, setActiveSnapshotId] =
    useState<number | null>(null)

  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!userPrompt.trim()) return
    setLoading(true)

    
    const baseSnapshot = history.find(
      (s) => s.id === activeSnapshotId
    )

    try {
      const result = await runAgent(
        userPrompt,
        baseSnapshot?.code
      )

      const rawPlan = JSON.parse(result.plan).components
      const validatedPlan = validateTree(rawPlan)

      const newSnapshot: Snapshot = {
        id: history.length + 1,
        parentId: activeSnapshotId,
        prompt: userPrompt,
        code: result.code,
        plan: validatedPlan,
        createdAt: new Date().toLocaleTimeString()
      }

      
      setHistory((prev) => [...prev, newSnapshot])

      setActiveSnapshotId(newSnapshot.id)

    
      setGeneratedCode(newSnapshot.code)
      setPlan(newSnapshot.plan)
    } catch (err) {
      console.error(err)
      setGeneratedCode("// Error generating UI")
      setPlan(null)
    }

    setLoading(false)
  }


  function rollbackTo(snapshot: Snapshot) {
    setActiveSnapshotId(snapshot.id)
    setGeneratedCode(snapshot.code)
    setPlan(snapshot.plan)
  }

  return (
    <div style={{ height: "100vh", padding: 12 }}>
      <Navbar title="AI UI Generator" />

      <div style={{ display: "flex", marginTop: 12 }}>
        <div
          className="panel"
          style={{ width: "30%", padding: 12, marginRight: 12 }}
        >
          <h3>User Prompt</h3>

          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Describe the UI you want..."
            style={{ width: "100%", height: 120 }}
          />

          <button
            style={{ marginTop: 8 }}
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate UI"}
          </button>

          <p style={{ fontSize: 13, marginTop: 8 }}>
            Each generation creates an immutable snapshot.
            Rollback changes the base for future generations.
          </p>

          <h4 style={{ marginTop: 16 }}>Generation History</h4>

          {history.length === 0 && (
            <div style={{ color: "#888" }}>
              No generations yet
            </div>
          )}

          {history.map((snap) => (
            <button
              key={snap.id}
              onClick={() => rollbackTo(snap)}
              className={`version-btn ${
                snap.id === activeSnapshotId ? "active" : ""
              }`}
              style={{ marginTop: 6, textAlign: "left" }}
            >
              <strong>
                {snap.id === activeSnapshotId ? "▶ " : "↩ "}
                Snapshot {snap.id}
              </strong>
              <div style={{ fontSize: 12 }}>
                {snap.createdAt}
              </div>
              {snap.parentId && (
                <div style={{ fontSize: 11, color: "#666" }}>
                  based on #{snap.parentId}
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="panel" style={{ width: "70%", padding: 12 }}>
          <h3>Generated Code</h3>
          <textarea
            readOnly
            value={generatedCode}
            style={{
              width: "100%",
              height: 300,
              fontFamily: "monospace"
            }}
          />
        </div>
      </div>

      <div className="panel" style={{ marginTop: 12, padding: 12 }}>
        <h3>Live Preview</h3>
        <LivePreview plan={plan} />
      </div>
    </div>
  )
}

export default App
