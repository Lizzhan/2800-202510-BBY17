/**
 * PrimaryButton Component
 *
 * A reusable button component styled with Tailwind CSS.
 * This button features a soft peach background color, black text, and a hover effect
 * that slightly darkens the background. It supports additional custom classes and
 * an optional onClick handler.
 *
 *
 *
 * @author Kaid Krawchuk
 * @author https://chat.openai.com/
 */
import React from "react";

export default function PrimaryButton({ onClick, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded bg-[#FF9A6C] text-black hover:bg-[#f89168] transition ${className}`}
    >
      {children}
    </button>
  );
}
