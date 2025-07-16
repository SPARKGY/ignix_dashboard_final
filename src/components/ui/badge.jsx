
export function Badge({ children, variant }) {
  const style = {
    padding: '4px 8px',
    borderRadius: '8px',
    backgroundColor: variant === 'destructive' ? '#dc2626' : '#16a34a',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '0.8rem',
  };
  return <span style={style}>{children}</span>;
}
