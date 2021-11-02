import React, {useCallback} from "react";
import {FilteredTask} from "../src/AppWithRedux";
import './App.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {addTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }

type PropsType = {
    tlId: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilteredTask, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
    filterTasks: FilteredTask

}


export const Todolist = React.memo(function (props: PropsType) {
    console.log('Todolist is called')
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.tlId)
    }, [props.addTask, props.tlId])

    const removeTodolist = () => {
        props.removeTodoList(props.tlId)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.tlId, title)
    }, [props.tlId, props.changeTodoListTitle])

    const onAllHandler = useCallback(() => props.changeFilter('All', props.tlId), [props.changeFilter, props.tlId])
    const onActiveHandler = useCallback(() => props.changeFilter('Active', props.tlId), [props.changeFilter, props.tlId])
    const onCompletedHandler = useCallback(() => props.changeFilter('Completed', props.tlId), [props.changeFilter, props.tlId])

    let tasksForTodolist = props.tasks

    if (props.filterTasks === 'Active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filterTasks === 'Completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.tlId}
                    key={t.id}
                />)
            }
        </div>
        <div>
            <Button
                variant={props.filterTasks === 'All' ? 'contained' : 'text'}
                onClick={onAllHandler}>All
            </Button>
            <Button
                color={'primary'}
                variant={props.filterTasks === 'Completed' ? 'contained' : 'text'}
                onClick={onCompletedHandler}>Complete
            </Button>
            <Button
                color={'secondary'}
                variant={props.filterTasks === 'Active' ? 'contained' : 'text'}
                onClick={
                    onActiveHandler
                }>Active
            </Button>
        </div>
    </div>
})











