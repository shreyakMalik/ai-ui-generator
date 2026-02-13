import { UIComponentNode } from "../types/ui"

export function isValidNode(node: UIComponentNode): boolean {
  switch (node.type) {
    case "Navbar":
      return typeof node.props?.title === "string"

    case "Button":
      return typeof node.props?.label === "string"

    case "Card":

      return true

    default:
      return false
  }
}


export function validateTree(
  nodes: UIComponentNode[] | null
): UIComponentNode[] | null {
  if (!nodes) return null

  return nodes
    .filter(isValidNode)
    .map((node) => {
      if (node.type === "Card" && node.children) {
        return {
          ...node,
          children: validateTree(node.children) ?? []
        }
      }
      return node
    })
}
