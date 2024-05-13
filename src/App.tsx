import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Input from './components/Input'
import MyButton from './components/Button'
import {TaskTodo} from './components/TaskTodo'

import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";

import styles from './components/todopanel.module.css'
// import styles2 from './App.css';
import styles3 from './components/button.module.css'

import {Carousel, CarouselProps} from "antd";
import './App.css';
//@ts-ignore
import styled from 'styled-components';

import ReactPlayer from 'react-player'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';

import { Button, Layout, theme } from 'antd';

const { Sider, Content } = Layout;


function App() {
  const[text,setText] = useState('');
    // @ts-ignore
    const initState:[] = JSON.parse(localStorage.getItem("todos"));
  const[todos,setTodos] = useState(() => {
      return initState || []
  });

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const CarouselWrapper = styled(Carousel)`
    > .slick-dots li button {
     width: 20px;
     height: 4px;
      background: #888585;
   }
   > .slick-dots li.slick-active button {
     width: 20px;
     height: 4px;
     background: #888585;
   }
`;

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
    let copiTasks = todos.filter(e => e.chstatus === false);
    // @ts-ignore
    let done_copiTasks = todos.filter(e => e.chstatus === true);

    // @ts-ignore
    const taskTodoList = done_copiTasks.map(({id, chstatus, value,deadline,isdeadline})  => <TaskTodo id={id}
                                                                       value={value}
                                                                       chstatus={chstatus}
                                                                       toggleTask={toggleTask}
                                                                       deadline={deadline}
                                                                       isdeadline={isdeadline}
                                                                     deleteTask ={deleteTask}/>);

    const taskTodoList2 = copiTasks.map(({id, chstatus, value,deadline,isdeadline})  => <TaskTodo id={id}
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



    type DotPosition = CarouselProps['dotPosition'];

    const [dotPosition, setDotPosition] = useState<DotPosition>('top');

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={!collapsed} style={{ background: colorBgContainer }}>
                <div className="demo-logo-vertical" />
                <Button
                    type="text"
                    icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 80,
                        height: 80,
                    }}
                />
                {collapsed &&<ReactPlayer url='https://www.youtube.com/watch?v=_BtXPQimVhg' width={'200px'} height={'112px'}/>}
            </Sider>

            <Layout>

                <Content style={{
                    margin: '4px 4px',
                    padding: 5,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}>
                    <div className="App">
                        <div className="container">
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
                                    <MyButton className={my_className} onClick={addTask}/>
                                </div>
                            </div>
                            <CarouselWrapper dotPosition={dotPosition} >
                                <div>
                                    {taskTodoList2}
                                </div>
                                <div >
                                    {taskTodoList}
                                </div>
                            </CarouselWrapper>
                        </div>
                    </div>
                </Content>

            </Layout>

        </Layout>

  );
}

export default App;