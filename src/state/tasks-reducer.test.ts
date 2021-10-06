import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from "../App";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";

test('correct task should be deleted from correct array', () => {

    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    };
    const action = removeTaskAC('2', 'todoList2');
    const endState = tasksReducer(startState, action)

    expect(endState['todoList1'].length).toBe(4);
    expect(endState['todoList2'].length).toBe(2);
    expect(endState['todoList2'].every(t => t.id != '2')).toBeTruthy()
})

test('correct task should be add from correct array', () => {

    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    };
    const action = addTaskAC('juice', 'todoList2');
    const endState = tasksReducer(startState, action)

    expect(endState['todoList1'].length).toBe(4);
    expect(endState['todoList2'].length).toBe(4);
    expect(endState['todoList2'][0].id).toBeDefined();
    expect(endState['todoList2'][0].title).toBe('juice')
    expect(endState['todoList2'][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    }
    const action = changeTaskStatusAC('2', false, 'todoList2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoList2'][1].isDone).toBeFalsy();
    expect(endState['todoList1'][1].isDone).toBeTruthy();

})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    }
    const action = changeTaskTitleAC('2', 'Milkyway', 'todoList2')
    const endState = tasksReducer(startState, action)

    expect(endState['todoList2'][1].title).toBe('Milkyway');
    expect(endState['todoList1'][1].title).toBe('Buy milk');

})

test('new property with new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    }
    const action = addTodolistAC('title no matter');
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todoList1' && k != 'todoList2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toStrictEqual([]);


})

test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todoList1': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
            {id: '4', title: 'Rest API', isDone: false}
        ],
        'todoList2': [
            {id: '1', title: 'Buy bread', isDone: true},
            {id: '2', title: 'Buy milk', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false}
        ]
    };

    const action = removeTodolistAC('todoList2')

    const endState = tasksReducer(startState,action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1);
    expect(endState['todolist2']).toBeUndefined()
})