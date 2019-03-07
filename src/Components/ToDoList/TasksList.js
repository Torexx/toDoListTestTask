import React, {Component} from 'react';
import Task from "./Task";


class TasksList extends Component {

    render(){
        return(
            <div className="tasks">

                {
                    this.props.tasks.map((task, index) => {

                        return <Task task={task} deleteCallback={this.props.onDelete}
                                     updateCallback ={this.props.onUpdate}
                                     key={task.id}/>
                    })
                }

            </div>
        )
    }
}

export default TasksList;