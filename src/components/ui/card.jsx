
export function Card({ children }) {
  return <div style={{ border: '1px solid #ccc', borderRadius: '12px', backgroundColor: 'white', color: 'black' }}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}
