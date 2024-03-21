import React, { useState } from 'react';
import './AirQualityAPIbuilder.css';
import WeatherInfo from './WeatherInfo';

const trafficData = require('./trafficData');
const AucklandTrafficCountLight = await trafficData.getTotalTrafficCountLight('02 - Auckland');
const AucklandTrafficCountHeavy = await trafficData.getTotalTrafficCountHeavy('02 - Auckland');
const WellingtonTrafficCountLight = await trafficData.getTotalTrafficCountLight('09 - Wellington');
const WellingtonTrafficCountHeavy = await trafficData.getTotalTrafficCountHeavy('09 - Wellington');
const ChristchurchTrafficCountLight = await trafficData.getTotalTrafficCountLight('11 - Canterbury');
const ChristchurchTrafficCountHeavy = await trafficData.getTotalTrafficCountHeavy('11 - Canterbury');
let lightCount;
let heavyCount;

const DropdownSelect = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const APIbuilder = () => {
  const [selectedFormat, setSelectedFormat] = useState('json');
  const [selectedCity, setSelectedCity] = useState('Auckland');
  const [startValue, setStartValue] = useState('');
  const [endValue, setEndValue] = useState('');
  const [clickedSection, setClickedSection] = useState(null);
  const [apiOutput, setApiOutput] = useState(null);
  const [selectedVersion, setSelectedVersion] = useState('Popular');
  const [dateValue, setDateValue] = useState('');
  const [wDirValue, setWDirValue] = useState('');
  const [wSpdValue, setWSpdValue] = useState('');
  const [rainValue, setRainValue] = useState('');
  const [rhValue, setRHValue] = useState('');
  const [tmaxValue, setTmaxValue] = useState('');
  const [tminValue, setTminValue] = useState('');
  const [lightCountValue, setLightCountValue] = useState('');
  const [heavyCountValue, setHeavyCountValue] = useState('');
  const [NOxValue, setNOxValue] = useState('');
  const [O3Value, setO3Value] = useState('');
  const [SO2Value, setSO2Value] = useState('');
  const [gDirValue, setgDirValue] = useState('');
  const [gSpdValue, setgSpdValue] = useState('');
  const [wRunValue, setwRunValue] = useState('');
  const [tDryValue, settDryValue] = useState('');
  const [tWetValue, settWetValue] = useState('');
  const [tgminValue, settgminValue] = useState('');
  const [et10Value, setet10Value] = useState('');
  const [et20Value, setet20Value] = useState('');
  const [et100Value, setet100Value] = useState('');
  const [pmslValue, setpmslValue] = useState('');
  const [pstnValue, setpstnValue] = useState('');
  const [sunValue, setsunValue] = useState('');
  const [radValue, setradValue] = useState('');
  const [monthValue, setmonthValue] = useState('');
  const [weekValue, setweekValue] = useState('');
  const [weekendValue, setweekendValue] = useState('');
  const [COValue, setCOValue] = useState('');
  const [NOValue, setNOValue] = useState('');
  const [NO2Value, setNO2Value] = useState('');


const weekendOptions = [
  {value: '1', label: 'Yes'},
  {value: '0', label: 'No'},
]


  const formatOptions = [
    { value: 'json', label: 'JSON' },
    { value: 'xml', label: 'XML' },
  ];

  const cityOptions = [
    { value: 'Auckland', label: 'Auckland' },
    { value: 'Wellington', label: 'Wellington' },
    { value: 'Christchurch', label: 'Christchurch' },
  ];

  const versionOptions = [
    {value: ' ', label: 'Please choose version'},
    { value: 'Popular', label: 'Popular'},
    { value: 'Professional', label: 'Professional'},
  ];

  const handleSectionClick = (section) => {
    setClickedSection(section);
    
    setApiOutput(null);
    setStartValue('');
    setEndValue('');
    setSelectedVersion('');

    if (section === 'submit-section') {
      sendApiRequest();
    }
  };

  const getRequestHeader = () => {
    switch (clickedSection) {
      case 'airquality1':
        return 'Request from the airquality service';
      case 'history1':
        return 'Request from the historydata service';
      default:
        return '';
    }
  };
  
  if(selectedCity=='Auckland') {
    lightCount = AucklandTrafficCountLight;
    heavyCount = AucklandTrafficCountHeavy;
  }
  else if(selectedCity=='Wellington'){
    lightCount = WellingtonTrafficCountLight;
    heavyCount = WellingtonTrafficCountHeavy;
  }
  else if(selectedCity=='Christchurch'){
    lightCount = ChristchurchTrafficCountLight;
    heavyCount = ChristchurchTrafficCountHeavy;
  }
  const sendApiRequest = async () => {
    try {
      const apiUrl = `http://127.0.0.1:3002/get_features?start_date=${startValue}&end_date=${endValue}&city=${selectedCity}`;
  
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
      
      setApiOutput(data);
    } catch (error) {
      console.error('Error during API request:', error.message);
      setApiOutput({ error: error.message });
    }
  };
  const sendProfessionalRequest = async () => {
    try {
      const dateObject = new Date(dateValue);
      const timestampMilliseconds = dateObject.getTime() * 1e6;

      const apiUrl = 'http://127.0.0.1:3002/api/predictAirQuality/Professional';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: timestampMilliseconds,
          NO: parseInt(NOValue),
          NO2: parseInt(NO2Value),
          NOx: parseInt(NOxValue),
          O3: parseInt(O3Value),
          CO: parseInt(COValue),
          SO2: parseInt(SO2Value),
          WDir: parseInt(wDirValue),
          WSpd: parseInt(wSpdValue),
          GDir: parseInt(gDirValue),
          gSpd: parseInt(gSpdValue),
          wRun: parseInt(wRunValue),
          Rain: parseFloat(rainValue),
          tDry: parseFloat(tDryValue),
          tWet: parseFloat(tWetValue),
          RH: parseInt(rhValue),
          Tmax: parseInt(tmaxValue),
          Tmin: parseInt(tminValue),
          Tgmin: parseInt(tgminValue),
          ET10: parseInt(et10Value),
          ET20: parseInt(et20Value),
          ET100: parseInt(et100Value),
          Pmsl: parseFloat(pmslValue),
          Pstn: parseInt(pstnValue),
          Sun: parseFloat(sunValue),
          Rad: parseFloat(radValue),
          lightCount: parseInt(lightCountValue),
          heavyCount: parseInt(heavyCountValue),
          Month: parseInt(monthValue),
          DayofWeek: parseInt(weekValue),
          weekend: parseInt(weekendValue),
          city: selectedCity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
  
      setApiOutput(data);
    } catch (error) {
      console.error('Error during API request:', error.message);
      setApiOutput({ error: error.message });
    }
  };

  const sendAnotherRequest = async () => {
    try {
      const dateObject = new Date(dateValue);
      const timestampMilliseconds = dateObject.getTime() * 1e6;

      const apiUrl = 'http://127.0.0.1:3002/api/predictAirQuality';
  
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Date: timestampMilliseconds,
          WDir: parseInt(wDirValue),
          WSpd: parseInt(wSpdValue),
          Rain: parseFloat(rainValue),
          RH: parseInt(rhValue),
          Tmax: parseInt(tmaxValue),
          Tmin: parseInt(tminValue),
          lightCount: parseInt(lightCountValue),
          heavyCount: parseInt(heavyCountValue),
          city: selectedCity,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data);
  
      setApiOutput(data);
    } catch (error) {
      console.error('Error during API request:', error.message);
      setApiOutput({ error: error.message });
    }
  };
  return (
    <div className="grid-container">
      <div className={`header ${clickedSection === 'header' ? 'clicked' : ''}`}>
        <h3>Choose your service</h3>
      </div>

      <div
        className="normal-section"
        onClick={() => handleSectionClick('airquality')}
      >
        <h3>Air Quality Predict</h3>
        <p>Enter data and request result</p>
      </div>

      <div
        className={`airquality1-section ${clickedSection === 'airquality1' ? 'clicked' : ''}`}
        onClick={() => handleSectionClick('airquality1')}
      >
        <h3>Use the /airquality server</h3>
      </div>

      <div
        className="normal-section"
        onClick={() => handleSectionClick('history')}
      >
        <h3>History Air Quality Date</h3>
        <p>Get data for a city based on a start and end date/time</p>
      </div>

      <div
        className={`history1-section ${clickedSection === 'history1' ? 'clicked' : ''}`}
        onClick={() => handleSectionClick('history1')}
      >
        <h3>Use the /historydata server</h3>
      </div>

      {clickedSection && (
        <div className={`header generated-header ${clickedSection}`}>
          <h3>{getRequestHeader()}</h3>
        </div>
      )}

      {clickedSection === 'history1' && (
        <>
          <div className="normal-section">
            <h3>Output</h3>
            <p>Specify the data format used to return your query (JSON default)</p>
          </div>
          <div className="input-section">
            <h3>Output=</h3>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
            >
              {formatOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="normal-section">
            <h3>City</h3>
            <p>Choose the city</p>
          </div>
          <div className='city-section'>
            <h3>City=</h3>
            <DropdownSelect
              value={selectedCity}
              options={cityOptions}
              onChange={(value) => setSelectedCity(value)}
            />
          </div>
          <div className='normal-section'>
            <h3>Start</h3>
            <p>YYYY-MM-DD timestamp of the start of the timeseries.</p>
          </div>
          <div className='input-section'>
            <h3>Start=</h3>
            <input
              type="text"
              pattern="\d{4}-\d{2}-\d{2}"
              value={startValue}
              onChange={(e) => setStartValue(e.target.value)}
            />
            <p>Example: 2020-01-01</p>

          </div>
          <div className='normal-section'>
            <h3>End</h3>
            <p>YYYY-MM-DD timestamp of the end of the timeseries.</p>
          </div>
          <div className='input-section'>
            <h3>End=</h3>
            <input
              type="text"
              pattern="\d{4}-\d{2}-\d{2}"
              value={endValue}
              onChange={(e) => setEndValue(e.target.value)}
            />
            <p>Example:2021-01-01</p>
          </div>
          <div className='submit-section' onClick={() => sendApiRequest()}>
            <h3>Make API request</h3>
          </div>
          <div className='output-section'>
            <h3>API Output</h3>
            <pre>{JSON.stringify(apiOutput, null, 2)}</pre>
    </div>

        </>
      )}

{clickedSection === 'airquality1' && (
  <>
    <WeatherInfo setApiOutput={setApiOutput} />
    <div className="normal-section">
      <h3>Output</h3>
      <p>Specify the data format used to return your query (JSON default)</p>
    </div>
    <div className="input-section">
      <h3>Output=</h3>
      <select
        value={selectedFormat}
        onChange={(e) => setSelectedFormat(e.target.value)}
      >
        {formatOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
    <div className='normal-section'>
      <h3>Version</h3>
      <p>You can choose the version you want here. 
        The features of the popular version will be smaller 
        and faster than the professional version, but the accuracy is less</p>
    </div>
    <div className='version-section'>
      <h3>Version</h3>
      <DropdownSelect
        value={selectedVersion}
        options={versionOptions}
        onChange={(value) => setSelectedVersion(value)}
      />
    </div>
    <div className="normal-section">
      <h3>City</h3>
      <p>Choose the city</p>
    </div>
    <div className='city-section'>
      <h3>City=</h3>
      <DropdownSelect
        value={selectedCity}
        options={cityOptions}
        onChange={(value) => setSelectedCity(value)}
      />
    </div>

    {selectedVersion === 'Popular' && (
      <>
        <div className="normal-section">
          <h3>Date</h3>
          <p>Predicted time point</p>
        </div>
        <div className='input-section'>
          <h3>Date=</h3>
          <input
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          <p>Example:2024-01-01</p>
        </div>
        <div className='normal-section'>
          <h3>WDir</h3>
          <p>Wind direction (degrees).</p>
        </div>
        <div className='input-section'>
          <h3>WDir=</h3>
          <input
           type="int"
           value={wDirValue}
           onChange={(e) => setWDirValue(e.target.value)}          
          />
          <p>Realtime WDir is {apiOutput && apiOutput.weather ? apiOutput.weather.wDIR : 'Loading...'} degrees.</p>
        </div>
        <div className='normal-section'>
          <h3>WSpd</h3>
          <p>Wind speed (Default m/s).</p>
        </div>
        <div className='input-section'>
          <h3>WSpd=</h3>
          <input
           type="int"  
           value={wSpdValue}      
           onChange={(e) => setWSpdValue(e.target.value)}            
          />
        <p>Realtime WSep is {apiOutput && apiOutput.weather ? apiOutput.weather.WSpd : 'Loading...'} m/s.</p>
        </div>
        <div className='normal-section'>
          <h3>Rainfall</h3>
          <p> Liquid equivalent precipitation rate (default mm/hr).</p>
        </div>
        <div className='input-section'>
          <h3>Rainfall=</h3>
          <input
           type="int" 
           value={rainValue}         
           onChange={(e) => setRainValue(e.target.value)}            
          />
          <p>Realtime Rainfall is {apiOutput && apiOutput.weather ? apiOutput.weather.Rainfall : 'Loading...'} mm/hr.</p>
        </div>
        <div className='normal-section'>
          <h3>RH</h3>
          <p>Relative humidity (%).</p>
        </div>
        <div className='input-section'>
          <h3>RH=</h3>
          <input
           type="int" 
           value={rhValue}         
           onChange={(e) => setRHValue(e.target.value)}           
          />
          <p>Realtime Relative humidity is {apiOutput && apiOutput.weather ? apiOutput.weather.RH : 'Loading...'} %.</p>
        </div>
        <div className='normal-section'>
          <h3>Tmax</h3>
          <p>Maximum Temperature (°C).</p>
        </div>
        <div className='input-section'>
          <h3>Tmax=</h3>
          <input
           type="int"  
           value={tmaxValue}         
           onChange={(e) => setTmaxValue(e.target.value)}          
          />
          <p>Today's Maximum Temperature is </p>
        </div>
        <div className='normal-section'>
          <h3>Tmin</h3>
          <p>Minimum Temperature (°C).</p>
        </div>
        <div className='input-section'>
          <h3>Tmin=</h3>
          <input
           type="int" 
           value={tminValue}         
           onChange={(e) => setTminValue(e.target.value)}           
          />
          <p>Today's  Minimum Temperature is </p>
        </div>
        <div className='normal-section'>
          <h3>LightCount</h3>
          <p>Light car traffic flow</p>
        </div>
        <div className='input-section'>
          <h3>LightCount=</h3>
          <input
          type = 'int'
          value={lightCountValue}         
           onChange={(e) => setLightCountValue(e.target.value)}  
          />
          <p>The small car traffic volume is {lightCount}.</p>
        </div>
        <div className='normal-section'>
          <h3>HeavyCount</h3>
          <p>Heavy car traffic flow</p>
        </div>
        <div className='input-section'>
          <h3>HeavyCount=</h3>
          <input
          type = 'int'
          value={heavyCountValue}         
           onChange={(e) => setHeavyCountValue(e.target.value)}  
          />
          <p>The heavy car traffic volume is {heavyCount}.</p>
        </div>
        <div className='submit-section' onClick={() => sendAnotherRequest()}>
            <h3>Make API request</h3>
          </div>
          <div className='output-section'>
            <h3>API Output</h3>
            <pre>{JSON.stringify(apiOutput, null, 2)}</pre>
    </div>
      </>      
    )}
    {selectedVersion === 'Professional' && (
      <>
        <div className="normal-section">
          <h3>Date</h3>
          <p>Predicted time point</p>
        </div>
        <div className='input-section'>
          <h3>Date=</h3>
          <input
            type="text"
            pattern="\d{4}-\d{2}-\d{2}"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
          />
          <p>Example:2024-01-01</p>
        </div>
        {selectedCity === 'Auckland' && (
            <>    
        <div className='normal-section'>
          <h3>NOx(ug/m3)</h3>
        </div>
        <div className='input-section'>
          <h3>NOx=</h3>
          <input
           type="int"
           value={NOxValue}
           onChange={(e) => setNOxValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>O3(ug/m3)</h3>
        </div>
        <div className='input-section'>
          <h3>O3=</h3>
          <input
           type="int"
           value={O3Value}
           onChange={(e) => setO3Value(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>SO2(ug/m3)</h3>
        </div>
        <div className='input-section'>
          <h3>SO2=</h3>
          <input
           type="int"
           value={SO2Value}
           onChange={(e) => setSO2Value(e.target.value)}          
          />
        </div>  
        <div className='normal-section'>
          <h3>Tgmin(C)</h3>
          <p> (°C).</p>
        </div>
        <div className='input-section'>
          <h3>Tgmin=</h3>
          <input
           type="int" 
           value={tgminValue}         
           onChange={(e) => settgminValue(e.target.value)}           
          />
        </div>  
          <div className='normal-section'>
            <h3>ET10(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET10=</h3>
            <input
             type="int" 
             value={et10Value}         
             onChange={(e) => setet10Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
            <h3>ET20(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET20=</h3>
            <input
             type="int" 
             value={et20Value}         
             onChange={(e) => setet20Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
            <h3>ET100(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET100=</h3>
            <input
             type="int" 
             value={et100Value}         
             onChange={(e) => setet100Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
          <h3>Sun(Hrs)</h3>
        </div>
        <div className='input-section'>
          <h3>Sun=</h3>
          <input
           type="int" 
           value={sunValue}         
           onChange={(e) => setsunValue(e.target.value)}           
          />
        </div>
          <div className='normal-section'>
          <h3>Month</h3>
        </div>
        <div className='input-section'>
          <h3>Month=</h3>
          <input
           type="int" 
           value={monthValue}         
           onChange={(e) => setmonthValue(e.target.value)}           
          />
        </div>
        <div className='normal-section'>
          <h3>Day of Week</h3>
          <p>Enter number between 1 and 7</p>
        </div>
        <div className='input-section'>
          <h3>Day=</h3>
          <input
           type="int" 
           value={weekValue}         
           onChange={(e) => setweekValue(e.target.value)}           
          />
        </div>
        <div className='normal-section'>
          <h3>IsWeenkend</h3>
          <p>yes or no</p>
        </div>
        <div className='input-section'>
          <h3>Weekend=</h3>
          <DropdownSelect
              value={weekendValue}
              options={weekendOptions}
              onChange={(value) => setweekendValue(value)}
            />
        </div>
          
            </>
        )}
        {selectedCity === 'Christchurch' && (
            <><div className='normal-section'>
                  <h3>CO(ug/m3)</h3>
                </div><div className='input-section'>
                  <h3>CO=</h3>
                    <input
                      type="int"
                      value={COValue}
                      onChange={(e) => setCOValue(e.target.value)} />
                  </div>
              <div className='normal-section'>
                <h3>NO(ug/m3)</h3>
              </div>
              <div className='input-section'>
                <h3>NO=</h3>
                <input
                type="int"
                value={NOValue}
                onChange={(e) => setNOValue(e.target.value)}          
                />
              </div>  
              <div className='normal-section'>
                <h3>NO2(ug/m3)</h3>
              </div>
              <div className='input-section'>
                <h3>NO2=</h3>
                <input
                type="int"
                value={NO2Value}
                onChange={(e) => setNO2Value(e.target.value)}          
                />
              </div>  
              <div className='normal-section'>
                <h3>SO2(ug/m3)</h3>
              </div>
              <div className='input-section'>
                <h3>SO2=</h3>
                <input
                type="int"
                value={SO2Value}
                onChange={(e) => setSO2Value(e.target.value)}          
                />
              </div>  
              </>
        )}        
        {selectedCity === 'Wellington' && (
          <>
          <div className='normal-section'>
              <h3>NO2(ug/m3)</h3>
              </div>
              <div className='input-section'>
                <h3>NO2=</h3>
                <input
                type="int"
                value={NO2Value}
                onChange={(e) => setNO2Value(e.target.value)}          
                />
              </div>  
          <div className='normal-section'>
                <h3>CO(ug/m3)</h3>
              </div><div className='input-section'>
                <h3>CO=</h3>
                  <input
                    type="int"
                    value={COValue}
                    onChange={(e) => setCOValue(e.target.value)} />
                </div>
                <div className='normal-section'>
          <h3>O3(ug/m3)</h3>
        </div>
          <div className='input-section'>
            <h3>O3=</h3>
            <input
            type="int"
            value={O3Value}
            onChange={(e) => setO3Value(e.target.value)}          
            />
          </div>
          <div className='normal-section'>
            <h3>Tgmin(C)</h3>
          </div>
          <div className='input-section'>
          <h3>Tgmin=</h3>
          <input
           type="int" 
           value={tgminValue}         
           onChange={(e) => settgminValue(e.target.value)}           
          />
        </div>  
          <div className='normal-section'>
            <h3>ET10(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET10=</h3>
            <input
             type="int" 
             value={et10Value}         
             onChange={(e) => setet10Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
            <h3>ET20(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET20=</h3>
            <input
             type="int" 
             value={et20Value}         
             onChange={(e) => setet20Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
            <h3>ET100(C)</h3>
            <p> </p>
          </div>
          <div className='input-section'>
            <h3>ET100=</h3>
            <input
             type="int" 
             value={et100Value}         
             onChange={(e) => setet100Value(e.target.value)}           
            />
          </div>
          <div className='normal-section'>
          <h3>Sun(Hrs)</h3>
        </div>
        <div className='input-section'>
          <h3>Sun=</h3>
          <input
           type="int" 
           value={sunValue}         
           onChange={(e) => setsunValue(e.target.value)}           
          />
        </div>
            </>
      )}
        <div className='normal-section'>
          <h3>WDir</h3>
          <p>Wind direction (degrees).</p>
        </div>
        <div className='input-section'>
          <h3>WDir=</h3>
          <input
           type="int"
           value={wDirValue}
           onChange={(e) => setWDirValue(e.target.value)}          
          />
          <p>Realtime WDir is {apiOutput && apiOutput.weather ? apiOutput.weather.wDIR : 'Loading...'} degrees.</p>
        </div>
        <div className='normal-section'>
          <h3>WSpd</h3>
          <p>Wind speed (Default m/s).</p>
        </div>
        <div className='input-section'>
          <h3>WSpd=</h3>
          <input
           type="int"  
           value={wSpdValue}      
           onChange={(e) => setWSpdValue(e.target.value)}            
          />
        <p>Realtime WSep is {apiOutput && apiOutput.weather ? apiOutput.weather.WSpd : 'Loading...'} m/s.</p>
        </div>
        <div className='normal-section'>
          <h3>GustDir(Deg)</h3>
        </div>
        <div className='input-section'>
          <h3>GustDir=</h3>
          <input
           type="int"
           value={gDirValue}
           onChange={(e) => setgDirValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>GustSpd(m/s)</h3>
        </div>
        <div className='input-section'>
          <h3>GustSpd=</h3>
          <input
           type="int"
           value={gSpdValue}
           onChange={(e) => setgSpdValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>WindRun(Km)</h3>
        </div>
        <div className='input-section'>
          <h3>WindRun=</h3>
          <input
           type="int"
           value={wRunValue}
           onChange={(e) => setwRunValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>Rainfall</h3>
          <p> Liquid equivalent precipitation rate (default mm/hr).</p>
        </div>
        <div className='input-section'>
          <h3>Rainfall=</h3>
          <input
           type="int" 
           value={rainValue}         
           onChange={(e) => setRainValue(e.target.value)}            
          />
          <p>Realtime Rainfall is {apiOutput && apiOutput.weather ? apiOutput.weather.Rainfall : 'Loading...'} mm/hr.</p>
        </div>
        <div className='normal-section'>
          <h3>Tdry(C)</h3>
        </div>
        <div className='input-section'>
          <h3>Tdry=</h3>
          <input
           type="int"
           value={tDryValue}
           onChange={(e) => settDryValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>Twet(C)</h3>
        </div>
        <div className='input-section'>
          <h3>Twet=</h3>
          <input
           type="int"
           value={tWetValue}
           onChange={(e) => settWetValue(e.target.value)}          
          />
        </div>
        <div className='normal-section'>
          <h3>RH</h3>
          <p>Relative humidity (%).</p>
        </div>
        <div className='input-section'>
          <h3>RH=</h3>
          <input
           type="int" 
           value={rhValue}         
           onChange={(e) => setRHValue(e.target.value)}           
          />
          <p>Realtime Relative humidity is {apiOutput && apiOutput.weather ? apiOutput.weather.RH : 'Loading...'} %.</p>
        </div>
        <div className='normal-section'>
          <h3>Tmax</h3>
          <p>Maximum Temperature (°C).</p>
        </div>
        <div className='input-section'>
          <h3>Tmax=</h3>
          <input
           type="int"  
           value={tmaxValue}         
           onChange={(e) => setTmaxValue(e.target.value)}          
          />
          <p>Today's Maximum Temperature is </p>
        </div>
        <div className='normal-section'>
          <h3>Tmin</h3>
          <p>Minimum Temperature (°C).</p>
        </div>
        <div className='input-section'>
          <h3>Tmin=</h3>
          <input
           type="int" 
           value={tminValue}         
           onChange={(e) => setTminValue(e.target.value)}           
          />
          <p>Today's  Minimum Temperature is </p>
        </div>
        <div className='normal-section'>
          <h3>Pmsl(hPa)</h3>
          <p> </p>
        </div>
        <div className='input-section'>
          <h3>Pmsl=</h3>
          <input
           type="int" 
           value={pmslValue}         
           onChange={(e) => setpmslValue(e.target.value)}           
          />
        </div>
        <div className='normal-section'>
          <h3>Pstn(hPa)</h3>
          <p> </p>
        </div>
        <div className='input-section'>
          <h3>Pstn=</h3>
          <input
           type="int" 
           value={pstnValue}         
           onChange={(e) => setpstnValue(e.target.value)}           
          />
        </div>
        <div className='normal-section'>
          <h3>Rad(MJ/m2)</h3>
        </div>
        <div className='input-section'>
          <h3>Rad=</h3>
          <input
           type="int" 
           value={radValue}         
           onChange={(e) => setradValue(e.target.value)}           
          />
        </div>
        <div className='normal-section'>
          <h3>LightCount</h3>
          <p>Light car traffic flow</p>
        </div>
        <div className='input-section'>
          <h3>LightCount=</h3>
          <input
          type = 'int'
          value={lightCountValue}         
           onChange={(e) => setLightCountValue(e.target.value)}  
          />
          <p>The small car traffic volume is {lightCount}.</p>
        </div>
        <div className='normal-section'>
          <h3>HeavyCount</h3>
          <p>Heavy car traffic flow</p>
        </div>
        <div className='input-section'>
          <h3>HeavyCount=</h3>
          <input
          type = 'int'
          value={heavyCountValue}         
           onChange={(e) => setHeavyCountValue(e.target.value)}  
          />
          <p>The heavy car traffic volume is {heavyCount}.</p>
        </div>
        <div className='submit-section' onClick={() => sendProfessionalRequest()}>
            <h3>Make API request</h3>
          </div>
          <div className='output-section'>
            <h3>API Output</h3>
            <pre>{JSON.stringify(apiOutput, null, 2)}</pre>
    </div>
      </>      
    )}

  </>
)}
    </div>   
  );};

export default APIbuilder;