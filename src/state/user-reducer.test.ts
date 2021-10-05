import {userReducer} from "./user-reducer";
import {start} from "repl";

test('user reducer should increment only age', () => {
    const startState = {age: 20, childrenCount: 10, name: 'Alex'}

    const endState = userReducer (startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(10);
})

test('user reducer should increment childrenCount', () => {
    const startState = {age: 20, childrenCount: 10, name: 'Alex'}

    const endState = userReducer (startState, {type:'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(11)
    expect(endState.age).toBe(20)
})

test('user reducer should change name of user', () => {
    const startState = { name: 'Alex', age: 20, childrenCount: 2 }
    const newName = 'Alex'

    const endState = userReducer ( startState, {type: 'CHANGE-NAME', newName: newName})

    expect(endState.name).toBe('Alex')
})








////////////////////////////////////////////////Task 8
// import {userReducer} from "./user-reducer";
//
// test('user reducer should increment only age', () => {
//     const startState = {age: 20, childrenCount: 2, name: 'Dimych'};
//
//     const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
//
//     expect(endState.age).toBe(21);
//     expect(endState.childrenCount).toBe(2)
//
// });
//
// test('user reducer should increment only childrenCount', () => {
//     const startState = {age: 20, childrenCount: 2, name: 'Dimych'}
//
//     const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
//
//     expect(endState.childrenCount).toBe(3)
//     expect(endState.age).toBe(20)
// })
//
// test('user reducer should change name of user', () => {
//     const startState = {name: 'Dimych', age: 20, childrenCount: 2};
//     const newName = 'Victor';
//     const endState = userReducer(startState, {type: 'CHANGE-NAME', newName})
//
//     expect(endState.name).toBe(newName)
//
// })