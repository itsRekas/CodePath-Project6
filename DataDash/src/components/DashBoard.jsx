import React from 'react';

const DashBoard = ({ dashBoard }) => {
  return (
    <div className='dashboard'>
      <h2>Data List</h2>
      <div className='catalog'>
        {dashBoard.length > 0 ? (
          dashBoard.map((ele, index) => (
            <div key={index}>
              <h3>{ele.title}</h3>
              {ele.media_type === 'image' ? (
                <img src={ele.url} alt={ele.title} />
              ) : (
                <iframe src={ele.url} title={ele.title}></iframe>
              )}
              <p>{ele.date}</p>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
