import React from 'react';
import { Link } from 'react-router-dom';

const DashBoard = ({ dashBoard,totalImages,totalItems,totalVideos, searchTerm, setSearchTerm, setItemCount, setFilterType, itemCount, errorMessage, setParams }) => {
  return (
    <div>
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
          onChange={(e) => {
            setItemCount(Number(e.target.value));
            setParams({n: e.target.value})}}
        />
      </div>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className='dashboard'>
        <h2>Data List</h2>
        <div className='catalog'>
          {dashBoard.length > 0 ? (
            dashBoard.map((ele, index) => (
              <Link to={`picture/${index}`} key={`${ele.title}-${ele.date}-${index}`}>
                <div key={`${ele.title}-${ele.date}-${index}`}>
                  <h3>{ele.title}</h3>
                  {ele.media_type === 'image' ? (
                    <img src={ele.url} alt={ele.title} />
                  ) : (
                    <iframe src={ele.url} title={ele.title}></iframe>
                  )}
                  <p>{ele.date}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
