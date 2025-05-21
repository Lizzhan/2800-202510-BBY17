/**
 * A simple component that renders a horizontally scrollable gallery.
 * This is primarily used to display image cards on the Cookbook page.
 * The layout styling is based on examples from Tailwind CSS documentation.
 *
 * @author Lucas Liu
 * @author https://flowbite.com
 */
export default function Gallery({ children }) {
  return (
    <div className="overflow-x-scroll whitespace-nowrap p-4">
      {children}
    </div>
  );
}
