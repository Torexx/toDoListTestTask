import React, {Component} from 'react';
import {deleteTask, updateTask} from "./ToDoList";
import './ToDoList.css';

class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editModeTitle: false,
            title: props.task.title,
        };
        this.parentDeleteCallback = props.deleteCallback;
        this.parentUpdateCallback = props.updateCallback;


    }

    deleteTask(e) {
        let task = {
            ...this.props.task
        };

        deleteTask(2332215, task.id, null, null)
            .then(data => {

                this.parentDeleteCallback(this.props.task.id)
            });
    };


    toggleTaskStatus(e) {

        let task = this.props.task;

        task.isDone = !task.isDone;


        updateTask(2332215, task.id, null, task.isDone)

            .then(data => {
                this.parentUpdateCallback(task)
            });
    }

    changeTitle(e) {
        this.setState({

            title: e.currentTarget.value

        });
    }


    saveTitle(e) {
        const newTitle = e.currentTarget.value;
        let task = {
            ...this.props.task
        };

        task.title = newTitle;

        updateTask(2332215, task.id, newTitle, null)
            .then(data => {

                this.setState({
                    editModeTitle: false
                });
                this.parentUpdateCallback(task);

            });
    }


    goToEditModeTitle() {
        this.setState({
            editModeTitle: true
        });
    }

    render() {

        let {isDone} = this.props.task;
        let {title} = this.state;
        let displayElement = "";

        if (this.state.editModeTitle) {
            displayElement = <input value={title}
                                    onChange={this.changeTitle.bind(this)}
                                    onBlur={this.saveTitle.bind(this)}/>;

        }
        else {
            displayElement = <span className='displayelement' onDoubleClick={this.goToEditModeTitle.bind(this)}>{title}</span>
        }
        return (

            <div className={isDone ? 'task done' : 'task'}>
                <div className='app-wrapper'>

                    <div className='app-wrapper-content1'>
                        <input className={this.props.task.title !== '' ? '' : 'none'} type="checkbox"
                               checked={isDone}
                               onChange={this.toggleTaskStatus.bind(this)}/>

                        {displayElement}

                    </div>

                    <div className='app-wrapper-content3'>
                        <span onClick={this.deleteTask.bind(this)}
                              className={this.props.task.title !== '' ? 'delete' : 'none'}>x</span>


                    </div>

                </div>

            </div>

        );
    }
}

export default Task;