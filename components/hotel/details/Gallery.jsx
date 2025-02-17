import Image from "next/image";

const Gallery = ({ gallery }) => {
  const newGallery = [...gallery];
  newGallery.shift();

  return (
    <section className="container mt-8">
      <div className="grid grid-cols-2 imageshowCase gap-2 ">
        <Image
          src={gallery[0]}
          className="h-[400px] border-2 border-solid border-black"
          alt="Main Pic"
          width={800}
          height={800}
        />

        <div className="grid grid-cols-2 grid-rows-2 h-[400px] gap-2">
          {newGallery.map((image) => (
            <Image
              key={image}
              src={image}
              className="h-[400px] border-2 border-solid border-black"
              alt="Sub Pic"
              width={400}
              height={400}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
