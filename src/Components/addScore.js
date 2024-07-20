import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addTask } from '../reducer/addUser';
import "./styles/addScore.css";

function AddScorePopup({ show, setShow }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    userName: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    if (data.userName.trim() && data.time.trim()) {
      dispatch(addTask({ id: nanoid(), data }));
      setData({
        userName: '',
        time: '',
      });
    setShow(!show)
    }else{
       alert("Please Add Data")
    }

  };

  return (
    <div className='addScorePopUp'>
      <div className='addUserForm'>
        <div className='closeButton'>
          <button onClick={() => setShow(!show)} className='closeShow'>X</button>
        </div>
        <form >
          <span>
            <label htmlFor="userName">User Name</label>
            <input
              type="text"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              id="userName"
              placeholder='Enter User Name'
            />
          </span>
          <span>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              value={data.time}
              onChange={handleChange}
              id="time"
              placeholder='Enter Time in MM:SS:MSS'
            />
          </span>
        </form>
        <button onClick={handleSubmitData} type="submit">Submit</button>
       
      </div>
    </div>
  );
}

export default AddScorePopup;
