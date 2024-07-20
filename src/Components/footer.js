import React, { useState, useEffect } from 'react';
import baner from './images/baner.png';
import cars from './images/cars.png';
import './styles/footer.css';

function Footer() {
  const [countChange, setCountChange] = useState(0);
  const [imageSrc, setImageSrc] = useState(baner);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountChange(prevCount => prevCount + 1);
      setShowImage(false); 
      setTimeout(() => {
        setImageSrc(prevSrc => (prevSrc === baner ? cars : baner));
        setShowImage(true); 
      }, 700);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer">
      <img
        src={imageSrc}
        alt="banner or cars"
        className={showImage ? 'show' : ''}
      />
    </div>
  );
}

export default Footer;
