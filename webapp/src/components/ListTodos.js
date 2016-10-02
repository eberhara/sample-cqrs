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
        fetch('http://localhost:3100/todos', { method: 'GET' }
            ).then((response) => response.json()
            ).then((result) => {
                console.log(result);
                setTimeout(this.fetchTodos.bind(this), 3000);
                this.setState({ todos: result });   
            })
            .catch(e => console.log('Error', e));
    }

    componentDidMount() {
        this.fetchTodos();
    }

    render() {
        const list = this.state.todos.map(todo => {
            return (<div>{todo.id} - {todo.text}</div>)
        });

        return (
            <div>
                <h2>Todo items:</h2>
                {list}
            </div>
        );
    }
}

export default ListTodos;
