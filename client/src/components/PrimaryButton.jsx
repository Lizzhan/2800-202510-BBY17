import React from "react";

export default function PrimaryButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-[#FF9A6C] text-white hover:bg-[#f89168] transition ${className}`}
    >
      {children}
    </button>
  );
}
