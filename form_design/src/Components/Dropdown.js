import React, { useState, useEffect } from "react";


function Dropdown(props) {
	let options
	const [fieldName, setFieldName] = useState(props.initial);


	if(props.dataItem){
		 options = Object.entries(props.dataItem).map(([k,v]) => (
			<option value={v.value}>{v.label}</option>
		  ));
	}else if (props.options){
		options = props.options.map((key,index) => (
			 <option value={key}>{key}</option>
		  ))
	}
	else{
		options = props.array.map((key,index) => (
			(key === "Radio") && <option value={index+1}>Question {index+1}</option>
		  ));
	}

	options.unshift(<option value="" disabled selected>Select. . .</option>)

	const handleChange = (e) => {
		setFieldName(e.target.value);
	};

	useEffect(() => {
		if (props.onChange) {
			props.onChange(fieldName);
		}
	}, [fieldName]);



	return (
		<div className="select-container">
			<select style={{ height: 35 }} value={fieldName} onChange={handleChange}>
		
				{options}
			</select>
		</div>
	);
}

export default Dropdown;
