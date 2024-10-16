import React from 'react';

interface Category {
  name: string;
  color: string;
  hoverColor: string;
}

const categories: Category[] = [
  { name: 'Politics', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700' },
  { name: 'Technology', color: 'bg-green-600', hoverColor: 'hover:bg-green-700' },
  { name: 'Entertainment', color: 'bg-purple-600', hoverColor: 'hover:bg-purple-700' },
  { name: 'Health', color: 'bg-red-600', hoverColor: 'hover:bg-red-700' },
  { name: 'Sports', color: 'bg-yellow-600', hoverColor: 'hover:bg-yellow-700' },
];

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Stay Informed, Stay Ahead
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Dive into our diverse blog covering the latest in politics, technology, entertainment, and much more. Knowledge at your fingertips.
        </p>

        {/* Mapping through the categories array to create buttons */}
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${category.color} text-white px-6 py-2 rounded-lg shadow-md ${category.hoverColor} transition duration-300`}
            >
              Explore {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
