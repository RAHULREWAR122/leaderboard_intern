import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AddScorePopup from "./addScore";
import "./styles/leaderboard.css";
import cars from "./images/cars.png";
import baner from "./images/baner.png"
import { HiOutlineTrophy } from "react-icons/hi2";
import { SiTimescale } from "react-icons/si";

function LeaderBoard() {
  const [show, setShow] = useState(false);
  const [latestEntry, setLatestEntry] = useState(null);
  const data = useSelector((state) => state.data);
  const [countChange, setCountChange] = useState(0);
  const [imageSrc, setImageSrc] = useState(cars);
  const [showImage, setShowImage] = useState(true);
   
  useEffect(() => {
    const interval = setInterval(() => {
      setCountChange(prevCount => prevCount + 1);
      setShowImage(false); 
      setTimeout(() => {
        setImageSrc(prevSrc => (prevSrc === cars ? baner : cars));
        setShowImage(true); 
      }, 700);
    }, 3000);

    return () => clearInterval(interval);
  }, []);


  const handleShowAddPopup = () => {
    setShow(!show);
  };

  let  userData = data && data.map((user) => user.data);

  const sortTasksByTime = (tasks) => {
    return tasks.slice().sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return timeA[0] - timeB[0] || timeA[1] - timeB[1] || timeA[2] - timeB[2];
    });
  };

  const sortedTasks = sortTasksByTime(userData);
  
  useEffect(() => {
    if (latestEntry) {
      const timer = setTimeout(() => {
        sortedTasks.push(latestEntry);
        setLatestEntry(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [latestEntry]);
   
  useEffect(() => {
    if (data.length > 0) {
      setLatestEntry(data[data.length - 1].data);
    }
  }, [data]);

  return (
    <div className="leaderBoard">
      <div>
        <button
          onClick={handleShowAddPopup}
          className={show ? "none" : "addBtnPopUp"}
        >
          {show ? "" : "Add New User"}
        </button>
        {show && <AddScorePopup show={show} setShow={setShow} />}
      </div>

      <div className="bgImg">
      <img
        src={imageSrc}
        alt="banner or cars"
        className={showImage ? 'show' : ''}
      />
      </div>
      <div className="list">
       
      {sortedTasks.length >=1 &&    <div className="list__heading">
          <p>
            <span><HiOutlineTrophy  style={{marginBottom:"-2px" , color:"red", marginLeft:"-10px"}}/></span>
            <span>Name</span>
          </p>
          <span><SiTimescale/></span>
        </div>
       } 
        <ul>
          {sortedTasks.slice(0, 10).map((user, i) => {
            const bgColor =
              i === 0
                ? "#e3d913d8"
                : i === 1
                ? "#dbdbe7e2"
                : i === 2
                ? "#d50e36e3"
                : "#3b3335c4";

            return (
              <li key={i} style={{ backgroundColor: bgColor, transition: "all 0.3s ease" }}>
                <p>
                  <span className="sn">{i + 1}</span>
                  <span className="user">{user.userName}</span>
                </p>
                <span className="time">
                  <span className="price">
                    {i === 0 && "50000"}
                    {i === 1 && "5000"} 
                    {i === 2 && "500"}
                  </span>
                  {user.time}
                </span>
              </li>
            );
          })}
        </ul>

        {latestEntry && (
          <div className="latestEntry">
            <h3 style={{ textAlign: "center" }}>Latest Entry</h3>
            <ul>
              <li style={{ transition: "all 0.3s ease" }}>
                <span>{latestEntry.userName}</span>
                <span>{latestEntry.time}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderBoard;
