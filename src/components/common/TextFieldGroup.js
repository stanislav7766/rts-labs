import React from 'react';

const TextFieldGroup = ({name, placeholder, value, error, info, type, onChange, disabled}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={`form-control ${error && 'is-invalid'}`}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error} </div>}
      {info && <small className="form-text text-muted"> {info}</small>}
    </div>
  );
};

export default TextFieldGroup;
