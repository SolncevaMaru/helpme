import React,{useState} from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Input from './components/Input'
import Button from './components/Button'


import Checkbox from './components/checkbox'
import styles from './components/todopanel.module.css'
import styles2 from './App.module.css';
import styles3 from './components/button.module.css'

import './App.module.css';

function App() {
  const[text,setText] = useState('');

  // @ts-ignore
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleButtonClick = () => {
    alert(text);
  };

  function changeCheckbox() {
    setChecked(!checked);
  }

  const [checked, setChecked] = useState(false);

  const [startDate, setStartDate] = useState(new Date());

  return (
      <div className={styles2.app_container}>
        <div className={styles2.container}>

          <div className={styles.todo_panel_container}>

            <div className={styles.fields_container}>
              <div className={styles.field_container}>
                <label htmlFor='name'>
                  <Input value={text} onChange={handleTextChange}/>
                </label>
              </div>
            </div>

            <label htmlFor='name'>
              <Checkbox checked={checked} onChange={changeCheckbox}/>
              Делайн
            </label>

            {checked &&<div className={styles.fields_container}>
              <div className={styles.field_container}>
                <label htmlFor='name'>
                  <DatePicker selected={startDate}
                              onChange={(date:Date) => setStartDate(date)}
                              dateFormat="dd.MM.yyyy"/>
                </label>
              </div>
            </div>}

            <div className={styles.button_container}>
              <Button className={styles3.button} onClick={handleButtonClick}/>
            </div>
          </div>

        </div>
      </div>

  );
}

export default App;
