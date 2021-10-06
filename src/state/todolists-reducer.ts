import {FilteredTask, TodoListsType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id:string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title:string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title:string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id:string
    filter: FilteredTask
}

type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType


export const todolistsReducer = ( state: Array<TodoListsType>, action: ActionsTypes): Array<TodoListsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(td => td.id != action.id)

        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistId, title: action.title, filter: 'All'}]

        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id);
            if(todoList) {
                todoList.title = action.title
            }
            return [...state]

        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id);
            if(todoList) {
                todoList.filter = action.filter
            }
            return [...state]

        }
        default:
            throw new Error ("I don't understand this action type")
    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistID}
}

export const addTodolistAC = (title: string) : AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}

export const changeTodolistAC = (title: string, id: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}

export const filterTodoListAC = (id: string, filter: FilteredTask): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',id: id, filter: filter }
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