export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '300px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&times;</button>
        {children}
      </div>
    </div>
  );
} 