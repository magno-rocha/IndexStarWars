import React, { useState, useEffect } from 'react';
import List from './List';
import logo from './logo.svg';
import { Pagination } from 'semantic-ui-react';
import axios from 'axios';

const numStars = 150;

  for (let i = 0; i < numStars; i++) {
    let star = document.createElement("div");  
    star.className = "star";
    var xy = getRandomPosition();
    star.style.top = xy[0] + 'px';
    star.style.left = xy[1] + 'px';
    document.body.append(star);
  }

  function getRandomPosition() {  
    var y = window.innerWidth;
    var x = window.innerHeight;
    var randomX = Math.floor(Math.random()*x);
    var randomY = Math.floor(Math.random()*y);
    return [randomX,randomY];
  }

  const App = () => {
    const [data, setData] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [apiUrl, setApiUrl] = useState('https://swapi.co/api/people/');
    
    useEffect(() => {
      axios.get(apiUrl).then(response => {
        setData(response.data.results);
      });
    }, [apiUrl]);
    
    const onChange = (i, pageInfo) => {
      setActivePage(pageInfo.activePage);
      setApiUrl('https://swapi.co/api/people/?page=' + pageInfo.activePage.toString());
    };
    
    return (
    <div  className="App">
      <div className="App-Header">
          <img src={logo} className="logo" alt="logo"/>
      </div>
      <div className="mymove">
        <div className="pagination">
          <Pagination 
            activePage={activePage}
            onPageChange={onChange}
            totalPages={9}
            ellipsisItem={null}
            data={data}
          />
        </div>
        <List className="container" data={data}  />
      </div>
      
    </div>);
  };
  



export default App;
