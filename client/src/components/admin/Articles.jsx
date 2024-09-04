import React, { useState } from 'react';
import axios from 'axios';

const Articles = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKWEB}/admin/articles`, {
        title,
        image,
        link,
      });
      if (response.status === 200) {
        alert('Article added successfully!');
        setTitle('');
        setImage('');
        setLink('');
      } else {
        alert('Failed to add article.');
      }
    } catch (error) {
      console.error('Error adding article:', error);
      alert('An error occurred while adding the article.');
    }
  };

  return (
    <div className='background-article'>
    <div className="articles-container ">
      <h1 className="header">Add New Article</h1>
      <form className="articles-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Website Link:</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="submit-button">Add Article</button>
      </form>
    </div>
    </div>
  );
};

export default Articles;
