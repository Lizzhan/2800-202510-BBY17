/**
 * PrimaryButton Component
 *
 * A reusable button component styled with Tailwind CSS.
 * This button features a soft peach background color, black text, and a hover effect
 * that slightly darkens the background. It supports additional custom classes and
 * an optional onClick handler.
 *
 *
 * @component
 * 
 * @param {Object} props - React props
 * @param {function} props.onClick - Function to call when the button is clicked
 * @param {React.ReactNode} props.children - The button label or content
 * @param {string} [props.className=""] - Additional Tailwind CSS classes
 *
 * @returns {JSX.Element} A styled button element
 *
 * @author Kaid Krawchuk
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
