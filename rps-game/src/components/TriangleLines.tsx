export default function TriangleLines() {
  return (
    <svg
      viewBox="0 0 200 180"
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="100" y1="160" x2="180" y2="20" stroke="#111827" strokeWidth="12" />
      <line x1="100" y1="160" x2="20" y2="20" stroke="#111827" strokeWidth="12" />
      <line x1="20" y1="20" x2="180" y2="20" stroke="#111827" strokeWidth="12" />
    </svg>
  );
}
