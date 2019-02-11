import React, {Component} from 'react';
import './ToDoList.css';
import ToDoListFooter from "./ToDoListFooter";
import ToDoListTaskCreator from "./ToDoListTaskCreator";
import TasksList from "./TasksList";



export function updateTask(widgetId, taskId, title = null, isDone = null, description=null, importance, dateCompleted) {

    let myData = {
        a:dateCompleted,
        b: description,
        c: importance
    };

    const data = new URLSearchParams();
    data.append('taskId', taskId);
    data.append('widgetId', widgetId);
    if(isDone != null) {


        data.append('done', isDone);
    }else if(title !=null && description !=null) {
        data.append('description', JSON.stringify(myData));
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
            importance: 'Обычная',
            tasks: [],
            filter: "Все"
        };



        if (!this.state.dateCompleted) {
            this.state.dateCompleted = '';
        }
        else {
            let dateString = this.state.dateCompleted.toLocaleString();
            let d = dateString.match(/-?\d+(\.d+)?/g).map(n => n);

            let date = new Date();
            let a = date.getFullYear();
            let b = '0' + (date.getMonth() + 1);
            let c = '0' + date.getDate();

            let currentDate = new Date(a, b, c);
            let dueDate = new Date(d[2], d[1], d[0]);


            if (currentDate > dueDate) {this.state.test = true;}
            else {this.state.test = false;}
        }



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
                    let a = eval('({obj:[' + itemFromServer.description + ']})');

                    return {                                        //ПОСЛЕ ПЕРЕЗАГРУЗКИ
                        id: itemFromServer.id,
                        title: itemFromServer.title,
                        description: a.obj[0].b,
                        importance: a.obj[0].c,
                        dateCompleted: a.obj[0].a,
                        isDone: itemFromServer.done,
                        test: a.obj[0].d


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

    onDescriptionChange(task) {
        this.setState({description: task.description})
    }

    handleChange(task) {
        this.setState({importance: task.importance})
    }

    setDueDate(task) {
        this.setState({dateCompleted: task.dateCompleted})
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
                t.description = task.description;

                return
            }
        });
        this.setState({
            tasks: newTasksList
        });

    };

    changeFilter(filterValue) {
        this.setState({filter: filterValue})
    }

    clearCompleted() {
        this.setState({
            tasks: this.state.tasks.filter((t) => !t.isDone)
        });
        let task = this.state.tasks.filter((t) => t.isDone)
        for(let i = 0; i < task.length; i++){
            deleteTask(2332215, task[i].id, null, null)
                .then(data => {


                });
        }

    };

    render() {
        let {tasks, filter} = this.state;
        let filteredTasks = [];
        if (filter === "Все") filteredTasks = tasks;
        if (filter === "Обычная") filteredTasks = tasks.filter((t) => t.importance === "Обычная");
        if (filter === "Важная") filteredTasks = tasks.filter((t) => t.importance === "Важная");
        if (filter === "Очень Важная") filteredTasks = tasks.filter((t) => t.importance === "Очень Важная");
        return (
            <div className='todolist'>


                <ToDoListTaskCreator onCreate={this.putTaskToState.bind(this)}
                                     createNewTitle={this.onTitleChange.bind(this)}
                                     createNewDescription={this.onDescriptionChange.bind(this)}
                                     createNewImportance={this.handleChange.bind(this)}
                                     createNewDueDate={this.setDueDate.bind(this)}
                                     state={this.state}/>

                <TasksList tasks={filteredTasks}
                           onDelete={this.deleteTask.bind(this)}
                           onUpdate={this.updateTask.bind(this)}/>

                <ToDoListFooter tasks={tasks} filter={filter} onFilterChanged={this.changeFilter.bind(this)}
                                onClearCompleted={this.clearCompleted.bind(this)}/>
            </div>
        );
    }
}

export default ToDoList;