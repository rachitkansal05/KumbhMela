import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Showcaselostandfound() {
  const navigate = useNavigate();

  const [isActive, setIsActive] = useState(false);
  const [reportData, setReportData] = useState({
    type: '',
    landf: '',
    location: '',
    contact: '',
    date: '',
    photo: null,
    description: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const openForm = () => {
    setIsActive(true);
  };


  const closeForm = () => {
    setIsActive(false);
    setReportData({
      type: '',
      landf: '',
      location: '',
      contact: '',
      date: '',
      photo: null,
      description: '',
    }); 
  };

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    setReportData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    // Example of simple validation
    if (!reportData.landf || !reportData.contact) {
      setError('Item and contact number are required fields.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('type', reportData.type);
    formData.append('landf', reportData.landf);
    formData.append('location', reportData.location);
    formData.append('date', reportData.date);
    formData.append('contact', reportData.contact);
    formData.append('description', reportData.description);
    if (reportData.photo) {
      formData.append('photo', reportData.photo);
    }

    try {
      const response = await fetch('http://localhost:5000/items', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit the report.');
      }

      const result = await response.json();
      alert('Report submitted successfully!'); 
      closeForm(); 
      console.log('Report Submitted:', result); 
    } catch (err) {
      setError('Failed to submit the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <>
      <div>
        <div className="content">
          <div className="rotate">
            Follow us
            <i className="fa-brands fa-instagram space5px"></i>
            <i className="fa-brands fa-twitter space5px"></i>
          </div>
          <div className="guide-section">
            <div className="line-text">
              <span className="line"></span>
              <span className="guide-title">Fast and Efficient</span>
              <span className="line"></span>
            </div>
            <h1>Lost and Found Near You !!</h1>

            <div className="form-container">
              <div>
                <label htmlFor="itemType">
                  <i className="fa-solid fa-circle-chevron-right"></i> Lost What :
                </label>
                <select id="itemType" name="landf" value={reportData.landf} onChange={handleChange}>
                  <option value="Phone">Phone</option>
                  <option value="Person">Person</option>
                  <option value="Wallet">Wallet</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Jewellery">Jewellery</option>
                  <option value="others">Others</option>
                </select>

                <label htmlFor="location">
                  <i className="fa-solid fa-circle-chevron-right"></i> Location :
                </label>
                <select id="location" name="location" value={reportData.location} onChange={handleChange}>
                  <option value="Railway-station">Railway-station</option>
                  <option value="Sangam">Sangam</option>
                  <option value="Company-museum">Company-museum</option>
                  <option value="Civil-lines">Civil-lines</option>
                  <option value="Bus-Stand">Bus-Stand</option>
                  <option value="others">Others</option>
                </select>
                <br />
              </div>

              <div className="button-container">
              <button className="btn-primary lost-btn" onClick={() => navigate('/finder')}>Find</button>
              </div>
              <div className="padding-5">
                <label htmlFor="reportLostFound">
                  <i className="fa-solid fa-circle-chevron-right"></i> Want to Report a Lost or Found Item?{' '}
                </label>
                <div className="button-container">
                  <button className="btn-primary lost-btn" onClick={openForm}>
                    Report Here
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="notvisible">Scroll Down</p>
          </div>
        </div>
      </div>

      <div>
        <div className={`unique-report-form ${isActive ? 'active' : ''}`}>
          <button className="unique-close-button" onClick={closeForm}>
            &times;
          </button>{' '}
          {/* Close button */}
          <h2>Report Issue</h2>
          <form className="unique-form" onSubmit={handleSubmit}>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {loading && <p className="loading-message">Loading...</p>} {/* Display loading message */}

            <select
              className="unique-select"
              name="landf"
              value={reportData.landf}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Lost/Found
              </option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>

            <select
              className="unique-select"
              name="type"
              value={reportData.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Item Type
              </option>
              <option value="Phones & Tablets">Phones & Tablets</option>
              <option value="Bags">Bags</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Watches">Watches</option>
              <option value="People">People</option>
              <option value="Documents">Documents</option>
              <option value="Keys">Keys</option>
              <option value="Toys">Toys</option>
              <option value="Laptop">Laptop</option>
              <option value="Fashion Accessories">Fashion Accessories</option>
              <option value="Clothes & Shoes">Clothes & Shoes</option>
              <option value="Pets">Pets</option>
              <option value="Sports Equipment">Sports Equipment</option>
              <option value="Other">Other</option>
              <option value="Automobile">Automobile</option>
            </select>

            <textarea
              className="unique-input"
              name="description"
              placeholder="Description"
              required
              value={reportData.description}
              onChange={handleChange}
            ></textarea>

            <select
              className="unique-select"
              name="location"
              value={reportData.location}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="Triveni Sangam">Triveni Sangam</option>
              <option value="Railway Station">Railway Station</option>
              <option value="Airport">Airport</option>
              <option value="Chandrashekhar Azad Park">Chandrashekhar Azad Park</option>
            </select>

            <label className="unique-label" htmlFor="date">
              Date of Submission (dd-mm-yyyy):
            </label>
            <input
              className="unique-input"
              type="date"
              id="date"
              name="date"
              required
              value={reportData.date}
              onChange={handleChange}
            />

            <input
              className="unique-input"
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            <input
              className="unique-input"
              type="text"
              name="contact"
              placeholder="+91 XXXXXXXXXX"
              required
              value={reportData.contact}
              onChange={handleChange}
            />

            <button className="btn-primary lost-btn new-btn" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
