
/**
 * simple component used to export a horizontial scrolling gallery used to display image cards on the cookbook 
 * page. The code was taken from tailwind documentation.
 * @param {*} param0 : imaged card to be used when displaying the recipes in the cookbook page.
 * @author https://flowbite.com
 */
export default function Gallery({ children }) {
  return (
    <div className="overflow-x-scroll whitespace-nowrap p-4">
      {children}
    </div>
  );
}