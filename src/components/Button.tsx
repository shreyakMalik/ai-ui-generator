type ButtonProps = {
  label: string
  onClick?: () => void
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        borderRadius: 6,
        border: "1px solid #ccc",
        background: "#f5f5f5",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  )
}