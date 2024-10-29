import React, { useState, useEffect } from 'react';
import './App.css';
import DashBoard from './components/DashBoard';
import { Route,Routes,useSearchParams} from 'react-router-dom';
import NavBar from './components/NavBar';
import SolarFlare from './components/SolarFlare';
import History from './components/History';
import PictureComponent from './components/Picture';

function App() {
  const [history,setHistory]=useState([]);
  const [dashBoardData, setDashBoardData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [params,setParams] = useSearchParams({n: 10})
  const [itemCount, setItemCount] = useState(params.get("n"));
  const [errorMessage, setErrorMessage] = useState(''); 


  useEffect(() => {
    const fetchData = async () => {
      if (itemCount > 0) {
        setErrorMessage('');
        try {
          const response = await fetch(`https://api.nasa.gov/planetary/apod?count=${itemCount}&thumbs=true&api_key=dKqXO4MSygRAVEPit67IgDlwRaPoQs8OONRzpWWc
`);
          const data = await response.json();
          setDashBoardData(data);
          setHistory([...history, ...data]);
          console.log(data);
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
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<DashBoard dashBoard={filteredData} totalImages={totalImages} totalItems={totalItems} totalVideos={totalVideos} searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} filterType={filterType} setFilterType={setFilterType} itemCount={itemCount} setItemCount={setItemCount} errorMessage={errorMessage}
        setErrorMessage={setErrorMessage} setParams={setParams}/>}/>
        <Route path='/Mars'element={<SolarFlare/>}/>
        <Route path='/History'element={<History history={history} setHistory={setHistory}/>}/>
        <Route path={`picture/:id`} element={<PictureComponent dashBoardData={dashBoardData}/>}/>
        <Route path='*' element={"NotFound"}/>
      </Routes>
    </>
  );
}

export default App;
