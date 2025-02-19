import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextInput = ({
  name, 
  placeholder,
  value,
  label,
  error,
  type,
  onChange
}) => {
  return (
	<>
	  <div className='form-group'>
		<input className={ classnames('form-control form-control-lg', { 'is-invalid' : error }) }
		  name={name} placeholder={placeholder} value={value} label={label} error={error} type={type} onChange={onChange} />
		{error && <div className='invalid-feedback'>{error}</div>}
	  </div>
	</>
  )
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

TextInput.defaultProps = {
  type: 'text'
}

export default TextInput;


