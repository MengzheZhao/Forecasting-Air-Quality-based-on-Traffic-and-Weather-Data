import React from 'react';

const OutputComponent = ({ result, showOutput }) => {
  return showOutput ? (
    <div className="result-section">
      <h3>Result:</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  ) : null;
};

export default OutputComponent;
