import React, { useState } from 'react';

const LostAndFoundReport = () => {
    const [formData, setFormData] = useState({
        landf: '',
        title: '',
        type: '',
        description: '',
        location: '',
        date: '',
        phone: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'photo' ? e.target.files[0] : value // Handle file separately
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });

        try {
            const response = await fetch('http://localhost:5000/items', {
                method: 'POST',
                body: data,
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit the report');
            }

            const result = await response.json();
            console.log('Report submitted:', result);
        } catch (error) {
            console.error('Error submitting report:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="landf" placeholder="Lost or Found" onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="text" name="type" placeholder="Type" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required />
            <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
            <input type="date" name="date" onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
            <input type="file" name="photo" onChange={handleChange} required />
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default LostAndFoundReport;
