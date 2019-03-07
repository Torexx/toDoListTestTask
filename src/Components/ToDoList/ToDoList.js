import React, {Component} from 'react';
import './ToDoList.css';
import ToDoListTaskCreator from "./ToDoListTaskCreator";
import TasksList from "./TasksList";



export function updateTask(widgetId, taskId, title = null, isDone = null) {


    const data = new URLSearchParams();
    data.append('taskId', taskId);
    data.append('widgetId', widgetId);
    if(isDone != null) {


        data.append('done', isDone);
    }else if(title !=null) {
        data.append('title', title);

    }
    return fetch("https://repetitora.net/api/JS/Tasks",
        {
            body: data,
            method: "PUT",
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset = UTF-8',
                'accept': 'aplication/json'
            },
            mode: 'cors'

        })

        .then(result => result.json())

}

export function deleteTask(widgetId, taskId, title = null, isDone = null) {

    const data = new URLSearchParams();
    data.append('taskId', taskId);
    data.append('widgetId', widgetId);

    return fetch("https://repetitora.net/api/JS/Tasks",
        {
            body: data,
            method: "DELETE",
            headers: {
                'content-type': 'application/x-www-form-urlencoded; charset = UTF-8',
                'accept': 'aplication/json'
            },
            mode: 'cors'

        })

        .then(result => result.json())

}



class ToDoList extends Component {

    constructor(props) {

        super(props);

        this.state = {

            tasks: [],

        };



        fetch("https://repetitora.net/api/JS/Tasks?widgetId=2332215&count=30",
            {
                method: "GET",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset = UTF-8',
                    'accept': 'aplication/json'
                },
                mode: 'cors'

            })
            .then(result => result.json())
            .then(tasksFromServer => {

                let tasks = tasksFromServer.map(itemFromServer => {
                    return {
                        id: itemFromServer.id,
                        title: itemFromServer.title,
                        isDone: itemFromServer.done,


                    };
                });
                this.setState({tasks: tasks})


            });
    }


    putTaskToState(task) {

        this.setState({

            tasks: [
                ...this.state.tasks, task
            ]
        });

    }

    onTitleChange(task) {
        this.setState({title: task.title})
    }


    deleteTask(task) {
        this.setState({
            tasks: this.state.tasks.filter(t => {
                return t.id !== task
            })
        });


    };

    updateTask(task) {
        const newTasksList = [...this.state.tasks];
        newTasksList.forEach((t) => {
            if (t.id === task.id) {
                t.isDone = task.isDone;
                t.title = task.title;

                return
            }
        });
        this.setState({
            tasks: newTasksList
        });

    };


    render() {
        let {tasks} = this.state;

        return (
            <div className='todolist'>


                <ToDoListTaskCreator onCreate={this.putTaskToState.bind(this)}
                                     createNewTitle={this.onTitleChange.bind(this)}
                                     state={this.state}/>

                <TasksList tasks={tasks}
                           onDelete={this.deleteTask.bind(this)}
                           onUpdate={this.updateTask.bind(this)}/>


            </div>
        );
    }
}

export default ToDoList;