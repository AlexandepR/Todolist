import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    onChange: (newValue: string) => void
}


export const EditableSpan = React.memo ((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title);
    }
    const onChageTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                onChange={onChageTitleHandler}
                onBlur={activateViewMode}
                value={title}
                autoFocus/>
            : <span
                onDoubleClick={activateEditMode}

            >--{props.title}--</span>
    )
})