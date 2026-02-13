import React from "react"
import Navbar from "./Navbar"
import Card from "./Card"
import Button from "./Button"
import type { UIComponentNode } from "../types/ui"

type LivePreviewProps = {
  plan: UIComponentNode[] | null
}

function renderNode(
  node: UIComponentNode,
  index: number
): React.ReactNode {
  switch (node.type) {
    case "Navbar":
      return <Navbar key={index} title={node.props.title} />

    case "Card":
      return (
        <Card key={index} title={node.props?.title ?? "Card"}>
          {node.children?.map(renderNode)}
        </Card>
      )

    case "Button":
      return <Button key={index} label={node.props.label} />

    default:
      return null
  }
}

export default function LivePreview({ plan }: LivePreviewProps) {
  if (!plan) {
    return (
      <div style={{ color: "#999" }}>
        No UI generated yet. Describe a UI and click “Generate UI”.
      </div>
    )
  }

  if (plan.length === 0) {
    return (
      <div style={{ color: "#c00" }}>
        AI output was invalid. Nothing to render.
      </div>
    )
  }

  return (
    <div style={{ padding: 8 }}>
      {plan.map(renderNode)}
    </div>
  )
}
