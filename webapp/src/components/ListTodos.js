import React from 'react';
import fetch from 'isomorphic-fetch';

class ListTodos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos : [],
        };
    }

    fetchTodos(){
        fetch('http://localhost:3300/todos', { method: 'GET' }
            ).then((response) => response.json()
            ).then((result) => {
                setTimeout(this.fetchTodos.bind(this), 3000);
                this.setState({ todos: result });   
            })
            .catch(e => console.log('Error', e));
    }

    componentDidMount() {
        this.fetchTodos();
    }

    renderTodo(todo){
        return (
            <li key={todo.id}>
                <span className="todo-item-id">{todo.id.substr(0,8)}:</span>
                <span className="todo-item-text">{todo.text}</span>
            </li>
        );
    }

    render() {
        const list = (
            <ul>
                {this.state.todos.map(this.renderTodo)}
            </ul>
        );

        return (
            <div>
                <h2>Todo items:</h2>
                {list}
            </div>
        );
    }
}

export default ListTodos;
