export default function Gallery({ children }) {
  return (
    <div className="overflow-x-scroll whitespace-nowrap p-4">
      {children}
    </div>
  );
}