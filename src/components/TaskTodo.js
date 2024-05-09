import React from "react";
import styles4 from "./todolist.module.css";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";

import styles3 from "./delbutton.module.css";



export const TaskTodo =(props) =>{
const color = 'blue';
    const className = `${styles3.button} ${styles3[`button_${color}`]}`;
    return (
        <div key={props.id} >
                <div className={styles4.todo_item_container}>
                    <Form.Check type="checkbox"  >
                        <FormCheck.Input type="checkbox" onClick={()=>props.toggleTask(props.id)} defaultChecked={props.chstatus} />
                        <FormCheck.Label>
                            {props.value}
                        </FormCheck.Label>
                        <div className={styles3.button_container}>
                            <button className={className} onClick={()=>props.deleteTask(props.id)}>
                                <div className={styles3.field_container}>
                                    <label>X</label>
                                </div>
                            </button>
                        </div>
                        { props.isdeadline &&<div>
                            <FormCheck.Label>
                                {props.deadline}
                            </FormCheck.Label>
                        </div>}
                    </Form.Check>
                </div>
        </div>

    )
}