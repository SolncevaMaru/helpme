import React from "react";

function Input (props){
    return(
            <input type="checkbox"
                   checked={props.checked}
                   onChange={props.onChange}
            />

    )
}

export default Input;