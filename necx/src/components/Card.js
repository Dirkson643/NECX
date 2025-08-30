import Image from "next/image";

export default function Card({ name, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
      {image ? (
        <Image
          src={image}
          alt={name}
          width={160}
          height={224}
          className="rounded-xl mb-2 object-cover"
        />
      ) : (
        <div className="w-40 h-56 bg-gray-200 flex items-center justify-center rounded-xl mb-2">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}
      <h2 className="text-lg font-semibold text-center">{name || "No Name"}</h2>
    </div>
  );
}
