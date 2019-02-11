import React, {Component} from 'react';


class ToDoListTaskCreator extends Component {

    constructor(props) {

        super(props);

        this.state = {
            date: new Date().toLocaleDateString()
        }

    }


    onSubmit(event) {


        if (!this.props.state.dateCompleted) {
            this.props.state.dateCompleted = '';
        }
        else {
            let dateString = this.props.state.dateCompleted.toLocaleString();
            let d = dateString.match(/-?\d+(\.d+)?/g).map(n => n);

            let date = new Date();
            let a = date.getFullYear();
            let b = '0' + (date.getMonth() + 1);
            let c = '0' + date.getDate();

            let currentDate = new Date(a, b, c);
            let dueDate = new Date(d[2], d[1], d[0]);


            if (currentDate > dueDate) {this.props.state.test = true;}
            else {this.props.state.test = false;}
        }

        event.preventDefault();

        let myData = {

            a: this.props.state.dateCompleted,
            b: this.props.state.description,
            c: this.props.state.importance,
            d: this.props.state.test

        };

        const data = new URLSearchParams();
        data.append('widgetId', 2332215);
        data.append('title', this.props.state.title);
        data.append('description',JSON.stringify(myData) );

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
                let a = eval('({obj:[' + data.task.description + ']})');

                     //До ПЕРЕЗАГРУЗКИ
                const newTask = {

                    id: data.task.id,
                    title: data.task.title,
                    description: a.obj[0].b,
                    importance: a.obj[0].c,
                    dueDate: null,
                    dayOfCompletedTask: null,
                    isDone: data.task.done,
                    test: a.obj[0].d,
                    dateCompleted: a.obj[0].a

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

    onDescriptionChange(event) {
        const newDescription = {description: event.target.value};
        this.props.createNewDescription(newDescription);
    }

    handleChange(event) {

        const newImportance = {importance: event.target.value};
        this.props.createNewImportance(newImportance);

    }

    setDueDate(event, value) {

        const newDueDate = {dateCompleted: event.target.value};
        this.props.createNewDueDate(newDueDate);

        this.setState({
            date: value
        })
    }


    render() {
        return (

            <div className='header'>


                <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit.bind(this)}>

                    <p><label> Название: <input type="text" name="title"
                                                onChange={this.onTitleChange.bind(this)} required/></label></p>
                    <p><label> Описание: <textarea type="text" name="description"
                                                   onChange={this.onDescriptionChange.bind(this)}
                                                   required></textarea></label>
                    </p>

                    <label>

                        Укажите срок выполнения:
                        <input onChange={this.setDueDate.bind(this)} value={this.state.date}/>
                        <div>
                            <p>Важность:
                                <select onChange={this.handleChange.bind(this)}>
                                    <option value='Обычная'> Обычная</option>
                                    <option value='Важная'> Важная</option>
                                    <option value='Очень Важная'> Очень важная</option>
                                </select>
                            </p>
                        </div>
                    </label>
                    <p><input type="submit" value="Добавить"/></p>
                </form>

            </div>
        );
    }
}

export default ToDoListTaskCreator;