import { useDispatch, useSelector } from 'react-redux';
import './TodoBox.css';
import { useState } from 'react';
import generateUniqueId from '../utils/idgenerator';
import { addTask, deleteTask, taskCompleted } from '../data/Reducer';

const TodoBox = () => {
    let TodoData = useSelector(state => state.TodoData)// get data from store
    const [message, setMessage] = useState();//it is for task message
    const dispatch = useDispatch();
    function handleInput(e) {// if anybody press enter then task will add
        if (e.key == 'Enter' && message) {
            const uniqueId = generateUniqueId();//this will return a unique id
            dispatch(addTask({ id: uniqueId, content: message, isCompleted: false }))
            setMessage("");
        }
    }

    function handleAddTask() {
        if(message){
            const uniqueId = generateUniqueId();
            dispatch(addTask({ id: uniqueId, content: message, isCompleted: false }))//add new task
            setMessage("");
        }
    }

    return (
        <div className='box'>
            <h2>Todo List</h2>
            <div className='inputSection'>
                <input type='text' className='inputBox' value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => handleInput(e)} />
                <button onClick={handleAddTask}>Add</button>
            </div>
            <ul>
                {
                    TodoData.map((value) => (
                        <div className='itemList'  >
                            <li style={{ backgroundColor: value.isCompleted ? "#084183" : "" }}>
                                {value.isCompleted && <span className='completed'>Completed</span>}

                                <div className='checkboxImage' onClick={() => dispatch(taskCompleted({ id: value.id, completed: !value.isCompleted }))}>{value.isCompleted && "✔"}  </div>
                                <p>{value.content}</p>
                            </li>
                            <button className='deleteButton' onClick={() => dispatch(deleteTask({ id: value.id }))}>×</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default TodoBox