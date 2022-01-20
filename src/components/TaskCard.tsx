import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface TaskCardProps {
    task: any;
    handleDelete: any;
    handleEdit: any;
}

const TaskCard: React.FC<TaskCardProps> = (props) => {
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
            <Card key={ input.id }>
                <Card.Body>
                    <div>
                        <label>
                            Task: <input type="text" name="taskName" value={ input.taskName } onChange={ handleChange } />
                        </label>
                    </div>
                    <div>
                        <label>
                            Deadline: <input type="text" name="deadline" value={ input.deadline } onChange={ handleChange } />
                        </label>
                    </div>
                    <div>
                        <label>
                            Description: <input type="text" name="description" value={ input.description } onChange={ handleChange }/>
                        </label>
                    </div>
                    <div>
                        <select name="tag" value={ input.tag } onChange={ handleChange }>
                            <option value="Others"> Others </option>
                            <option value="Study"> Study </option>
                            <option value="Work"> Work </option>
                            <option value="Leisure"> Leisure </option>
                        </select>
                    </div>
                    <Button onClick={ handleSubmit }> Confirm </Button>
                </Card.Body>
            </Card>
        );
    } else {
        return (
            <Card key={ input.id }>
                <Card.Header>
                    <h1> Task: { props.task.taskName } </h1>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        <h2> Tag: { props.task.tag } </h2>
                    </Card.Title>
                    <Card.Text>
                        <div>
                            <h4> Deadline: { props.task.deadline } </h4>
                            <h4> Description: { props.task.description } </h4>
                        </div>
                    </Card.Text>
                    <Button onClick={ props.handleDelete }> Delete </Button>
                    <Button onClick={ goToEdit }> Edit </Button>
                </Card.Body>
            </Card>
        );
    }
};

export default TaskCard;
