const Card = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 border border-gray-200 hover:shadow-xl transition">
      <div className="text-4xl text-blue-500">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

export default Card;
