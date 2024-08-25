import React, { useState } from 'react';
import axios from 'axios';
// import './AdminCreate.css';

const AdminCreate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.BACKWEB}/admin/register`, {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        console.log('Admin registered successfully');
      } else {
        console.error('Failed to register admin');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='admin-block-container'>
    <div className="admin-create-container">
      <h2>Create Admin</h2>
      <form className="admin-create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Create Admin</button>
      </form>
    </div>
 </div>
  );
};

export default AdminCreate;
