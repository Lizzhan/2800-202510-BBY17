export default function SearchList({ items }) {
  return (
    <div className="max-h-60 overflow-y-auto border rounded p-2 bg-white">
      {items.length === 0 ? (
        <div className="text-gray-500 italic">No ingredients selected.</div>
      ) : (
        items.map((item, index) => (
          <div key={index} className="p-2 border-b last:border-b-0">
            {item}
          </div>
        ))
      )}
    </div>
  );
}
