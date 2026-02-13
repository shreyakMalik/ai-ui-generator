type InputProps = {
  placeholder?: string
}

export default function Input({ placeholder }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      style={{
        padding: 8,
        borderRadius: 4,
        border: "1px solid #ccc",
        width: "100%"
      }}
    />
  )
}