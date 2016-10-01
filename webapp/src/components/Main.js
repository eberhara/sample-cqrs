import React from 'react';
import AddTodo from './AddTodo';
import ListTodos from './ListTodos';

class Main extends React.Component {

    render() {
        return (
            <div className="main-container">
                <div className="main-container-item">
                    <AddTodo />
                </div>
                <div className="main-container-item">
                    <ListTodos />
                </div>
            </div>
        );
    }
}

export default Main;
