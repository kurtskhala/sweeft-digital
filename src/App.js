import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Friends from "./friends";
import UserInfo from "./userInfo";


const App = () => {
  let userData = [];

  let pageNum = 1;
  const [users, setUsers] = useState(userData);


  const fetchData = (path, page, number) => {
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/${path}${page}/${number}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        userData = [...userData,...data.list];
        setUsers(userData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
      if(pageNum===1){
        fetchData('user/',pageNum,20);
        pageNum++;
      }
      window.addEventListener('scroll',()=>{
        if(window.scrollY + window.innerHeight >= 
        document.documentElement.scrollHeight-1){
          fetchData('user/',pageNum,20);
          pageNum++;
        }
      })
  }, []);

  const handleClick = (event, n) =>{
    window.location.href=`/user/${n}`;
    
  }


  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={
          <div className="list">
            {users.map(user => (
              <div key={user.id} className="list-item" onClick={event => handleClick(event, user.id)}>
                <img  alt="user img" src={user.imageUrl+"/"+user.id} ></img>
                <div className="list-item-content-description">
                  <strong>{user.prefix} {user.name} {user.lastName}</strong>
                  <p>{user.title}</p>
                </div>
              </div>
            ))}
          </div>
        } />
          <Route path={window.location.pathname} element={
            <div className="user-friends">
              <UserInfo />
              <div>
                
              </div>
              <Friends />
            </div>
          } />
        </Routes>
      </Router>
    </div>
  );



}

export default App
