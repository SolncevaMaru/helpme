import React from "react";
import styles from "./todopanel.module.css";
import Button from "./Button";

function Input (props){
    return(
        <form className={styles.todo_panel_container}>
            <div className={styles.fields_container}>
                <div className={styles.field_container}>
                    <Input value={text} onChange={handleTextChange}/>
                </div>
                <div className={styles.button_container}>
                    <Button onClick={handleButtonClick}/>
                </div>
            </div>

        </form>
    )
}

export default Input;