import React, { useEffect, useState } from "react";
import './userInfo.css';


const UserInfo = () => {
  const [user, setUser] = useState(null);


  const fetchData = (path) => {
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com${path}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  useEffect(() => {
        fetchData(window.location.pathname);
  },[]);



  if(user){
      return (
        <div className="header">
            <img alt="user img" src={user.imageUrl+"/"+user.id} ></img>
            <fieldset className="left-info">
                <legend>Info</legend>
                <strong>{user.prefix} {user.name} {user.lastName}</strong>
                <div><i>{user.title}</i></div>
                <br></br>
                <div><span>Email</span>": " {user.email}</div>
                <div><span>Ip Address</span>": " {user.ip}</div>
                <div><span>Job Area</span>": " {user.jobArea}</div>
                <div><span>Job Type</span>": " {user.jobType}</div>
            </fieldset>
            <fieldset className="right-info">
                <legend>Address</legend>
                <strong>{user.company.name}</strong>
                <div><span>City</span>": " {user.address.city}</div>
                <div><span>Country</span>": " {user.address.country}</div>
                <div><span>State</span>": " {user.address.state}</div>
                <div><span>Street Address</span>": " {user.address.streetAddress}</div>
                <div><span>ZIP</span>": " {user.address.zipCode}</div>
            </fieldset>
        </div>
      );
  }



}

export default UserInfo
