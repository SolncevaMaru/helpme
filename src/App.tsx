import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Input from './components/Input'
import Button from './components/Button'
import {TaskTodo} from './components/TaskTodo'

import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";

import styles from './components/todopanel.module.css'
import styles2 from './App.module.css';
import styles3 from './components/button.module.css'


import './App.module.css';

function App() {
  const[text,setText] = useState('');
    // @ts-ignore
    const initState:[] = JSON.parse(localStorage.getItem("todos"));
  const[todos,setTodos] = useState(() => {
      return initState || []
  });



  // @ts-ignore
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  function changeCheckbox() {
    setChecked(!checked);
  }


  const [checked, setChecked] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

    const addTask = () => {
        if (text.trim() !== '') {
            if(!checked)
            {
                const taskTodo={
                    id: Math.random(),
                    value:text,
                    chstatus:false,
                    deadline: null,
                    isdeadline:false
                }
                let newTask =[...todos,taskTodo];
                // @ts-ignore
                setTodos(newTask);
                setText('');
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            else
            {
                const taskTodo={
                    id: Math.random(),
                    value:text,
                    chstatus:false,
                    deadline: startDate.toLocaleDateString(),
                    isdeadline:true
                }
                let newTask =[...todos,taskTodo];
                // @ts-ignore
                setTodos(newTask);
                setText('');
                localStorage.setItem("todos", JSON.stringify(todos));
            }

        }
    };

    // @ts-ignore
    const toggleTask = id => {
        // @ts-ignore
        const toggle = todos.map(e => e.id === id ? {...e, chstatus : !e.chstatus} : {...e});
        // @ts-ignore
        setTodos(toggle);
        // @ts-ignore
        localStorage.setItem("todos", JSON.stringify(toggle));


    };

    // @ts-ignore
    const deleteTask = id => {
        // @ts-ignore
        const del = todos.filter(e=> e.id !== id)
        // @ts-ignore
        setTodos(del);
        localStorage.removeItem(id)
    }

    // @ts-ignore
    const taskTodoList = todos.map(({id, chstatus, value,deadline,isdeadline})  => <TaskTodo id={id}
                                                                       value={value}
                                                                       chstatus={chstatus}
                                                                       toggleTask={toggleTask}
                                                                       deadline={deadline}
                                                                       isdeadline={isdeadline}
                                                                     deleteTask ={deleteTask}/>);


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const color = 'blue';
    const my_className = `${styles3.button} ${styles3[`button_${color}`]}`;


    return (
      <div className={styles2.app_container}>
        <div className={styles2.container}>

          <div className={styles.todo_panel_container}>

            <div className={styles.fields_container}>
              <div className={styles.field_container}>
                <label>
                  <Input value={text} onChange={handleTextChange}/>
                </label>
              </div>
            </div>

              <Form.Check type="checkbox" >
                  <FormCheck.Input type="checkbox" onChange={changeCheckbox} checked={checked} />
                  <FormCheck.Label style={styles}>{"Дедлайн"}</FormCheck.Label>
              </Form.Check>

            {checked &&<div className={styles.fields_container}>
              <div className={styles.field_container}>
                <label htmlFor='name'>
                  <DatePicker selected={startDate}
                              onChange={(date:Date) => setStartDate(date)}
                              dateFormat="dd.MM.yyyy"
                              minDate={new Date()}
                              calendarStartDay={1}
                              todayButton="Сегодня"/>
                </label>
              </div>
            </div>}

            <div className={styles.button_container}>
              <Button className={my_className} onClick={addTask}/>
            </div>
          </div>

            {taskTodoList}

        </div>
      </div>

  );
}

export default App;
