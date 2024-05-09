import React from "react";


function MyButton (props){
    return(

        <button className={props.className} onClick={props.onClick}>Сохранить</button>

    )
}

export default MyButton;