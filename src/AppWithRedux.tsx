import React, {useCallback} from "react";
import {TaskType, Todolist} from './Todolist'
import {AddItemForm} from "./AddItemForm";
import {
    AppBar,
    Button,
    IconButton,
    LinearProgress,
    Typography,
    Toolbar,
    Container,
    Grid,
    Paper
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    filterTodoListAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilteredTask = 'All' | 'Completed' | 'Active'

export type TodoListsType = {
    id: string,
    title: string,
    filter: FilteredTask
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()
    const todolists = useSelector<AppRootState, Array<TodoListsType>> (state => state.todolists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasksObj)

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback(function (title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeStatus = useCallback(function (id: string, isDone: boolean, todolistId: string) {
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    }, [dispatch]);


    const changeFilter = useCallback ((value: FilteredTask, todoListId: string) => {
        dispatch(filterTodoListAC(todoListId, value))
    },[dispatch])

    const removeTodoList = useCallback ((id: string) => {
        dispatch(removeTodolistAC(id))
    },[dispatch])

    const addTodolist = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    },[dispatch])

    const changeTodoListTitle = useCallback((tlId: string, title: string) => {
        dispatch(changeTodolistAC(tlId, title))
    },[dispatch])

    return (
        <div className='App'>
            <Container fixed>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton edge='start' color='inherit' aria-label='menu'>
                            <Menu/>
                        </IconButton>
                        <Typography variant='h6'>
                            News
                        </Typography>
                        <Button color='inherit'>Login</Button>
                    </Toolbar>
                </AppBar>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasksObj[tl.id];
                            let tasksForTodolist = allTodolistTasks;
                            return (
                                <Grid item>
                                    <Paper style={{padding: '20px'}} elevation={7}>
                                        <Todolist
                                            // key={tl.id}
                                            // tlId={tl.id}
                                            // changeFilter={changeFilter}
                                            // title={tl.title}
                                            // filterTasks={tl.filter}
                                            // removeTodoList={removeTodoList}
                                            // changeTodoListTitle={changeTodoListTitle}
                                            key={tl.id}
                                            tlId={tl.id}
                                            changeTaskStatus={changeStatus}
                                            addTask={addTask}
                                            changeFilter={changeFilter}
                                            removeTask={removeTask}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            filterTasks={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;


// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
// import {clearLine} from "readline";
// import {AddItemForm} from "./AddItemForm";
// import {
//     AppBar,
//     Button,
//     IconButton,
//     LinearProgress,
//     Typography,
//     Toolbar,
//     Container,
//     Grid,
//     Paper
// } from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
// export type TodoListsType = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// export type TasksStateType = {
//     [key: string]: Array<TasksArr>
// }
//
// function App() {
//
//     function addTask(value: string, tlId: string) {
//         let newTask = {id: v1(), title: value, isDone: true};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask, ...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeChecked(id: string, isDone: boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find(tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }
//     }
//
//     function delTask(id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj})
//     }
//
//
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ])
//     let [tasksObj, setTasks] = useState<TasksStateType>({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//
//     function removeTodoList(id: string) {
//         let filterTodoList = todoLists.filter(tl => tl.id !== id)
//         todoLists = filterTodoList
//         setTodoLists([...todoLists])
//     }
//
//     function addTodolist(title: string) {
//         let todolist: TodoListsType = {
//             id: v1(),
//             title: title,
//             filter: 'All'
//         }
//         setTodoLists([todolist, ...todoLists])
//         setTasks({
//             ...tasksObj,
//             [todolist.id]: []
//         })
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.title = newTitle;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTodoListTitle(tlId: string, title: string) {
//         let newTodolist = todoLists.find(tl => tl.id === tlId)
//         if (newTodolist) {
//             newTodolist.title = title
//         }
//         setTodoLists([...todoLists])
//     }
//
//     return (
//         <div className='App'>
//             <Container fixed>
//                 <AppBar position='static'>
//                     <Toolbar>
//                         <IconButton edge='start' color='inherit' aria-label='menu'>
//                             <Menu/>
//                         </IconButton>
//                         <Typography variant='h6'>
//                             News
//                         </Typography>
//                         <Button color='inherit'>Login</Button>
//                     </Toolbar>
//                 </AppBar>
//                 <Grid container style = { {padding:'20px'} } >
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todoLists.map(tl => {
//                             let tasksForTodolist = tasksObj[tl.id]
//                             if (tl.filter === 'Completed') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                             }
//                             if (tl.filter === 'Active') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper style={ { padding: '20px' } }
//                                            elevation={7}
//                                     >
//                                         <Todolist
//                                             key={tl.id}
//                                             tlId={tl.id}
//                                             changeChecked={changeChecked}
//                                             addTask={addTask}
//                                             changeTask={changeTask}
//                                             delTask={delTask}
//                                             title={tl.title}
//                                             taska={tasksForTodolist}
//                                             filterTasks={tl.filter}
//                                             removeTodoList={removeTodoList}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodoListTitle={changeTodoListTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default App


//////////////////////////////////////////////  Todolist 8
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
// import {clearLine} from "readline";
// import {AddItemForm} from "./AddItemForm";
// import {
//     AppBar,
//     Button,
//     IconButton,
//     LinearProgress,
//     Typography,
//     Toolbar,
//     Container,
//     Grid,
//     Paper
// } from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
// export type TodoListsType = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// function App() {
//
//     function addTask(value: string, tlId: string) {
//         let newTask = {id: v1(), title: value, isDone: true};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask, ...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeChecked(id: string, isDone: boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find(tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }
//     }
//
//     function delTask(id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj})
//     }
//
//     type TasksStateType = {
//         [key: string]: Array<TasksArr>
//     }
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ])
//     let [tasksObj, setTasks] = useState<TasksStateType>({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//
//     function removeTodoList(id: string) {
//         let filterTodoList = todoLists.filter(tl => tl.id !== id)
//         todoLists = filterTodoList
//         setTodoLists([...todoLists])
//     }
//
//     function addTodolist(title: string) {
//         let todolist: TodoListsType = {
//             id: v1(),
//             title: title,
//             filter: 'All'
//         }
//         setTodoLists([todolist, ...todoLists])
//         setTasks({
//             ...tasksObj,
//             [todolist.id]: []
//         })
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.title = newTitle;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTodoListTitle(tlId: string, title: string) {
//         let newTodolist = todoLists.find(tl => tl.id === tlId)
//         if (newTodolist) {
//             newTodolist.title = title
//         }
//         setTodoLists([...todoLists])
//     }
//
//     return (
//         <div className='App'>
//             <Container fixed>
//                 <AppBar position='static'>
//                     <Toolbar>
//                         <IconButton edge='start' color='inherit' aria-label='menu'>
//                             <Menu/>
//                         </IconButton>
//                         <Typography variant='h6'>
//                             News
//                         </Typography>
//                         <Button color='inherit'>Login</Button>
//                     </Toolbar>
//                 </AppBar>
//                 <Grid container style = { {padding:'20px'} } >
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todoLists.map(tl => {
//                             let tasksForTodolist = tasksObj[tl.id]
//                             if (tl.filter === 'Completed') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                             }
//                             if (tl.filter === 'Active') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper style={ { padding: '20px' } }
//                                            elevation={7}
//                                     >
//                                         <Todolist
//                                             key={tl.id}
//                                             tlId={tl.id}
//                                             changeChecked={changeChecked}
//                                             addTask={addTask}
//                                             changeTask={changeTask}
//                                             delTask={delTask}
//                                             title={tl.title}
//                                             taska={tasksForTodolist}
//                                             filterTasks={tl.filter}
//                                             removeTodoList={removeTodoList}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodoListTitle={changeTodoListTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default App


///////////////////////////////////////////////////////////////////////Task 7
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
// import {clearLine} from "readline";
// import {AddItemForm} from "./AddItemForm";
// import {
//     AppBar,
//     Button,
//     IconButton,
//     LinearProgress,
//     Typography,
//     Toolbar,
//     Container,
//     Grid,
//     Paper
// } from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
// type TodoLists = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// function App() {
//
//     function addTask(value: string, tlId: string) {
//         let newTask = {id: v1(), title: value, isDone: true};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask, ...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeChecked(id: string, isDone: boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find(tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }
//     }
//
//     function delTask(id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj})
//     }
//
//     type TasksStateType = {
//         [key: string]: Array<TasksArr>
//     }
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState<Array<TodoLists>>([
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ])
//     let [tasksObj, setTasks] = useState<TasksStateType>({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//
//     function removeTodoList(id: string) {
//         let filterTodoList = todoLists.filter(tl => tl.id !== id)
//         todoLists = filterTodoList
//         setTodoLists([...todoLists])
//     }
//
//     function addTodolist(title: string) {
//         let todolist: TodoLists = {
//             id: v1(),
//             title: title,
//             filter: 'All'
//         }
//         setTodoLists([todolist, ...todoLists])
//         setTasks({
//             ...tasksObj,
//             [todolist.id]: []
//         })
//     }
//
//     function changeTaskTitle(id: string, newTitle: string, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find(t => t.id === id)
//         if (newTask) {
//             newTask.title = newTitle;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTodoListTitle(tlId: string, title: string) {
//         let newTodolist = todoLists.find(tl => tl.id === tlId)
//         if (newTodolist) {
//             newTodolist.title = title
//         }
//         setTodoLists([...todoLists])
//     }
//
//     return (
//         <div className='App'>
//             <Container fixed>
//                 <AppBar position='static'>
//                     <Toolbar>
//                         <IconButton edge='start' color='inherit' aria-label='menu'>
//                             <Menu/>
//                         </IconButton>
//                         <Typography variant='h6'>
//                             News
//                         </Typography>
//                         <Button color='inherit'>Login</Button>
//                     </Toolbar>
//                 </AppBar>
//                 <Grid container style = { {padding:'20px'} } >
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container spacing={5}>
//                     {
//                         todoLists.map(tl => {
//                             let tasksForTodolist = tasksObj[tl.id]
//                             if (tl.filter === 'Completed') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                             }
//                             if (tl.filter === 'Active') {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                             }
//
//                             return (
//                                 <Grid item>
//                                     <Paper style={ { padding: '20px' } }
//                                            elevation={7}
//                                     >
//                                         <Todolist
//                                             key={tl.id}
//                                             tlId={tl.id}
//                                             changeChecked={changeChecked}
//                                             addTask={addTask}
//                                             changeTask={changeTask}
//                                             delTask={delTask}
//                                             title={tl.title}
//                                             taska={tasksForTodolist}
//                                             filterTasks={tl.filter}
//                                             removeTodoList={removeTodoList}
//                                             changeTaskTitle={changeTaskTitle}
//                                             changeTodoListTitle={changeTodoListTitle}
//                                         />
//                                     </Paper>
//                                 </Grid>
//                             )
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     )
// }
//
// export default App


////////////////////////////////////////////Task 6 30min
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
// import {AddItemForm} from "./AddItemForm";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
//
// type TodoListsType = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// function App() {
//
//     function addTask(value:string,tlId: string) {
//         let newTask = {id:v1(), title: value, isDone:false};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask,...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeChecked(id: string, isDone:boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find( t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find( tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }}
//
//     function delTask (id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj})
//     }
//
//
//     type taskObjType = {
//         [key: string]: Array<TasksArr>
//     }
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState <Array<TodoListsType>>(  [
//         {id: todoList1, title: 'What to learn', filter: 'Active'},
//         {id: todoList2, title: 'What to buy', filter: 'Completed'}
//     ])
//     let [tasksObj, setTasks] = useState <taskObjType>({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//     function addTodoList (title:string) {
//         let newTodoList : TodoListsType = {
//             id: v1(),
//             title: title,
//             filter: 'All'
//         }
//         setTodoLists([newTodoList, ...todoLists])
//         setTasks({...tasksObj, [newTodoList.id]:[]})
//     }
//     return (
//         <div className='App'>
//             {/*<input /><button>+</button>*/}
//             <AddItemForm addItem={addTodoList}/>
//             {
//                 todoLists.map(tl => {
//
//                     let tasksForTodolist = tasksObj[tl.id]
//                     if (tl.filter === 'Completed') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                     }
//                     if (tl.filter === ('Active')) {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                     }
//
//                     return(  <Todolist
//                         key={tl.id}
//                         tlId={tl.id}
//                         changeChecked={changeChecked}
//                         addTask={addTask}
//                         changeTask={changeTask}
//                         delTask={delTask}
//                         title={tl.title}
//                         taska={tasksForTodolist}
//                         filterTasks={tl.filter}
//                     /> )
//                 })
//             }
//         </div>)
// }
//
// export default App


///////////////////////////////////////////////  TASK 6
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksType, Todolist} from './Todolist'
// import {AddItemForm} from "./AddItemForm";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
// type TodoListType = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// type TasksStateType = {
//     [key: string] : Array<TasksType>
// }
//
// function App() {
//
//     function addTask(value:string,tlId: string) {
//         let newTask = {id:v1(), title: value, isDone:false};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask,...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeStatus(id: string, isDone:boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find( t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//     function changeTaskTitle(id: string, newTitle: string, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find( t => t.id === id)
//         if (newTask) {
//             newTask.title = newTitle;
//             setTasks({...tasksObj})
//         }
//     }
//
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find( tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }}
//
//     function delTask (id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj});
//     }
//
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState <Array<TodoListType>>(  [
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ])
//     let [tasksObj, setTasks] = useState<TasksStateType> ({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//     function removeTodoList (id:string) {
//         let filterTodoList = todoLists.filter(tl => tl.id !== id)
//         todoLists = filterTodoList
//         setTodoLists([...todoLists])
//     }
//     function changeTodoListTitle (id: string, newTitle: string) {
//         const findTodoList = todoLists.find (tl => tl.id === id);
//         if (findTodoList) {
//             findTodoList.title = newTitle;
//             setTodoLists([...todoLists])
//         }
//     }
//
//     function addTodoList (title:string) {
//         let newTodoList: TodoListType = {
//             id: v1(),
//             title: title,
//             filter: 'All'
//         }
//         setTodoLists([newTodoList, ...todoLists]);
//         setTasks({
//             ...tasksObj,
//             [newTodoList.id] : []
//         })
//     }
//
//     return (
//         <div className='App'>
//             <AddItemForm addItem={addTodoList}/>
//             {
//                 todoLists.map(tl => {
//
//                     let tasksForTodolist = tasksObj[tl.id]
//                     if (tl.filter === 'Completed') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                     }
//                     if (tl.filter === 'Active') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                     }
//
//                     return(  <Todolist
//                         key={tl.id}
//                         tlId={tl.id}
//                         changeChecked={changeStatus}
//                         addTask={addTask}
//                         changeTask={changeTask}
//                         changeCheckedTitle={changeTaskTitle}
//                         delTask={delTask}
//                         title={tl.title}
//                         taska={tasksForTodolist}
//                         filterTasks={tl.filter}
//                         removeTodoList={removeTodoList}
//                         changeTodoListTitle={changeTodoListTitle}
//                     /> )
//                 })
//             }
//         </div>)
// }
//
// export default App


////////////////////////////////////////////Task 5
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
// import {clearLine} from "readline";
//
// export type FilteredTask = 'All' | 'Completed' | 'Active'
//
// type TodoLists = {
//     id: string,
//     title: string,
//     filter: FilteredTask
// }
//
// function App() {
//
//     function addTask(value:string,tlId: string) {
//         let newTask = {id:v1(), title: value, isDone:true};
//         let todoListTask = tasksObj[tlId];
//         let newTodo = [newTask,...todoListTask];
//         tasksObj[tlId] = newTodo
//         setTasks({...tasksObj})
//
//     }
//
//     function changeChecked(id: string, isDone:boolean, tlId: string) {
//         let todoListTask = tasksObj[tlId];
//         let newTask = todoListTask.find( t => t.id === id)
//         if (newTask) {
//             newTask.isDone = isDone;
//             setTasks({...tasksObj})
//         }
//     }
//
//     function changeTask(value: FilteredTask, tlId: string) {
//         let findTodolist = todoLists.find( tl => tl.id === tlId)
//         if (findTodolist) {
//             findTodolist.filter = value
//             setTodoLists([...todoLists])
//         }}
//
//     function delTask (id: string, tlId: string) {
//         let tasks = tasksObj[tlId]
//         let filterTask = tasks.filter(t => t.id !== id)
//         tasksObj[tlId] = filterTask;
//         setTasks({...tasksObj})
//     }
//
//
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let [todoLists, setTodoLists] = useState <Array<TodoLists>>(  [
//         {id: todoList1, title: 'What to learn', filter: 'Active'},
//         {id: todoList2, title: 'What to buy', filter: 'Completed'}
//     ])
//     let [tasksObj, setTasks] = useState({
//         [todoList1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false}
//         ],
//         [todoList2]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false}
//         ]
//     });
//
//     return (
//         <div className='App'>
//             {
//                 todoLists.map(tl => {
//
//                     let tasksForTodolist = tasksObj[tl.id]
//                     if (tl.filter === 'Completed') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                     }
//                     if (tl.filter === 'Active') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                     }
//
//                     return(  <Todolist
//                         key={tl.id}
//                         tlId={tl.id}
//                         changeChecked={changeChecked}
//                         addTask={addTask}
//                         changeTask={changeTask}
//                         delTask={delTask}
//                         title="Hey there, what's up?"
//                         taska={tasksForTodolist}
//                         filterTasks={tl.filter}
//                     /> )
//                 })
//             }
//         </div>)
// }
//
// export default App


// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
//
// export type FilteredTask = 'All' | 'Complete' | 'Active'
// type TodoListType = {
//     id: string
//     title: string
//     filter: FilteredTask
// }
//
// function App() {
//
//
//
//     function delTask(id: string, todoListId:string) {
//         let tasks = tasksObj[todoListId]
//         let task = tasks.filter(t => t.id !== id)
//         tasksObj[todoListId] = task
//         setTasks({...tasksObj})
//     }
//
//     function addTask(value: string) {
//         let newTask = {id: v1(), title: value, isDone: true}
//         setTasks([newTask, ...tasksObj])
//     }
//
//     function changeChecked(id: string, isDone: boolean) {
//         let newTask = tasksObj.find(t => t.id === id)
//         if (newTask)
//             newTask.isDone = isDone
//         setTasks([...tasksObj])
//     }
//
//     function changeTask(value: FilteredTask, todoListId: string) {
//         let todoList = todoLists.find(tl => tl.id === todoListId)
//         if (todoList) {
//             todoList.filter = value;
//             setTodoLists([...todoLists])
//         }
//     }
//     let todoListsId1 = v1()
//     let todoListsId2 = v1()
//
//     let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
//         {id: todoListsId1, title: 'What to learn?', filter: 'Active'},
//         {id: todoListsId2, title: 'What to buy?', filter: 'Complete'}
//     ])
//     let [tasksObj, setTasks] = useState({
//         [todoListsId1]: [
//             {id: v1(), title: 'Buy bread', isDone: true},
//             {id: v1(), title: 'Buy milk', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//             {id: v1(), title: 'Rest API', isDone: false},
//             {id: v1(), title: 'GraphQL', isDone: false}
//         ],
//         [todoListsId2]: [
//             {id: v1(), title: 'Book', isDone: true},
//             {id: v1(), title: 'Milk', isDone: true}
//         ]
//     })
//
//     return (
//         <div className='App'>
//             {
//                 todoLists.map((tl) => {
//                     let tasksForTodolist = tasksObj[tl.id]
//                     if (tl.filter === 'Complete') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                     }
//                     if (tl.filter === 'Active') {
//                         tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                     }
//
//                     return <Todolist
//                         key={tl.id}
//                         id={tl.id}
//                         changeChecked={changeChecked}
//                         addTask={addTask}
//                         changeTask={changeTask}
//                         delTask={delTask}
//                         title={tl.title}
//                         taska={tasksForTodolist}
//                         filterTasks={tl.filter}
//                     />
//                 })
//             }
//         </div>
//     )
// }
//
// export default App


/////////////////////////////////////////////Task 4
// import React, {useState} from "react";
// import {v1} from "uuid";
// import {TasksArr, Todolist} from './Todolist'
//
// export type FilteredTask = 'All' | 'Complete' | 'Active'
//
// function App() {
//
//     let [tasks, setTasks] = useState<TasksArr[]>([
//         {id: v1(), title: 'Buy bread', isDone: true},
//         {id: v1(), title: 'Buy milk', isDone: true},
//         {id: v1(), title: 'ReactJS', isDone: false},
//         {id: v1(), title: 'Rest API', isDone: false},
//         {id: v1(), title: 'GraphQL', isDone: false}
//     ])
//     let [filterTasks, setFilterTasks] = useState<FilteredTask>('All')
//
//     let tasksForTodolist = tasks
//     if (filterTasks === 'Complete') {
//         tasksForTodolist = tasks.filter(t => t.isDone === false)
//     }
//     if (filterTasks === 'Active') {
//         tasksForTodolist = tasks.filter(t => t.isDone === true)
//     }
//
//     function changeTask(value: FilteredTask) {
//         setFilterTasks(value)
//     }
//     function delTask(id: string) {
//         let task = tasks.filter(t => t.id !== id)
//
//         setTasks(task)
//     }
//     function addTask(value:string) {
//         let newTask = {id:v1(), title: value, isDone:true}
//         setTasks([newTask,...tasks])
//     }
//
//     function changeChecked(id: string, isDone:boolean) {
//         let newTask = tasks.find( t => t.id === id)
//         if (newTask)
//             newTask.isDone = isDone
//         setTasks([...tasks])
//     }
//
//     return (
//         <Todolist
//             changeChecked={changeChecked}
//             addTask={addTask}
//             changeTask={changeTask}
//             delTask={delTask}
//             title="Hey there, what's up?"
//             taska={tasksForTodolist}
//             filterTasks={filterTasks}
//         />
//
//     )
// }
//
// export default App

