import React from 'react';

const formInput = (props) => {
  let inputElement = null;

  if (props.elementType === 'text') {
    inputElement = <input
      {...props.elementConfig}
      value={props.value}
      onChange={props.changed} />;
  } else if (props.elementType === 'select') {
    inputElement = (
      <select
        value={props.value}
        onChange={props.changed}>
        {props.elementConfig.options.map(option => (
          <option key={option.value} value={option.value}>
            {option.displayValue}
          </option>
        ))}
      </select>
    );
  }

  return (
    <>
      <div>
        <label>{props.label}</label>
        {inputElement}
      </div>
    </>
  )
}

export default formInput;