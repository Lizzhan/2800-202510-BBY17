export default function PhotoCard({ imageUrl, caption }) {
    return (
      <div className="inline-block w-64 mr-4 relative">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-40 object-cover rounded border border-kaidBrown shadow-lg border-2"
        />
        <div className="absolute bottom-0 left-0 w-full bg-kaidGreen bg-opacity-50 text-white text-sm px-2 py-1 rounded-b border-t border-kaidGreen">
          {caption}
        </div>
      </div>
    );
  }