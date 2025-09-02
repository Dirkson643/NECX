export default function Card({ card }) {
  return (
    <div className="rounded-xl shadow-md p-4 bg-white">
      {card.image_url ? (
        <img
          src={card.image_url}
          alt={card.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Image</span>
        </div>
      )}
      <h2 className="mt-4 text-lg font-semibold">{card.name}</h2>
      <p className="text-sm text-gray-600">Category: {card.category_id}</p>
    </div>
  );
}
