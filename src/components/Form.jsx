import React from "react";

const Form = ({
  region,
  errorCount,
  seed,
  onRegionChange,
  onErrorCountChange,
  onSeedChange,
  onRandomSeed,
}) => {
  const handleSliderChange = (event) => {
    if (event.target && event.target.value) {
      const value = parseFloat(event.target.value);
      if (!isNaN(value)) {
        onErrorCountChange(value);
      }
    }
  };

  const handleInputNumberChange = (event) => {
    const value = event.target.value.trim();
    const errorCountValue = value === "" ? 0 : parseFloat(value);
    if (!isNaN(errorCountValue)) {
      onErrorCountChange(errorCountValue);
    }
  };

  const handleInputSeedChange = (event) => {
    const value = event.target.value;
    onSeedChange(value);
  };

  const handleRegionChange = (event) => {
    const selectedRegion = event.target.value;
    onRegionChange(selectedRegion);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label htmlFor="region">Region:</label>
            <select
              className="form-control"
              id="region"
              value={region}
              onChange={handleRegionChange}
            >
              <option value="EN">USA</option>
              <option value="RU">Россия</option>
              <option value="FR">France</option>
            </select>
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label htmlFor="errorCount">Error Count:</label>
            <input
              type="text"
              className="form-control"
              id="errorCount"
              inputMode="numeric"
              pattern="[0-9]*"
              value={errorCount}
              onChange={handleInputNumberChange}
            />
            <input
              type="range"
              className="form-control-range custom-range"
              id="errorCountSlider"
              min={0}
              max={10}
              step={0.25}
              value={errorCount}
              onChange={handleSliderChange}
              style={{
                background: "transparent",
                width: "100%",
                height: "8px",
                borderRadius: "4px",
                boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)",
                outline: "none",
                opacity: "1",
                transition: "opacity 0.2s",
                appearance: "none",
              }}
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-4">
          <div className="form-group">
            <label htmlFor="seed">Seed:</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="seed"
                value={seed}
                placeholder={0}
                onChange={handleInputSeedChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={onRandomSeed}
                >
                  Random
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
