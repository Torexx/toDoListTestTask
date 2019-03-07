import React, {Component} from 'react';


class ToDoListTaskCreator extends Component {

    constructor(props) {

        super(props);


    }


    onSubmit(event) {

        event.preventDefault();



        const data = new URLSearchParams();
        data.append('widgetId', 2332215);
        data.append('title', this.props.state.title);

        fetch("https://repetitora.net/api/JS/Tasks",
            {
                method: "POST",
                body: data,
                headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset = UTF-8',
                    'accept': 'aplication/json'
                },
                mode: 'cors'

            })
            .then(result => result.json())
            .then(data => {

                const newTask = {

                    id: data.task.id,
                    title: data.task.title,
                    isDone: data.task.done,


                };

                this.props.onCreate(newTask);

            });

       this.resetForm()


    }
    resetForm = () =>{
        this.myFormRef.reset()
    }

    onTitleChange(event) {

        const newTitle = {title: event.target.value};

        this.props.createNewTitle(newTitle);

    }



    render() {
        return (

            <div className='header'>


                <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit.bind(this)}>

                    <p><label> Task description: <input type="text" name="title"
                                                onChange={this.onTitleChange.bind(this)} required/></label></p>



                    <p className='button'><input type="submit" value="Add"/></p>
                </form>

            </div>
        );
    }
}

export default ToDoListTaskCreator;