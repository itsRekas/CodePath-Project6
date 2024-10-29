import React, { useState, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';

function App() {
  const [dashBoardData, setDashBoardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [itemCount, setItemCount] = useState(10);
  const [errorMessage, setErrorMessage] = useState(''); 


  useEffect(() => {
    const fetchData = async () => {
      if (itemCount > 0) {
        setErrorMessage('');
        try {
          const response = await fetch(`https://api.nasa.gov/planetary/apod?count=${itemCount}&thumbs=true&api_key=lXUWD7fdnlR8Jigje2V0gAUAC8FpkDucFqdqrN57`);
          const data = await response.json();
          setDashBoardData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setDashBoardData([]);
        setErrorMessage('There is nothing to show. Please enter a number greater than 0.');
      }
    };
    fetchData();
  }, [itemCount]); 


  const totalItems = dashBoardData.length;
  const totalImages = dashBoardData.filter(item => item.media_type === 'image').length;
  const totalVideos = dashBoardData.filter(item => item.media_type === 'video').length;


  const filteredData = dashBoardData
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => (filterType === 'all') || item.media_type === filterType);

  return (
    <div className='cover'>
      <h1>Dashboard</h1>

      <div className="summary">
        <p>Total Items: {totalItems}</p>
        <p>Total Images: {totalImages}</p>
        <p>Total Videos: {totalVideos}</p>
      </div>

      <div className="controls">
        <input 
          type="text" 
          placeholder="Search by title" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      <div className="controls">
        <label htmlFor="itemCount">Number of Items: </label>
        <input 
          type="number" 
          id="itemCount" 
          min="0" 
          value={itemCount} 
          onChange={(e) => setItemCount(Number(e.target.value))}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <DashBoard dashBoard={filteredData} />
    </div>
  );
}

export default App;
