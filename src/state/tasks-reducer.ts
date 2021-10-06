import {FilteredTask, TasksStateType, TodoListsType} from "../App";
import {v1} from "uuid";
import {isBoolean} from "util";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string
    todolistID: string
}
export type AddTaskType = {
    type: 'ADD-TASK'
    todolistID: string
    title: string
}

export type ChangeTaskType = {
    type: 'CHANGE-TASK'
    isDone: boolean
    taskId: string
    todolistId: string
}

export type ChangeTaskTitleType = {
    type: 'CHANGE-TITLE'
    taskId: string
    todolistId: string
    title: string
}


type ActionsTypes = RemoveTaskActionType | AddTaskType | ChangeTaskType | ChangeTaskTitleType


export const tasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistID];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistID] = filteredTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const todolist = stateCopy[action.todolistID];
            const addTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [ addTask, ...todolist];
            stateCopy[action.todolistID] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK': {
            const stateCopy = {...state};
            let tasks = stateCopy[action.todolistId];
            let filteredTask = tasks.find(t => t.id === action.taskId)
            if (filteredTask) {
                filteredTask.isDone = action.isDone
            }
            return stateCopy;
        }
        case 'CHANGE-TITLE': {
            const stateCopy = {...state};
            const findTodolist = state[action.todolistId]
            const changeTask = findTodolist.find(t => t.id === action.taskId)
            if (changeTask) {
                changeTask.title = action.title
            }
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todolistID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistID}
}

export const addTaskAC = (title: string, todolistID: string): AddTaskType => {
    return {type: 'ADD-TASK', todolistID, title}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) : ChangeTaskType => {
    return {type: 'CHANGE-TASK', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) : ChangeTaskTitleType => {
    return{type: 'CHANGE-TITLE', taskId, title, todolistId}
}









///////////////////////////////////////////////////////todolist 8
// import {FilteredTask, TodoListsType} from "../App";
// import {v1} from "uuid";
//
// type ActionType = {
//     type: string
//     [key: string]: any
// }
//
// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST',
//     id:string
// }
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST',
//     title:string
// }
// export type ChangeTodolistTitleActionType = {
//     type: 'CHANGE-TODOLIST-TITLE',
//     id: string
//     title:string
// }
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER',
//     id:string
//     filter: FilteredTask
// }
//
// type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
//
//
//
// export const todolistsReducer = (state: Array<TodoListsType>, action: ActionsTypes): Array<TodoListsType> => {
//     switch (action.type) {
//         case "REMOVE-TODOLIST": {
//            return state.filter(tl => tl.id != action.id)
//         }
//         case "ADD-TODOLIST": {
//             return [...state, {
//                 id:v1(),
//                 title: action.title,
//                 filter: 'All'
//             }]
//         }
//         case 'CHANGE-TODOLIST-TITLE': {
//             let findTodoList = state.find(tl => tl.id === action.id)
//             if(findTodoList) {
//                 findTodoList.title = action.title
//             }
//             return [...state]
//         }
//         case 'CHANGE-TODOLIST-FILTER': {
//             let findTodoList = state.find(tl => tl.id === action.id)
//             if(findTodoList) {
//                 findTodoList.filter = action.filter
//             }
//             return [...state]
//         }
//
//         default:
//             throw new Error('I dont understand this action type')
//     }
// }
//
// export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId}
// }
//
// export const AddTodolistAC = (title: string): AddTodolistActionType => {
//     return {type: "ADD-TODOLIST", title: title}
// }
//
// export const ChangeTodolistTitleAC = (id: string, title:string): ChangeTodolistTitleActionType => {
//     return {type: "CHANGE-TODOLIST-TITLE", id: id, title: title}
// }
//
// export const ChangeTodolistFilterAction= (id: string, filter: FilteredTask): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
// }