import React, { useState } from 'react';

const items = [
  'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry',
  'Fig', 'Grape', 'Honeydew', 'Kiwi', 'Lemon'
];

export default function SearchList() {
  const [query, setQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        type="text"
        placeholder="Search items..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-4"
      />
      <div className="max-h-60 overflow-y-auto border rounded p-2">
        {filteredItems.map((item, index) => (
          <div key={index} className="p-2 border-b last:border-b-0">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
