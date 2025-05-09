import Navbar from "./components/topnavbar";
import GalleryContainer from "./components/GalleryContainer";
import Footbar from "./components/footbar";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-4 pb-24 bg-tiled">
        <h2 className="text-2xl">Scroll down to test the sticky navbar 👇</h2>

        <GalleryContainer />

        <GalleryContainer />

        {/* Dummy content */}
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-black">
            This is paragraph #{i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </main>
      <Footbar />
    </>
  );
}