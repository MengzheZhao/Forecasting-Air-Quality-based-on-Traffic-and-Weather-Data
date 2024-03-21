// MapContainer.js

import React, { useState, useEffect } from 'react';
import './MapContainer.css';

function MapContainer() {
  const [map, setMap] = useState(null);
  const [markerInfo, setMarkerInfo] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    const initialMap = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -41.06093336062005, lng: 174.6796089293993 },
      zoom: 6,
    });

    const initialMarkerInfo = [
      { position: new window.google.maps.LatLng(-36.84279552190262, 174.73730682848475) },
      { position: new window.google.maps.LatLng(-41.29361, 174.78446) },
      { position: new window.google.maps.LatLng(-43.52895287857273, 172.62576773733045) },
    ];

    setMap(initialMap);
    setMarkerInfo(initialMarkerInfo);
  }, []);

  const createMarker = (position, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position,
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: (
        "<div class='info-window'>" +
        "  <div class='marker'></div>" +
        "  <div class='detail-info'><p class='deviceName'>不知道写啥先写着</p ><p class='lastTime'><span>第二行</span></p ><div class='statusAddress'><div class='saLeft'><span>Alarm</span><span>status</span></div><div class='saRight'><span>120.123/30.123</span><span>address</span></div></div></div>" +
        "</div>"
      ),
    });

    window.google.maps.event.addListener(marker, "click", () => {
      const flag = currentIndex === index;
      if (!flag) {
        infowindow.open(map, marker);
        if (currentIndex >= 0) {
          window.infowindow[currentIndex].close(map, window.marker[currentIndex]);
        }
        setCurrentIndex(index);
      } else {
        infowindow.close(map, marker);
        setCurrentIndex(-1);
      }
    });
  };

  useEffect(() => {
    if (map) {
      markerInfo.forEach((info, index) => {
        createMarker(info.position, index);
      });
    }
  }, [map, markerInfo]);

  return <div id="map" className="map-container"></div>;
}

export default MapContainer;

