import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import Select from 'react-select';
import './DataVisualization.css';

const DataVisualization = () => {
  const [data, setData] = useState([]);
  const [featureVisibility, setFeatureVisibility] = useState({});
  const [initialFeaturesOrder, setInitialFeaturesOrder] = useState([]);
  const [filePath, setFilePath] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(filePath);
        const csvData = await response.text();

        const rows = csvData.split('\n');
        const header = rows[0].split(',');

        const json_data = rows.slice(1).map((row) => {
          const values = row.split(',');
          return header.reduce((acc, key, index) => {
            acc[key] = values[index];
            return acc;
          }, {});
        });

        setInitialFeaturesOrder(header);
        setData(json_data);

        setFeatureVisibility(
          header.reduce((acc, feature) => {
            acc[feature] = true;
            return acc;
          }, {})
        );

        // Set selected features initially
        setSelectedFeatures(header.map((feature) => ({ value: feature, label: feature })));
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };

    fetchData();
  }, [filePath]);

  const handleFeatureToggle = (selectedOptions) => {
    const selectedFeatureKeys = selectedOptions.map((option) => option.value);
    setFeatureVisibility((prevVisibility) => {
      const newVisibility = { ...prevVisibility };
      initialFeaturesOrder.forEach((feature) => {
        newVisibility[feature] = selectedFeatureKeys.includes(feature);
      });
      return newVisibility;
    });
    setSelectedFeatures(selectedOptions);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const datasetMap = {
      '/aucklanddataset': 'auckland_data.csv',
      '/wellingtondataset': 'wellington_dataset.csv',
      '/christchurchdataset': 'canterbury_dataset.csv',
    };
    setFilePath(datasetMap[path] || '');
  }, [window.location.pathname]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  };

  const featuresOptions = initialFeaturesOrder.map((feature) => ({ value: feature, label: feature }));

  return (
    <div className="table-container">
      <div className="label-container">
        {/* <strong>Selected Features:</strong> */}
        <Select
          isMulti
          options={featuresOptions}
          value={selectedFeatures}
          onChange={handleFeatureToggle}
        />
      </div>
      <div className="table-window">
        <table>
          <thead>
            {data.length > 0 && (
              <tr>
                {initialFeaturesOrder.map(
                  (feature) => featureVisibility[feature] && <th key={feature}>{feature}</th>
                )}
              </tr>
            )}
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {initialFeaturesOrder.map(
                  (feature) =>
                    featureVisibility[feature] && (
                      <td key={feature}>
                        {feature === 'Timestamp' ? formatTimestamp(row[feature]) : row[feature]}
                      </td>
                    )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 0 && (
        <CSVLink data={data} headers={initialFeaturesOrder} filename="export.csv">
          Export CSV
        </CSVLink>
      )}
    </div>
  );
};

export default DataVisualization;
