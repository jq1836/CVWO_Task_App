import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
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
        setInput((values: any) => ({ ...values, [name]: value }));
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
                <Card.Body style={{ margin: "10px auto"}}>
                    <Card.Text>
                        <label>
                            Task:
                            <input
                                type="text"
                                name="taskName"
                                value={ input.taskName }
                                style={{ height: "30px"}}
                                onChange={ handleChange } />
                        </label>
                    </Card.Text>
                    <Card.Text>
                        <label>
                            Deadline:
                            <input
                                type="text"
                                name="deadline"
                                value={ input.deadline }
                                style={{ height: "30px"}}
                                onChange={ handleChange } />
                        </label>
                    </Card.Text>
                    <Card.Text>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={ input.description }
                                style={{ height: "30px"}}
                                onChange={ handleChange }/>
                        </label>
                    </Card.Text>
                    <Card.Footer>
                        <text> Tag: </text>
                        <select
                            name="tag"
                            value={ input.tag }
                            style={{ width: "150px", height: "30px"}}
                            onChange={ handleChange }>
                            <option value="Others"> Others </option>
                            <option value="Study"> Study </option>
                            <option value="Work"> Work </option>
                            <option value="Leisure"> Leisure </option>
                        </select>
                        <Button style={{ width: "100px", height: "30px"}} onClick={ handleSubmit }> Confirm </Button>
                    </Card.Footer>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card key={ input.id } style={ TaskCardStyle }>
                <Card.Body>
                    <Card.Text> Task: { props.task.taskName } </Card.Text>
                    <Card.Text> Tag: { props.task.tag } </Card.Text>
                    <Card.Text> Deadline: { props.task.deadline } </Card.Text>
                    <Card.Text style={{ width: "100px", height: "30px"}}> Description: { props.task.description } </Card.Text>
                    <Button style={{ width: "100px", height: "30px"}} onClick={ props.handleDelete }> Delete </Button>
                    <Button style={{ width: "100px", height: "30px"}} onClick={ goToEdit }> Edit </Button>
                </Card.Body>
            </Card>
        );
    }
};

export default TaskCard;
