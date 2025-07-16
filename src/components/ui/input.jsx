
export function Input({ placeholder, onChange }) {
  return <input type="text" placeholder={placeholder} onChange={onChange} style={{
    padding: '8px', width: '100%', borderRadius: '6px', border: '1px solid #ccc'
  }} />;
}
