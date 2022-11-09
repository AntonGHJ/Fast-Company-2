import React from 'react';
import PropTypes from 'prop-types'

const CheckBoxField = ({name, value, onChange, children, error}) => {
    const handleChange = () => {
        onChange({name:name, value:!value})
    }
    return ( 
        
        <div className="mb-4 form-check">
        <input className="form-check-input" 
        type="checkbox" 
        value="" 
        id={name}
        onChange={handleChange}
        checked={value}
       
        />
        <label className="form-check-label is-invalid" htmlFor={name}>
          {children}
        </label>
        {error && <div className="invalid-feedback">
        {error}
      </div>}
      </div>
     );
}

CheckBoxField.propTypes ={
    name:PropTypes.string,
    value:PropTypes.bool,
    onChange:PropTypes.func,
    children:PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default CheckBoxField;