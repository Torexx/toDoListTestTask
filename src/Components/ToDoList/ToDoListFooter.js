import React, {Component} from 'react';


class ToDoListFooter extends Component {


    handleFilterChanged(e){
        this.props.onFilterChanged(e.currentTarget.dataset.value)
    }


    render() {
        let {tasks, filter, onClearCompleted} = this.props;
        return (
            <div className='todolist-footer'>
                <div>
                    <span> {tasks.filter((t) => !t.isDone).length} items left</span>
                </div>
                <div className='buttons'>
                    <button className={filter==='Все' ? 'active' : ''} data-value="Все"
                            onClick={this.handleFilterChanged.bind(this)}>Все</button>
                    <button className={filter==='Обычная' ? 'active' : ''} data-value="Обычная"
                            onClick={this.handleFilterChanged.bind(this)}>обычные</button>
                    <button className={filter==='Важная' ? 'active' : ''} data-value="Важная"
                            onClick={this.handleFilterChanged.bind(this)}>Важные</button>
                    <button className={filter==='Очень Важная' ? 'active' : ''} data-value="Очень Важная"
                            onClick={this.handleFilterChanged.bind(this)}>очень важные</button>

                    <button onClick={onClearCompleted}>Clear</button>
                </div>
            </div>
        )
    }
}

export default ToDoListFooter;