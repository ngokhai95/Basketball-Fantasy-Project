import React from 'react';

const InputComponent = (props) => {
	return (
		<input value={props.name} onChange={props.handleChange} type={props.type}/>
	);
}

export default InputComponent;