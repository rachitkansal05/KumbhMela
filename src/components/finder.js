import React, { useEffect, useState } from 'react';

export default function Finder() {
  const [items, setItems] = useState([]); 
  const [filteredItems, setFilteredItems] = useState([]);
  const [landf, setLandf] = useState('lost'); 
  const [location, setLocation] = useState(''); 
  const [type, setType] = useState(''); 
  useEffect(() => {
    fetchItems(); 
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:5000/items`); 
      const data = await response.json();
      setItems(data); 
      setFilteredItems(data); 
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFilteredItems = items.filter(item => {
      return (
        (landf === '' || item.landf === landf) &&
        (location === '' || item.location === location) &&
        (type === '' || item.type === type)
      );
    });

    setFilteredItems(newFilteredItems); 
  };

  return (
    <div>
      <div className="finder-container">
        <div className="finder-main-content">
          <aside className="finder-sidebar">
            <h2>Search Filters</h2>
            <form onSubmit={handleSubmit}>
              <div className="finder-filter-group">
                <label htmlFor="landf">Lost/Found</label>
                <select
                  id="landf"
                  value={landf}
                  onChange={(e) => setLandf(e.target.value)}
                >
                  <option value="lost">Lost</option>
                  <option value="found">Found</option>
                </select>
              </div>
              <div className="finder-filter-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="">Select Location</option>
                  <option value="railwa">Railway Station</option>
                  <option value="airport">Airport </option>
                  <option value="sangam">Triveni Sangam</option>
                  <option value="park">Chandarshekhar Park</option>
                  {/* Add more locations as needed */}
                </select>
              </div>
              <div className="finder-filter-group">
                <label htmlFor="type">Item Type</label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Select Item Type</option>
                  <option value="bags">Bags</option>
                  <option value="watch">Watches</option>
                  <option value="jewellery">Jewellary</option>
                  {/* Add more item types as needed */}
                </select>
              </div>
              <button type="submit" className="finder-search-btn">Search</button>
            </form>
          </aside>
          <section className="finder-content">
            <h2>Lost and Found Items</h2>
            <div className="finder-item-grid">
              {filteredItems.map(item => (
                <div className="finder-item-card" key={item._id}>
                  <img src={`http://localhost:5000/uploads/${item.photo}`} alt={item.title} />
                  <h3>{item.type}</h3>
                  <p>Location: {item.location}</p>
                  <p>Status: {item.landf === 'lost' ? 'Lost' : 'Found'}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
