import React, {Component} from 'react';
import {deleteTask, updateTask} from "./ToDoList";
import './ToDoList.css';

class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editModeTitle: false,
            editModeDescription: false,
            title: props.task.title,
            description: props.task.description
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
        let x = task.dateCompleted;

        if (task.dueDate == null) {
            task.dueDate = new Date().toLocaleDateString();
        }

        else {
            task.dueDate = null;
            task.dateCompleted = x

        }
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
    changeDescription(e) {
        this.setState({

            description: e.currentTarget.value

        });
    }


    saveTitle(e) {
        const newTitle = e.currentTarget.value;
        let description = this.props.task.description; //остается старым... не меняется
        let importance = this.props.task.importance;
        let dateCompleted = this.props.task.dateCompleted;
        let task = {
            ...this.props.task
        };

        task.title = newTitle;

        updateTask(2332215, task.id, newTitle, null, description, importance, dateCompleted)
            .then(data => {

                this.setState({
                    editModeTitle: false
                });
                this.parentUpdateCallback(task);

            });
    }
    saveDescription(e) {
        const newDescription = e.currentTarget.value;
        let title = this.props.task.title;
        let importance = this.props.task.importance;
        let dateCompleted = this.props.task.dateCompleted;


        let task = {
            ...this.props.task
        };

        task.description = newDescription;

        updateTask(2332215, task.id, title, null, newDescription, importance, dateCompleted)
            .then(data => {
                this.setState({
                    editModeDescription: false
                });
                this.parentUpdateCallback(task);

            });
    }

    goToEditModeTitle() {
        this.setState({
            editModeTitle: true
        });
    }

    goToEditModeDescription() {
        this.setState({
            editModeDescription: true
        });
    }



    render() {

        let {isDone} = this.props.task;
        let {title, description} = this.state;
        let displayElement = "";
        let displayElement2 = "";

        if (this.state.editModeTitle) {
            displayElement = <input value={title}
                                    onChange={this.changeTitle.bind(this)}
                                    onBlur={this.saveTitle.bind(this)}/>;

        }
        else {
            displayElement = <span className='displayelement' onDoubleClick={this.goToEditModeTitle.bind(this)}>{title}</span>
        }

        if (this.state.editModeDescription) {

            displayElement2 =  <input value={description}
                                      onChange={this.changeDescription.bind(this)}
                                      onBlur={this.saveDescription.bind(this)}/>
        }
        else {
            displayElement2 = <span className='displayelement2' onDoubleClick={this.goToEditModeDescription.bind(this)}>{description}</span>
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
                    <div className='app-wrapper-content2'>
                        {displayElement2}
                    </div>
                    <div className='app-wrapper-content3'>
                        <span
                            className={`${this.props.task.importance === 'Обычная' ? 'green' : ''} ${this.props.task.importance === 'Важная' ? 'yellow' : ''}${this.props.task.importance === 'Очень Важная' ? 'red' : ''}`}>{this.props.task.importance}</span>
                        <span onClick={this.deleteTask.bind(this)}
                              className={this.props.task.title !== '' ? 'delete' : 'none'}>x</span>
                        <span
                            className={`${this.props.task.test ? 'test1' : ''} ${this.props.task.dueDate ? 'none' : ''}`}>{this.props.task.dateCompleted}</span>
                        <span>{this.props.task.dueDate}</span>

                    </div>

                </div>

            </div>

        );
    }
}

export default Task;