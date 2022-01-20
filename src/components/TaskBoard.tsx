import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from "aws-amplify";
import { listTasks } from "../graphql/queries";
import {createTask, deleteTask, updateTask} from "../graphql/mutations";
import { Button } from "react-bootstrap";
import TaskCard from "./TaskCard";

const TaskBoard: React.FC = () => {
    const [list, setList] = useState([]);
    const [tagFilter, setTag] = useState('All');

    useEffect(() => {
        pullTasks();
    }, []);

    const pullTasks = async () => {
        try {
            let result = await API.graphql(graphqlOperation((listTasks)));
            // @ts-ignore
            setList(result.data.listTasks.items);
        } catch (e) {}
    };

    const addTask = async () => {
        const data = {
            taskName: "",
            tag: "Others",
            deadline: "",
            description: "",
        };
        try {
            await API.graphql(graphqlOperation(createTask, { input: data }));
            pullTasks();
            console.log("Success!");
        } catch(e) {
            alert("Could not process addition.");
            console.log("Error!");
        }
    };

    const handleDelete = async (ID: any) => {
        const id = { id: ID };
        try {
            await API.graphql(graphqlOperation(deleteTask, { input: id }));
            pullTasks();
            console.log("Success!");
        } catch (e) {
            alert("Could not process deletion.");
            console.log("Error!")
        }
    }

    const handleEdit = async (data: any) => {
        try {
            await API.graphql(graphqlOperation(updateTask, { input: data }));
            pullTasks();
            console.log("Success");
        } catch (e) {
            alert("Could not process edit.");
            console.log("Error!")
        }
    }

    const filterTag = () => {
        if (tagFilter == "All") {
            return list;
        } else {
            return list.filter((task: any) => task.tag == tagFilter);
        }
    }

    const changeTag = (event: any) => {
        setTag(event.target.value);
    }

    return (
        <div>
            <Button onClick={ addTask }> + </Button>
            <select name="tag" value={ tagFilter } onChange={ changeTag }>
                <option value="All"> All </option>
                <option value="Others"> Others </option>
                <option value="Study"> Study </option>
                <option value="Work"> Work </option>
                <option value="Leisure"> Leisure </option>
            </select>
            <div>
                { filterTag().map((item: any) => (
                    <TaskCard
                        task={ item }
                        handleDelete={ () => handleDelete(item.id) }
                        handleEdit={ handleEdit }
                    />
                )) }
            </div>
        </div>
    );

}

export default TaskBoard;