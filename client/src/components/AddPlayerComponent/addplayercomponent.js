import React from 'react';

const AddPlayerComponent = (props) => {
	return (
		<button onClick={props.searchForPlayer}>Add Player {props.index + 1}</button>
	);
}

export default AddPlayerComponent;