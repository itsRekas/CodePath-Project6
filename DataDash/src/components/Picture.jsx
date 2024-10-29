import React from 'react';
import { useParams } from 'react-router-dom';

const PictureComponent = ({dashBoardData}) => {
    const { id } = useParams();

    return (
        <div>
            <h3>{dashBoardData[id].title}</h3>
            {dashBoardData[id].media_type === 'image' ? (
            <img src={dashBoardData[id].url} alt={dashBoardData[id].title} />
            ) : (
            <iframe src={dashBoardData[id].url} title={dashBoardData[id].title}></iframe>
            )}
            <p>{dashBoardData[id].date}</p>
            <p>{dashBoardData[id].explanation}</p>y
        </div>
    );
};

export default PictureComponent;
