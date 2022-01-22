import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import TextField from '@mui/material/TextField';
import { TaskCardStyle } from '../Styling';

function TaskCard(props: any) {
    const [editMode, setEditMode] = useState(false);
    const [input, setInput] = useState({
        id: props.task.id,
        taskName: props.task.taskName,
        tag: props.task.tag,
        deadline: props.task.deadline,
        description: props.task.description,
    });

    const goToEdit = () => {
        setEditMode(true);
    };

    const goToRest = () => {
        setEditMode(false);
    };

    const handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setInput((values: any) => ({...values, [name]: value}));
    };

    const handleDateChange = (value: any) => {
        setInput((values: any) => ({...values, ["deadline"]: value}));
    };

    const handleSubmit = () => {
        const newTask = {
            id: input.id,
            taskName: input.taskName,
            tag: input.tag,
            deadline: input.deadline,
            description: input.description,
        }
        props.handleEdit(newTask);
        goToRest();
    };

    if (editMode) {
        return (
            <Card key={ input.id } style={ TaskCardStyle }>
                <Card.Body style={{ margin: "10px auto" }}>
                    <Card.Body style={{ margin:"10px" }}>
                        <TextField
                            type="text"
                            label="Task:"
                            name="taskName"
                            value={ input.taskName }
                            onChange={ handleChange }/>
                    </Card.Body>
                    <Card.Body style={{ margin:"10px" }}>
                        <TextField
                            type="text"
                            label="Description:"
                            name="description"
                            value={ input.description }
                            onChange={ handleChange }/>
                    </Card.Body>
                    <Card.Body style={{ margin:"10px" }}>
                        <LocalizationProvider dateAdapter={ AdapterDateFns }>
                            <DatePicker
                                label="Deadline"
                                value={ input.deadline }
                                onChange={ handleDateChange }
                                renderInput={ (params) => <TextField { ...params } /> }
                            />
                        </LocalizationProvider>
                    </Card.Body>
                    <Card.Footer>
                        <text> Tag:</text>
                        <select
                            name="tag"
                            value={ input.tag }
                            style={{ width: "150px", height: "30px" }}
                            onChange={ handleChange }>
                            <option value="Others"> Others </option>
                            <option value="Study"> Study </option>
                            <option value="Work"> Work </option>
                            <option value="Leisure"> Leisure </option>
                        </select>
                        <Button style={{ width: "100px", height: "30px" }} onClick={ handleSubmit }> Confirm </Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card key={ input.id } style={ TaskCardStyle }>
                <Card.Body style={{ margin:"10px" }}>
                    <Card.Text> Task: { props.task.taskName } </Card.Text>
                    <Card.Text> Tag: { props.task.tag } </Card.Text>
                    <Card.Text> Deadline: { props.task.deadline.slice(0, 10) } </Card.Text>
                    <Card.Text> Description: { props.task.description } </Card.Text>
                    <Button onClick={ goToEdit } style={{ width: "120px", height: "30px" }}> Edit </Button>
                    <Button onClick={ props.handleDelete } style={{ width: "120px", height: "30px" }}> Delete </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default TaskCard;
