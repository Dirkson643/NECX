export default function Card({ name, image }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center">
      {image && <img src={image} alt={name} className="w-40 h-56 object-cover rounded-xl mb-2" />}
      <h2 className="text-lg font-semibold">{name}</h2>
    </div>
  );
}
