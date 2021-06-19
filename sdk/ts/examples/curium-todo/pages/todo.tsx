import {AddTodo} from "../components/todo/AddTodo";
import {TodoList} from "../components/todo/TodoList";
import {useEffect, useState} from "react";
import {initialLoadTodos, params} from "../services/TodoService";
import {ConnectionError} from "../components/ConnectionError";

export default () => {
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        initialLoadTodos()
            .catch(err => setError(err.message))
    }, [])

    return (
        error ? (
            <ConnectionError error={error}/>
        ) : (
            <>
                <TodoList/>
                <hr/>
                <AddTodo/>
            </>
        )
    )
}