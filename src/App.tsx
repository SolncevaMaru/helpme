import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Input from './components/Input'
import Button from './components/Button'

import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";

import styles from './components/todopanel.module.css'
import styles2 from './App.module.css';
import styles3 from './components/button.module.css'
import styles4 from './components/todolist.module.css'


import './App.module.css';

function App() {
  const[text,setText] = useState('');
  const[todos,setTodos] = useState(() => {
      // @ts-ignore
      return JSON.parse(localStorage.getItem("todos")) || []
  });
    const [stateChecked, setStateChecked] = useState(() => {
        // @ts-ignore
        return JSON.parse(localStorage.getItem("state")) || []
    });
    // const[todos,setTodos] = useState([]);


  // @ts-ignore
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  function changeCheckbox() {
    setChecked(!checked);
  }


  const [checked, setChecked] = useState(false);

  const [startDate, setStartDate] = useState(new Date());


    // @ts-ignore
    const FormCheckBox = ({ item,index }) => {

        const [state, setState] = useState({ checkedItems: [] });


        // @ts-ignore
        const handleClick = index => {
        const checkedItems = [...state.checkedItems];

        // @ts-ignore
        checkedItems[index] = !checkedItems[index];

        stateChecked[index] =checkedItems[index];
        localStorage.setItem("state", JSON.stringify(stateChecked));
        const my_bool = checkedItems[index];
        setState({ checkedItems });
        }
        //
        // useEffect(() => {
        //     localStorage.setItem("state", JSON.stringify(stateChecked));
        // }, [stateChecked]);

            return (
            <Form.Check type="checkbox" id={item} >
                <FormCheck.Input type="checkbox" onChange={() => handleClick(index)}/>
                <FormCheck.Label>{item}</FormCheck.Label>
            </Form.Check>
        );

    };


    const handleButtonClick = () => {
        if (text.trim() !== '') {
            // @ts-ignore
            setTodos([...todos, text]);
            // @ts-ignore
            setStateChecked([...stateChecked,false]);
            setText('');
        }
    };


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(stateChecked));
    }, [stateChecked]);




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
              <Button className={styles3.button} onClick={handleButtonClick}/>
            </div>
          </div>

              {todos.map((todo: any, index: React.Key | null | undefined) => (
                  <div className={styles4.todo_item_container}>
                      <FormCheckBox key ={index} item={todo} index={index}/>
                  </div>

              ))}

        </div>
      </div>

  );
}

export default App;
