import React from 'react';
import { Link } from 'react-router-dom';
import MapContainer from './MapContainer';
import InputBox from './input';
import NavigationBar from './NavigationBar';
import DataVisualization from './DataVisualization';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BackgroundComponent from './BackgroundComponent.js';
import WeatherInfo from './WeatherInfo';
import AirQualitybuilder from './AirQualityAPIbuilder.js';

import "./App.css"

function App() {
  const createSnowflakes = (num) => {
    const snowflakes = [];
    for (let i = 0; i < num; i++) {
      snowflakes.push(<div key={i} className="snowflake" style={{ left: `${Math.random() * 100}vw`, animationDuration: `${Math.random() * 5 + 3}s` }} />);
    }
    return snowflakes;
  };

  const HomePage = () => {
    return (
      <div>
        <BackgroundComponent />
        <div className='container' style={{ backgroundColor: '#000010', height: '700px' }}>
          <h1>Three Cities Model</h1>
          <p1>Welcome to our Air Quality Prediction platform, where we provide<br /> forecasts
            for air quality in key cities across New Zealand. Our advanced<br /> models utilize
            data-driven insights to keep you informed about the <br />air you breathe.<br />
          </p1>
          <Link to="/model/auckland">
            <button className="tech-button">Go to Model</button>
          </Link>
          <MapContainer />
        </div>
        <div className='dataset' style={{ backgroundColor: '#000010', height: '600px' }}>
          <h2>Our Data</h2>
          <p2>Our dataset is a comprehensive collection sourced from various reputable sources, including LAWAdatabase, MetService, Stats NZ, and At hop. It encompasses a diverse range of weather features and factors, such as temperature, humidity, wind speed, and air pressure, as well as traffic data. With contributions from these sources, our dataset provides a rich and varied set of information for training and enhancing our air quality prediction models.
          </p2>
          <img src={'data.png'} className='datapng' alt="Dataset" />
          <Link to="/aucklanddataset">
            <button className="data-button">Go to Dataset</button>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {createSnowflakes(50)}
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={
            <>
              <HomePage />
            </>
          } />
          <Route path="/aucklanddataset" element={<DataVisualization />} />
          <Route path="/wellingtondataset" element={<DataVisualization />} />
          <Route path="/christchurchdataset" element={<DataVisualization />} />
          <Route path="/model" element={<AirQualitybuilder/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
