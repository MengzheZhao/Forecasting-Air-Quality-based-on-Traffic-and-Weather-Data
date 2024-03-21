import React from 'react';
import './BackgroundComponent.css'; // 导入对应的 CSS 文件

const BackgroundComponent = () => {
  return (
    <div className="image-container">
      {/* Other images */}
      <img src={`${process.env.PUBLIC_URL}/home-mountain-1.png`} alt="Mountain" className="background-image" />
      <img src={`${process.env.PUBLIC_URL}/home-snow.png`} alt="Snow" className="snow" />
      <img src={`${process.env.PUBLIC_URL}/home-village.png`} alt="Village" className="village" />
      <img src={`${process.env.PUBLIC_URL}/home-moon.png`} alt="Moon" className="moon" />
      <img src={`${process.env.PUBLIC_URL}/home-trineo-santa.png`} alt="Santa" className="santa" />
      <img src={`${process.env.PUBLIC_URL}/home-mountain-2.png`} alt="Right_Mountain" className="right" />
      <img src={`${process.env.PUBLIC_URL}/home-mountain-3.png`} alt="Left_Mountain" className="left" />





    </div>
  );
}

export default BackgroundComponent;
