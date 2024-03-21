import React, { useState } from 'react';
import './InputBox.css'; 

const InputBox = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    Year: '',
    Month: '',
    Day: '',
    Categorized_Traffic: '',
    'Tmax.C.': '',
    'Tmin.C.': '',
    Categorized_Rain: '',
  });

const [prediction, setPrediction] = useState(null);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleSubmit = async () => {
  try {
    // 发送数据到后端
    const response = await fetch('http://localhost:3002/api/predictAirQuality', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 解析后端返回的JSON数据
    const data = await response.json();

    console.log('Backend Response:', data);

    // 更新状态以显示结果
    setPrediction(data.prediction);

    // 调用父组件传递的 onSubmit 函数，并传递模型预测的结果
    onSubmit(data);
  } catch (error) {
    console.error('Error:', error);
  }
};
  return (
    
    <div className="input-box">
      <label htmlFor="Year" className="input-label">Year: </label>
      <input
        type="number"
        id="Year"
        name="Year"
        value={formData.Year}
        onChange={handleInputChange}
        className="input-field"
      />

      <label htmlFor="Month" className="input-label">Month: </label>
      <input
        type="number"
        id="Month"
        name="Month"
        value={formData.Month}
        onChange={handleInputChange}
        className="input-field"
      />

      <label htmlFor="Day" className="input-label">Day: </label>
      <input
        type="number"
        id="Day"
        name="Day"
        value={formData.Day}
        onChange={handleInputChange}
        className="input-field"
      />

      <label htmlFor="Categorized_Traffic" className="input-label">Categorized_Traffic: </label>
      <select
        id="Categorized_Traffic"
        name="Categorized_Traffic"
        value={formData.Categorized_Traffic}
        onChange={handleInputChange}
        className="input-field"
      >
        <option value="0">few</option>
        <option value="1">medium</option>
        <option value="2">many</option>
      </select>

      <label htmlFor="Tmax_C" className="input-label">Tmax.C.: </label>
      <input
        type="number"
        id="Tmax_C"
        name="Tmax.C."
        value={formData['Tmax.C.']}        
        onChange={handleInputChange}
        className="input-field"
      />

      <label htmlFor="Tmin_C" className="input-label">Tmin.C.: </label>
      <input
        type="number"
        id="Tmin_C"
        name="Tmin.C."
        value={formData['Tmin.C.']}        
        onChange={handleInputChange}
        className="input-field"
      />

      <label htmlFor="Categorized_Rain" className="input-label">Rainfall: </label>
      <select
        id="Categorized_Rain"
        name="Categorized_Rain"
        value={formData.Categorized_Rain}
        onChange={handleInputChange}
        className="input-field"
      >
        <option value="0">Not Rain</option>
        <option value="1">Rain</option>
      </select>

      <button type="button" onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      
      {prediction && (
        <div className="prediction-result">
        <p className="prediction-label">AQI:</p>
        <p className="prediction-value">{prediction[0][0]}</p>
        <p className="prediction-label">PM2.5:</p>
        <p className="prediction-value">{prediction[0][1]}</p>

  </div>
)}

    </div>
  );

};

export default InputBox;