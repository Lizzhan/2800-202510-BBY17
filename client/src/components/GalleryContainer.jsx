import Gallery from "./gallery";
import PhotoCard from "./imagecard";

export default function GalleryContainer() {
  const dummyPhotos = [
    { id: 1, imageUrl: "https://picsum.photos/id/1011/400/300", caption: "Mountain View" },
    { id: 2, imageUrl: "https://picsum.photos/id/1015/400/300", caption: "Forest Path" },
    { id: 3, imageUrl: "https://picsum.photos/id/1025/400/300", caption: "Cute Dog" },
    { id: 4, imageUrl: "https://picsum.photos/id/1035/400/300", caption: "Beach Sunset" },
    { id: 5, imageUrl: "https://picsum.photos/id/1040/400/300", caption: "City Skyline" },
  ];

  return (
    <Gallery>
      {dummyPhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          imageUrl={photo.imageUrl}
          caption={photo.caption}
        />
      ))}
    </Gallery>
  );
}
