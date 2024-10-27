import React, { useState } from 'react';
import { Search, MapPin, Star, Award, Heart, Filter, Menu, ChevronDown, Sliders, Camera, Clock, Info, X, ExternalLink } from 'lucide-react';

const certificationTypes = {
  HMS: {
    name: "HMS Certified",
    color: "bg-emerald-500 text-white",
    verified: true
  },
  HFSAA: {
    name: "HFSAA Verified",
    color: "bg-emerald-500 text-white",
    verified: true
  },
  userReported: {
    name: "User Reported",
    color: "bg-amber-500 text-white",
    verified: false
  },
  googleListed: {
    name: "Google Listed",
    color: "bg-purple-500 text-white",
    verified: false
  }
};

const restaurants = [
  {
    id: 1,
    name: "Shawarma House",
    image: "/api/placeholder/400/200",
    rating: 4.8,
    reviews: 342,
    category: "Middle Eastern",
    price: "$$",
    neighborhood: "River North",
    certification: "HMS",
    tags: ["Outdoor Seating", "Family Friendly", "Delivery"],
    cuisineTags: ["Shawarma", "Falafel", "Hummus"],
    dietaryTags: ["Halal Certified", "Vegetarian Options"],
    status: "Open",
    hours: "Until 10PM",
    trending: true,
    mustTry: ["Chicken Shawarma", "Mixed Grill Platter"]
  },
  {
    id: 2,
    name: "Kabob Kitchen",
    image: "/api/placeholder/400/200",
    rating: 4.6,
    reviews: 186,
    category: "Persian",
    price: "$$$",
    neighborhood: "Loop",
    certification: "HFSAA",
    tags: ["Takes Reservations", "Waiter Service", "Groups"],
    cuisineTags: ["Persian", "Kebab", "Grilled"],
    dietaryTags: ["Halal Certified", "Gluten-free Options"],
    status: "Closed",
    hours: "Opens at 11AM",
    featured: true,
    mustTry: ["Koobideh Kebab", "Saffron Rice"]
  }
];

const QuickFilter = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
      active 
        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-200' 
        : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    {label}
  </button>
);

const RestaurantCard = ({ restaurant, onOpenDetails, isFavorite, onToggleFavorite }) => {
  const certType = certificationTypes[restaurant.certification];

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img 
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-48 object-cover rounded-t-2xl"
          onClick={() => onOpenDetails(restaurant)}
        />
        {restaurant.trending && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            🔥 Trending
          </div>
        )}
        {restaurant.featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            ⭐️ Featured
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(restaurant.id);
          }}
          className="absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl hover:text-indigo-600 cursor-pointer" onClick={() => onOpenDetails(restaurant)}>
              {restaurant.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 font-medium text-yellow-700">{restaurant.rating}</span>
              </div>
              <span className="text-gray-500">({restaurant.reviews} reviews)</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${certType.color}`}>
            <Award className="w-4 h-4" />
            <span>{certType.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 text-gray-600 font-medium">
          <span>{restaurant.category}</span>
          <span>•</span>
          <span>{restaurant.price}</span>
          <span>•</span>
          <span>{restaurant.neighborhood}</span>
        </div>

        {restaurant.mustTry && (
          <div className="mt-4">
            <div className="text-sm font-medium text-gray-500 mb-2">Must Try:</div>
            <div className="flex flex-wrap gap-2">
              {restaurant.mustTry.map((item, index) => (
                <span key={index} className="px-3 py-1 bg-gradient-to-r from-orange-100 to-rose-100 text-rose-600 rounded-full text-sm font-medium">
                  🍽 {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {restaurant.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div className={`flex items-center gap-2 mt-4 text-sm font-medium ${
          restaurant.status === 'Open' ? 'text-emerald-600' : 'text-gray-600'
        }`}>
          <Clock className="w-4 h-4" />
          <span>{restaurant.status} • {restaurant.hours}</span>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={() => onOpenDetails(restaurant)}
          className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg hover:opacity-90 transition-all duration-200"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

const RestaurantFinder = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Chicago");
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white shadow-lg z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Menu className="w-6 h-6 text-indigo-600" />
              <button className="font-bold text-lg flex items-center gap-1 text-gray-800">
                {selectedCity} <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg transition-all duration-200">
                Sign Up
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search halal restaurants..."
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 rounded-xl text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-4 text-gray-400 w-5 h-5" />
              <button className="absolute right-4 top-2.5 p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Sliders className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              <QuickFilter label="All" active={activeFilter === 'All'} onClick={() => setActiveFilter('All')} />
              <QuickFilter label="Trending" active={activeFilter === 'Trending'} onClick={() => setActiveFilter('Trending')} />
              <QuickFilter label="New" active={activeFilter === 'New'} onClick={() => setActiveFilter('New')} />
              <QuickFilter label="HMS Certified" active={activeFilter === 'HMS'} onClick={() => setActiveFilter('HMS')} />
              <QuickFilter label="Top Rated" active={activeFilter === 'TopRated'} onClick={() => setActiveFilter('TopRated')} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onOpenDetails={setSelectedRestaurant}
              isFavorite={favorites.has(restaurant.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFinder;
