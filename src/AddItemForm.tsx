import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, makeStyles, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormType = {
    addItem: (value: string) => void
    // tlId: string
}

export function AddItemForm(props: AddItemFormType) {
    let [error, setError] = useState<null | string>(null)
    let [newValue, setNewValue] = useState('')

    const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
        setError(null)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13 && e.ctrlKey) {
            props.addItem(newValue);
            setNewValue('')
        }
    }
    const addTask = () => {
        if (newValue === '') {
            setError('Enter information')
            return;
        }
        props.addItem(newValue.trim());
        setNewValue('')
    }


    const useStyles = makeStyles({
        root: {
            background: 'linear-gradient(45deg, #0031ce 30%, #356aff 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(0, 85, 206, .5)',
            color: 'white',
            height: 35,
            padding: '0px 30px',
        },
    });
    const buttonGradient = useStyles();


    return (
        <div>
            {/*<input*/}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={newValue}*/}
            {/*    onChange={onChangeHadler}*/}
            {/*    onKeyPress={onKeyPressHandler}*/}
            {/*/>*/}
            <TextField
                variant={'outlined'}
                label={'Type value'}
                // className={error ? 'error' : ''}
                value={newValue}
                onChange={onChangeHadler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />


            <Button onClick={addTask} className={buttonGradient.root}>Add</Button>

            {/*<IconButton onClick={addTask}*/}
            {/*            color={'primary'}*/}
            {/*><ControlPoint/>*/}
            {/*</IconButton>*/}

        </div>
    )
}







///////////////////////////////////////////////////////////////////////Task 7
// import React, {ChangeEvent, KeyboardEvent, useState} from "react";
// import {Button, IconButton, makeStyles, TextField} from "@material-ui/core";
// import {ControlPoint} from "@material-ui/icons";
//
// type AddItemFormType = {
//     addItem: (value: string) => void
//     // tlId: string
// }
//
// export function AddItemForm(props: AddItemFormType) {
//     let [error, setError] = useState<null | string>(null)
//     let [newValue, setNewValue] = useState('')
//
//     const onChangeHadler = (e: ChangeEvent<HTMLInputElement>) => {
//         setNewValue(e.currentTarget.value)
//         setError(null)
//     }
//     const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
//         setError(null);
//         if (e.charCode === 13 && e.ctrlKey) {
//             props.addItem(newValue);
//             setNewValue('')
//         }
//     }
//     const addTask = () => {
//         if (newValue === '') {
//             setError('Enter information')
//             return;
//         }
//         props.addItem(newValue.trim());
//         setNewValue('')
//     }
//
//
//     const useStyles = makeStyles({
//         root: {
//             background: 'linear-gradient(45deg, #0031ce 30%, #356aff 90%)',
//             border: 0,
//             borderRadius: 3,
//             boxShadow: '0 3px 5px 2px rgba(0, 85, 206, .5)',
//             color: 'white',
//             height: 35,
//             padding: '0px 30px',
//         },
//     });
//     const buttonGradient = useStyles();
//
//
//     return (
//         <div>
//             {/*<input*/}
//             {/*    className={error ? 'error' : ''}*/}
//             {/*    value={newValue}*/}
//             {/*    onChange={onChangeHadler}*/}
//             {/*    onKeyPress={onKeyPressHandler}*/}
//             {/*/>*/}
//             <TextField
//                 variant={'outlined'}
//                 label={'Type value'}
//                 // className={error ? 'error' : ''}
//                 value={newValue}
//                 onChange={onChangeHadler}
//                 onKeyPress={onKeyPressHandler}
//                 error={!!error}
//                 helperText={error}
//             />
//
//
//             <Button onClick={addTask} className={buttonGradient.root}>Add</Button>
//
//             {/*<IconButton onClick={addTask}*/}
//             {/*            color={'primary'}*/}
//             {/*><ControlPoint/>*/}
//             {/*</IconButton>*/}
//
//         </div>
//     )
// }