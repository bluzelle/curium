import {ListGroup, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {TodoItem} from "./TodoItem";
import {onTodoListUpdated} from "../../services/TodoService";
import {Todo} from "../../model/Todo";

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[] | null>(null);
    const refresh = useState<number>()[1];


    useEffect(() => onTodoListUpdated(setTodos), [])

    useEffect(() => {
        setInterval(() => refresh(Date.now()), 2000);
    }, [])

    return (
            <ListGroup>

                {todos ? (
                    todos.length ? (
                        todos.map(todo => <TodoItem key={todo.time} todo={todo}/>)
                    ) : (
                        'No todos yet'
                    )
                ) : (
                    <Spinner style={{margin: 'auto'}} animation="border"/>
                )}
            </ListGroup>
    )
}