// import React, {useCallback} from "react";
// import {FilteredTask} from "../src/AppWithRedux";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {Button, IconButton} from "@material-ui/core";
// import {Delete} from "@material-ui/icons";
// import {addTaskAC} from "./state/tasks-reducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppRootState} from "./state/store";
// import {Task} from "./Task";
//
//
// type PropsType = {
//     tlId: string
//     title: string
//     changeFilter: (value: FilteredTask, todoListId: string) => void
//     removeTodoList: (tlId: string) => void
//     changeTodoListTitle: (tlId: string, title: string) => void
//     filterTasks: FilteredTask
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export const Todolist = React.memo ( function(props: PropsType) {
//     const dispatch = useDispatch()
//     const tasksObj = useSelector<AppRootState, Array<TasksArr>>(state => state.tasksObj[props.tlId])
//
//     // function changeTaskTitle(id: string, newTitle: string, tlId: string) {
//     //     dispatch(changeTaskTitleAC(id, newTitle, tlId))
//     // }
//
//     const addTask = useCallback((title: string) => {
//         dispatch(addTaskAC(title, props.tlId))
//     },[dispatch, props.tlId])  // dispatch нужен ли
//
//     const removeTodoList = () => {
//         props.removeTodoList(props.tlId)
//     }
//     const changeTodoListTitle = useCallback( (title: string) => {
//         props.changeTodoListTitle(props.tlId, title)
//     },[props.changeTodoListTitle, props.tlId])
//
//     const onAllHandler = useCallback (() => props.changeFilter('All', props.tlId),[props.changeFilter,props.tlId])
//     const onCompletedHandler = useCallback (() => props.changeFilter('Completed', props.tlId),[props.changeFilter, props.tlId])
//     const onActiveHandler = useCallback (() => props.changeFilter('Active', props.tlId),[props.changeFilter, props.tlId])
//
//     let allTodolistTasks = tasksObj;
//     let tasksForTodolist = allTodolistTasks;
//
//     if (props.filterTasks === 'Completed') {
//         tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false)
//     }
//     if (props.filterTasks === 'Active') {
//         tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true)
//     }
//     return (
//         <div>
//             <div>
//                 <h3><EditableSpan
//                     title={props.title}
//                     onChange={changeTodoListTitle}/>
//                     <IconButton onClick={removeTodoList}><Delete/></IconButton></h3>
//                 <AddItemForm addItem={addTask}/>
//             </div>
//
//             <div>
//                 {
//                     tasksForTodolist.map(t => <Task
//                         task={t}
//                         changeTaskStatus={props.changeFilter}
//                         changeTaskTitle={props.changeTaskTitle}
//
//                     />)
//                 }
//             </div>
//             <div>
//                 <Button
//                     variant={props.filterTasks === 'All' ? 'contained' : 'text'}
//                     onClick={onAllHandler}>All
//                 </Button>
//                 <Button
//                     color={'primary'}
//                     variant={props.filterTasks === 'Completed' ? 'contained' : 'text'}
//                     onClick={onCompletedHandler}>Complete
//                 </Button>
//                 <Button
//                     color={'secondary'}
//                     variant={props.filterTasks === 'Active' ? 'contained' : 'text'}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </Button>
//             </div>
//         </div>
//     )
// })









//
//
// {
//     tasksForTodolist.map(t =>
//         {
//             const onClickHandler = () => dispatch(removeTaskAC(t.id, props.tlId))
//             const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                 let newIsDoneValue = e.currentTarget.checked;
//                 dispatch(changeTaskStatusAC(t.id, newIsDoneValue, props.tlId))
//             }
//             const onChangeTitleHandler = (newValue: string) => {
//                 changeTaskTitleAC(t.id, newValue, props.tlId)
//             }
//             return (<li key={t.id}>
//                 <Checkbox
//                     checked={t.isDone}
//                     onChange={onChangeHandler}
//                 />
//                 <EditableSpan
//                     title={t.title}
//                     onChange={onChangeTitleHandler}
//                 ></EditableSpan>
//                 <IconButton onClick={onClickHandler}
//                             arial-label='delete'><Delete/></IconButton>
//             </li>)
//         }
//     )
// }
//









// import React, {ChangeEvent} from "react";
// import {FilteredTask, TodoListsType} from "./App";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {Button, Checkbox, IconButton} from "@material-ui/core";
// import {Delete} from "@material-ui/icons";
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     changeTaskTitle: (id: string, newTitle:string, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
//     removeTodoList: (tlId:string) => void
//     changeTodoListTitle: (tlId:string, title:string) => void
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export function Todolist(props: TypeProps) {
//
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//     const removeTodoList = () => {
//         props.removeTodoList(props.tlId)
//     }
//     const addTask = (title: string) => {
//         props.addTask(title, props.tlId)
//     }
//     const changeTodoListTitle = (title:string) => {
//         props.changeTodoListTitle(props.tlId, title)
//     }
//
//     return (
//         <div>
//             <div>
//
//                 <h3><EditableSpan
//                     title={props.title}
//                     onChange={changeTodoListTitle}/>
//                     <IconButton onClick={removeTodoList}><Delete /></IconButton></h3>
//                 <AddItemForm addItem={addTask}
//                     // tlId={props.tlId}
//                 />
//             </div>
//
//             <ul>
//                 {
//                     props.taska.map(t => {
//                         const onChangeTitleHandler = (newValue:string) => {
//                             props.changeTaskTitle(t.id, newValue, props.tlId)
//                         }
//                         return (     <li key={t.id}>
//                             <Checkbox
//                                 // type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//                             />
//                             <EditableSpan
//                                 title={t.title}
//                                 onChange={onChangeTitleHandler}
//                             ></EditableSpan>
//
//                             <IconButton onClick ={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}arial-label='delete'><Delete /></IconButton>
//                         </li>)
//                     })
//                 }
//             </ul>
//             <div>
//                 <Button
//                     variant={props.filterTasks === 'All' ? 'contained' : 'text'}
//                     // className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={onAllHandler}>All
//                 </Button>
//                 <Button
//                     color={'primary'}
//                     // className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Completed' ? 'contained' : 'text'}
//                     onClick={onCompletedHandler}>Complete
//                 </Button>
//                 <Button
//                     color={'secondary'}
//                     // className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Active' ? 'contained' : 'text'}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </Button>
//             </div>
//         </div>
//     )
// }


/////////////////////////////////////////////Todolist 8
// import React, {ChangeEvent} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {Button, Checkbox, IconButton} from "@material-ui/core";
// import {Delete} from "@material-ui/icons";
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     changeTaskTitle: (id: string, newTitle:string, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
//     removeTodoList: (tlId:string) => void
//     changeTodoListTitle: (tlId:string, title:string) => void
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export function Todolist(props: TypeProps) {
//
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//     const removeTodoList = () => {
//         props.removeTodoList(props.tlId)
//     }
//     const addTask = (title: string) => {
//         props.addTask(title, props.tlId)
//     }
//     const changeTodoListTitle = (title:string) => {
//         props.changeTodoListTitle(props.tlId, title)
//     }
//
//     return (
//         <div>
//             <div>
//
//                 <h3><EditableSpan
//                     title={props.title}
//                     onChange={changeTodoListTitle}/>
//                     <IconButton onClick={removeTodoList}><Delete /></IconButton></h3>
//                 <AddItemForm addItem={addTask}
//                     // tlId={props.tlId}
//                 />
//             </div>
//
//             <ul>
//                 {
//                     props.taska.map(t => {
//                         const onChangeTitleHandler = (newValue:string) => {
//                             props.changeTaskTitle(t.id, newValue, props.tlId)
//                         }
//                         return (     <li key={t.id}>
//                             <Checkbox
//                                 // type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//                             />
//                             <EditableSpan
//                                 title={t.title}
//                                 onChange={onChangeTitleHandler}
//                             ></EditableSpan>
//
//                             <IconButton onClick ={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}arial-label='delete'><Delete /></IconButton>
//                         </li>)
//                     })
//                 }
//             </ul>
//             <div>
//                 <Button
//                     variant={props.filterTasks === 'All' ? 'contained' : 'text'}
//                     // className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={onAllHandler}>All
//                 </Button>
//                 <Button
//                     color={'primary'}
//                     // className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Completed' ? 'contained' : 'text'}
//                     onClick={onCompletedHandler}>Complete
//                 </Button>
//                 <Button
//                     color={'secondary'}
//                     // className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Active' ? 'contained' : 'text'}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </Button>
//             </div>
//         </div>
//     )
// }


////////////////////////////////////////////////Task 7
// import React, {ChangeEvent} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
// import {Button, Checkbox, IconButton} from "@material-ui/core";
// import {Delete} from "@material-ui/icons";
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     changeTaskTitle: (id: string, newTitle:string, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
//     removeTodoList: (tlId:string) => void
//     changeTodoListTitle: (tlId:string, title:string) => void
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export function Todolist(props: TypeProps) {
//
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//     const removeTodoList = () => {
//         props.removeTodoList(props.tlId)
//     }
//     const addTask = (title: string) => {
//         props.addTask(title, props.tlId)
//     }
//     const changeTodoListTitle = (title:string) => {
//         props.changeTodoListTitle(props.tlId, title)
//     }
//
//     return (
//         <div>
//             <div>
//
//                 <h3><EditableSpan
//                     title={props.title}
//                     onChange={changeTodoListTitle}/>
//                     <IconButton onClick={removeTodoList}><Delete /></IconButton></h3>
//                 <AddItemForm addItem={addTask}
//                     // tlId={props.tlId}
//                 />
//             </div>
//
//             <ul>
//                 {
//                     props.taska.map(t => {
//                         const onChangeTitleHandler = (newValue:string) => {
//                             props.changeTaskTitle(t.id, newValue, props.tlId)
//                         }
//                         return (     <li key={t.id}>
//                             <Checkbox
//                                 // type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//                             />
//                             <EditableSpan
//                                 title={t.title}
//                                 onChange={onChangeTitleHandler}
//                             ></EditableSpan>
//
//                             <IconButton onClick ={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}arial-label='delete'><Delete /></IconButton>
//                         </li>)
//                     })
//                 }
//             </ul>
//             <div>
//                 <Button
//                     variant={props.filterTasks === 'All' ? 'contained' : 'text'}
//                     // className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={onAllHandler}>All
//                 </Button>
//                 <Button
//                     color={'primary'}
//                     // className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Completed' ? 'contained' : 'text'}
//                     onClick={onCompletedHandler}>Complete
//                 </Button>
//                 <Button
//                     color={'secondary'}
//                     // className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     variant={props.filterTasks === 'Active' ? 'contained' : 'text'}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </Button>
//             </div>
//         </div>
//     )
// }


///////////////////////////////////////////////////////////////Task 6 30 min
// import React, {ChangeEvent, useState, KeyboardEvent} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export function Todolist(props: TypeProps) {
//
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//
//     const addTask = (title: string) => {
//         debugger
//         props.addTask(title, props.tlId);
//     }
//
//
//     return (
//         <div>
//                 <h3>{props.title}</h3>
//             <AddItemForm addItem={addTask}/>
//
//
//             <ul>
//                 {
//                     props.taska.map(t =>
//                         <li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//                             />
//                             <span>{t.title}</span>
//                             <button onClick={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}>del
//                             </button>
//                         </li>)
//                 }
//             </ul>
//             <div>
//                 <button
//                     className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={
//                         onAllHandler
//                     }>All
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     onClick={
//                         onCompletedHandler
//                     }>Complete
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </button>
//             </div>
//         </div>
//     )
// }


// type addItemFormtype = {
//         addTask: (newValue: string, tlId: string) => void
//         tlId: string
// }

// function AddItemForm (props: addItemFormtype) {
//     let [newValue, setNewValue] = useState('')
//     let [error, setError] = useState<null | string>(null)
//
//     const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
//         setNewValue(e.currentTarget.value)
//         setError(null)
//     }
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13 && e.ctrlKey) {
//             props.addTask(newValue, props.tlId);
//             setNewValue('')
//         }
//     }
//     const addTask = () => {
//         if (newValue === '') {
//             setError('Enter information')
//             return;
//         }
//         props.addTask(newValue.trim(), props.tlId);
//         setNewValue('')
//     }
//
//         return (
//     <div>
//         <input
//             className={error ? 'error' : ''}
//             value={newValue}
//             onChange={onChangeHadler}
//             onKeyPress={onKeyPressHandler}
//         />
//         <button onClick={addTask}>Add
//         </button>
//         {error && <div className='error-message'>{error}</div>}
//     </div>
//         )
// }


////////////////////////////////////////////// TASK 6
// import React, {ChangeEvent} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
// import {AddItemForm} from "./AddItemForm";
// import {EditableSpan} from "./EditableSpan";
//
// type TypeProps = {
//     title: string
//     taska: TasksType[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (title: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     changeCheckedTitle: (id: string, newtTitle: string, tlId: string) => void
//     removeTodoList: (id:string) => void
//     changeTodoListTitle: (id:string, newTitle: string) => void
//     filterTasks: FilteredTask
//     tlId: string
// }
// export type TasksType = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
// export function Todolist(props: TypeProps) {
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//     const addTask = (title: string) => {
//         props.addTask(title, props.tlId)
//     }
//
//     const removeTodoList = () => {
//         props.removeTodoList(props.tlId)
//     }
//
//     const changeTodolistTitle = (newTitle:string) => {
//         props.changeTodoListTitle(props.tlId, newTitle);
//     }
//
//     return (
//         <div>
//
//             <h3>
//                 <button onClick={removeTodoList}>x</button>
//                 <EditableSpan title={props.title} onChange={ changeTodolistTitle }/>
//             </h3>
//             <AddItemForm addItem={addTask}/>
//             <ul>
//                 {
//                     props.taska.map(t => {
//                         const onClickStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
//                             props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                         }
//                         const onChangeTitleHandler = (newValue: string) => {
//                             props.changeCheckedTitle(t.id, newValue, props.tlId)}
//
//                         const onClickHandler = () => {
//                             props.delTask(t.id, props.tlId)
//                         }
//
//
//                         return (<li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={ onClickStatusHandler }
//                             />
//                             {/*<span>{t.title} ---- </span>*/}
//                             <EditableSpan title={t.title}
//                                           onChange={ onChangeTitleHandler }/>
//                             <button onClick={ onClickHandler }>del
//                             </button>
//                         </li>)
//                     })
//                 }
//             </ul>
//             <div>
//                 <button
//                     className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={
//                         onAllHandler
//                     }>All
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     onClick={
//                         onCompletedHandler
//                     }>Complete
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </button>
//             </div>
//         </div>
//     )
// }


//////////////////////////////////////////////////////////////////////// Task 5 refactor
// import React, {ChangeEvent, useState, KeyboardEvent} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
// export function Todolist(props: TypeProps) {
//     let [newValue, setNewValue] = useState('')
//     let [error, setError] = useState<null | string>(null)
//
//     const addTask = () => {
//         if (newValue === '') {
//             setError('Enter information')
//             return;
//         }
//         props.addTask(newValue.trim(), props.tlId);
//         setNewValue('')
//     }
//     const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
//         setNewValue(e.currentTarget.value)
//         setError(null)
//     }
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13 && e.ctrlKey) {
//             props.addTask(newValue, props.tlId);
//             setNewValue('')
//         }
//     }
//
//     const onAllHandler = () => {
//         props.changeTask('All', props.tlId)
//     }
//     const onCompletedHandler = () => {
//         props.changeTask('Completed', props.tlId)
//     }
//     const onActiveHandler = () => {
//         props.changeTask('Active', props.tlId)
//     }
//
//     return (
//         <div>
//             <div>
//                 <h3>{props.title}</h3>
//                 <div>
//                     <input
//                         className={error ? 'error' : ''}
//                         value={newValue}
//                         onChange={onChangeHadler}
//                         onKeyPress={onKeyPressHandler}
//                     />
//                     <button onClick={addTask}>Add
//                     </button>
//                     {error && <div className='error-message'>{error}</div>}
//                 </div>
//             </div>
//
//             <ul>
//                 {
//                     props.taska.map(t =>
//                         <li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//                             />
//                             <span>{t.title}</span>
//                             <button onClick={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}>del
//                             </button>
//                         </li>)
//                 }
//             </ul>
//             <div>
//                 <button
//                     className={props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={
//                         onAllHandler
//                     }>All
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Completed' ? 'active-filter' : ''}
//                     onClick={
//                         onCompletedHandler
//                     }>Complete
//                 </button>
//                 <button
//                     className={props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={
//                         onActiveHandler
//                     }>Active
//                 </button>
//             </div>
//         </div>
//     )
// }
//


/////////////////////////////////////////////////Task 5
// React, {ChangeEvent, useState} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string, tlId: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string, tlId: string) => void
//     changeChecked: (id: string, isDone: boolean, tlId: string) => void
//     filterTasks: FilteredTask
//     tlId: string
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
//
// export function Todolist(props: TypeProps) {
//     let [newValue, setNewValue] = useState('')
//     let [error, setError] = useState<null | string>(null)
//
//     return (
//         <div>
//             <div>
//                 <h3>{props.title}</h3>
//                 <input
//                     className={ error ? 'error' : ''}
//                     value={newValue}
//                     onChange={(e) => {
//                         setNewValue(e.currentTarget.value)
//                         setError(null)
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.charCode === 13 && e.ctrlKey) {
//                             props.addTask(newValue, props.tlId);
//                             setNewValue('')
//                         }
//                     }}
//                 />
//                 <button onClick={() => {
//                     if (newValue === '') {
//                         setError('Enter information')
//                         return;
//                     }
//                     props.addTask(newValue.trim(), props.tlId);
//                     setNewValue('')
//                 }
//                 }>Add
//                 </button>
//                 {error && <div className='error-message'>{error}</div>}
//             </div>
//
//
//             <ul>
//                 {
//                     props.taska.map(t =>
//                         <li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked, props.tlId)
//                                 }
//                                 }
//
//
//                             />
//                             <span>{t.title}</span>
//                             <button onClick={() => {
//                                 props.delTask(t.id, props.tlId)
//                             }}>del
//                             </button>
//                         </li>)
//                 }
//             </ul>
//             <div>
//                 <button
//                     className={ props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('All', props.tlId)
//                     }}>All
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Completed' ? 'active-filter' : '' }
//                     onClick={() => {
//                         props.changeTask('Completed', props.tlId)
//                     }}>Complete
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('Active', props.tlId)
//                     }}>Active
//                 </button>
//             </div>
//
//         </div>


// import React, {ChangeEvent, useState} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string) => void
//     changeTask: (value: FilteredTask, todoListId: string) => void
//     addTask: (value: string) => void
//     changeChecked: (id: string, isDone: boolean) => void
//     filterTasks: FilteredTask
//     id: string
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
// export function Todolist(props: TypeProps) {
//     let [newValue, setNewValue] = useState('')
//     let [error, setError] = useState<null | string>(null)
//
//     return (
//         <div>
//             <div>
//                 <h3>{props.title}</h3>
//                 <input
//                     className={ error ? 'error' : ''}
//                     value={newValue}
//                     onChange={(e) => {
//                         setNewValue(e.currentTarget.value)
//                         setError(null)
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.charCode === 13 && e.ctrlKey) {
//                             props.addTask(newValue);
//                             setNewValue('')
//                         }}}
//                 />
//                 <button onClick={() => {
//                     if (newValue === '') {
//                         setError('Enter information')
//                         return;
//                     }
//                     props.addTask(newValue.trim());
//                     setNewValue('')
//                 }
//                 }>Add
//                 </button>
//                 {error && <div className='error-message'>{error}</div>}
//             </div>
//
//             <ul>
//                 {props.taska.map(t =>
//                         <li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked)}}
//                             />
//                             <span>{t.title}</span>
//                             <button onClick={() => {
//                                 props.delTask(t.id)
//                             }}>del
//                             </button>
//                         </li>)}
//             </ul>
//             <div>
//                 <button
//                     className={ props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('All', props.id)
//                     }}>All
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Complete' ? 'active-filter' : '' }
//                     onClick={() => {
//                         props.changeTask('Complete', props.id)
//                     }}>Complete
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('Active', props.id)
//                     }}>Active
//                 </button>
//             </div>
//
//         </div>
//     )
// }
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
// (e) => {
//                         setNewValue(e.currentTarget.value)
//                         setError(null)
//
//
// const addChangeFilterAll = () => props.changeFilter('All')
// const addChangeFilterActive = () => props.changeFilter('Active')
// const addChangeFilterCompleted = () => props.changeFilter('Completed')
//
// return (
//     <div>
//         <h3> {props.task[0].title}</h3>
//         <input value={newTaskTitle}
//                onChange={onChangeValue}
//                onKeyPress = {onKeyPressValue}
//         />
//         <button onClick={addTask}>+</button>
//
//         <div>
//             <ul>
//                 {
//                     props.task.map( t => {
//                         const onRemoveHandler = () => {props.removeTask(t.id)}
//                         return <li key={t.id}>
//                             <input type='checkbox' checked={t.isDone}/>
//                             <span>{t.title}</span>
//                             <button onClick={onRemoveHandler}>x</button>
//                         </li>
//                     })
//                 }
//             </ul>
//             <button onClick={addChangeFilterAll}>All</button>
//             <button onClick={addChangeFilterActive}>Completed</button>
//             <button onClick={addChangeFilterCompleted}>Active</button>
//
//
// ///////////////////////////////////////////////////////Task 4
// import React, {ChangeEvent, useState} from "react";
// import {FilteredTask} from "./App";
// import './App.css'
//
// type TypeProps = {
//     title: string
//     taska: TasksArr[]
//     delTask: (id: string) => void
//     changeTask: (value: FilteredTask) => void
//     addTask: (value: string) => void
//     changeChecked: (id: string, isDone: boolean) => void
//     filterTasks: FilteredTask
// }
// export type TasksArr = {
//     id: string
//     title: string
//     isDone: boolean
// }
//
//
//
// export function Todolist(props: TypeProps) {
//     let [newValue, setNewValue] = useState('')
//     let [error, setError] = useState<null | string>(null)
//
//     return (
//         <div>
//             <div>
//                 <h3>{props.title}</h3>
//                 <input
//                     className={ error ? 'error' : ''}
//                     value={newValue}
//                     onChange={(e) => {
//                         setNewValue(e.currentTarget.value)
//                         setError(null)
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.charCode === 13 && e.ctrlKey) {
//                             props.addTask(newValue);
//                             setNewValue('')
//                         }
//                     }}
//                 />
//                 <button onClick={() => {
//                     if (newValue === '') {
//                         setError('Enter information')
//                         return;
//                     }
//                     props.addTask(newValue.trim());
//                     setNewValue('')
//                 }
//                 }>Add
//                 </button>
//                 {error && <div className='error-message'>{error}</div>}
//             </div>
//
//
//             <ul>
//                 {
//                     props.taska.map(t =>
//                         <li key={t.id}>
//                             <input
//                                 type='checkbox'
//                                 checked={t.isDone}
//                                 onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                                     props.changeChecked(t.id, e.currentTarget.checked)
//                                 }
//                                 }
//
//
//                             />
//                             <span>{t.title}</span>
//                             <button onClick={() => {
//                                 props.delTask(t.id)
//                             }}>del
//                             </button>
//                         </li>)
//                 }
//             </ul>
//             <div>
//                 <button
//                     className={ props.filterTasks === 'All' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('All')
//                     }}>All
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Complete' ? 'active-filter' : '' }
//                     onClick={() => {
//                         props.changeTask('Complete')
//                     }}>Complete
//                 </button>
//                 <button
//                     className={ props.filterTasks === 'Active' ? 'active-filter' : ''}
//                     onClick={() => {
//                         props.changeTask('Active')
//                     }}>Active
//                 </button>
//             </div>
//
//         </div>
//     )
// }
//




































