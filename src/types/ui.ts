export type NavbarNode = {
  type: "Navbar"
  props: {
    title: string
  }
}

export type CardNode = {
  type: "Card"
  props?: {
    title?: string
  }
  children?: UIComponentNode[]
}

export type ButtonNode = {
  type: "Button"
  props: {
    label: string
  }
}

export type UIComponentNode =
  | NavbarNode
  | CardNode
  | ButtonNode
