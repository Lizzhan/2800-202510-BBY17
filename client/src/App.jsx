import Navbar from "./components/topnavbar";
import SearchList from './components/scrollable_pantry';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="p-4 space-y-8">
        <h2 className="text-2xl">Scroll down to test the sticky navbar 👇</h2>

        <scrollable_pantry />

        {/* Dummy content */}
        {Array.from({ length: 30 }).map((_, i) => (
          <p key={i} className="text-gray-700">
            This is paragraph #{i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        ))}
      </main>
    </>
  );
}