import {v1} from "uuid";
import {
    addTodolistAC, changeTodolistAC, filterTodoListAC, removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {FilteredTask, TodoListsType,} from '../App';


test('correct todolist should be removed', () => {
    const todoList1 = v1()
    const todoList2 = v1()

    const startState: Array<TodoListsType> = [
        {id: todoList1, title: 'What to learn', filter: 'All'},
        {id: todoList2, title: 'What to buy', filter: 'All'}
    ]
    // const endState = todolistsReducer(startState, {
    //     type: 'REMOVE-TODOLIST',
    //     id: todoList1
    // })
    const endState = todolistsReducer(startState, removeTodolistAC(todoList1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoList2);
})

test('correct todoList should be added', () => {
    const todoList1 = v1()
    const todoList2 = v1()

    const newTodolistTitle = 'New Todolist'

    const startState: Array<TodoListsType> = [
        {id: todoList1, title: 'What to learn', filter: 'All'},
        {id: todoList2, title: 'What to buy', filter: 'All'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState.length).toBe(3)
    expect(endState[2].filter).toBe('All')
})

test('correct todolist should change its name', () => {
    const todoList1 = v1()
    const todoList2 = v1()

    let newTodoListTitle = 'New TodoList';

    const startState: Array<TodoListsType> = [
        {id: todoList1, title: 'What to learn', filter: 'All'},
        {id: todoList2, title: 'What to buy', filter: 'All'}
    ]

    // const action : ChangeTodolistTitleActionType = {
    // type: 'CHANGE-TODOLIST-TITLE',
    //     id: todoList2,
    //     title: newTodoListTitle
    // };

    const endState = todolistsReducer(startState, changeTodolistAC(newTodoListTitle,todoList2) );

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodoListTitle);
}
)

test('correct filter of todolist should be changed', () => {
    const todoList1 = v1()
    const todoList2 = v1()

    let newfilter: FilteredTask = 'Completed';

    const startState: Array<TodoListsType> = [
        {id: todoList1, title: 'What to learn', filter: 'All'},
        {id: todoList2, title: 'What to buy', filter: 'All'}
    ]

    // const action = {
    //     type: 'CHANGE-TODOLIST-FILTER' as const,
    //     id: todoList2,
    //     filter: newfilter
    // }

    const endState = todolistsReducer(startState, filterTodoListAC(todoList2, newfilter));

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(newfilter)
})













///////////////////////////////Todolist 8
// import {v1} from "uuid";
// import {
//     AddTodolistAC, ChangeTodolistFilterAction,
//     ChangeTodolistFilterActionType,
//     ChangeTodolistTitleAC,
//     RemoveTodolistAC,
//     todolistsReducer
// } from "./todolists-reducer";
// import {FilteredTask, TodoListsType} from '../App';
//
// test('correct todolist should be removed', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     const startState: Array<TodoListsType> = [
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ]
//
//     // const endState = todolistsReducer(startState, {
//     //     type: 'REMOVE-TODOLIST',
//     //     id:todoList1
//     // })
//
//     const endState = todolistsReducer(startState, RemoveTodolistAC(todoList1))
//
//     expect(endState.length).toBe(1)
//     expect(endState[0].id).toBe(todoList2)
//
// })
//
// test('correct todolist should be added', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let newTodoListTitle = 'New TodoList';
//
//     const startState: Array<TodoListsType> = [
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ]
//
//     const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle)
//     )
//
//     expect(endState.length).toBe(3)
//     expect(endState[2].title).toBe(newTodoListTitle);
//     expect(endState[2].filter).toBe('All');
// })
//
// test('correct todolist should change its name', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let newTodoListTitle = 'New TodoList';
//
//     const startState: Array<TodoListsType> = [
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ]
//
//     const action = ChangeTodolistTitleAC (todoList2, newTodoListTitle)
//
//     const endState = todolistsReducer(startState, action)
//
//     expect(endState[0].title).toBe('What to learn');
//     expect(endState[1].title).toBe(newTodoListTitle);
// })
//
// test('correct filter of todolist should be changed', () => {
//     const todoList1 = v1()
//     const todoList2 = v1()
//
//     let newfilter: FilteredTask = 'Completed';
//
//     const startState: Array<TodoListsType> = [
//         {id: todoList1, title: 'What to learn', filter: 'All'},
//         {id: todoList2, title: 'What to buy', filter: 'All'}
//     ]
//
//     const action = ChangeTodolistFilterAction(todoList2, newfilter)
//
//     const endState = todolistsReducer(startState, action);
//
//     expect(endState[0].filter).toBe('All')
//     expect(endState[1].filter).toBe(newfilter)
//
// })