type CardProps = {
  title?: string
  children: React.ReactNode
}

export default function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12
      }}
    >
      {title && <h3>{title}</h3>}
      {children}
    </div>
  )
}