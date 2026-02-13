type ModalProps = {
  title: string
  children: React.ReactNode
  onClose?: () => void
}

export default function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 16,
          borderRadius: 8,
          width: 300
        }}
      >
        <h3>{title}</h3>
        {children}
        {onClose && <button onClick={onClose}>Close</button>}
      </div>
    </div>
  )
}