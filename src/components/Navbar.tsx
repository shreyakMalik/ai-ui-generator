type NavbarProps = {
  title: string
}

export default function Navbar({ title }: NavbarProps) {
  return (
    <div
      style={{
        padding: 12,
        borderBottom: "1px solid #ddd",
        fontWeight: "bold"
      }}
    >
      {title}
    </div>
  )
}