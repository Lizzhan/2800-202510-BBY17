import { useState, useRef } from 'react';

export default function InfoFooter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsModalOpen(false);
    }
  };

  return (
    <footer className="w-full bg-sunshineYellow border-t border-kaidBrown p-4">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <p className="text-gray-600">Made By BBY17 - 2025</p>

        <div className="flex gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-buttonPeach text-black px-4 py-2 rounded hover:bg-buttonPeachHover hover:text-black"
          >
            FAQ
          </button>

          <a
            href="https://github.com/Lizzhan/2800-202510-BBY17"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/github-mark.png"
              alt="GitHub"
              className="w-8 h-8"/>
          </a>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOverlayClick}
        >
          <div
            ref={modalRef}
            className="bg-white max-w-2xl w-full rounded shadow-lg"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">FAQ</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6 space-y-4 text-gray-700">
              <div>
                <h4 className="font-semibold">Who made Recipedia?</h4>
                <p>
                  Recipedia was created by Kaid Krawchuk, Lucas Liu, Liam Pickrell, James Smith, and Leslie Zhang as a BCIT CST-COMP2800 Assignment in 2025.
                </p>
              </div>
            </div>
            <div className="p-4 border-t text-center text-sm text-gray-500">Recipedia - 2025</div>
          </div>
        </div>
      )}
    </footer>
  );
}