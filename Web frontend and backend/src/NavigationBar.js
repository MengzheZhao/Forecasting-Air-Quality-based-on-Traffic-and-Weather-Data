import React from "react";
import { Link } from 'react-router-dom';
import './NavigationBar.css';

function NavigationBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"><Link to="/home" className="nav-link">Home</Link></li>
        <li className="nav-item"><Link to="/model" className="nav-link">Model</Link></li>
        <li className="nav-item"><Link to="/dataset" className="nav-link">Dataset</Link>
          <ul className="sub-menu">
            <li className="sub-item"><Link to="/aucklanddataset" className="sub-link">Auckland</Link></li>
            <li className="sub-item"><Link to="/wellingtondataset" className="sub-link">Wellington</Link></li>
            <li className="sub-item"><Link to="/christchurchdataset" className="sub-link">Christchurch</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar;
