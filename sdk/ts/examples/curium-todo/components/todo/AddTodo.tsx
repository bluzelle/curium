import {Button, Form} from "react-bootstrap";
import {useState} from "react";
import {storeTodo} from "../../services/TodoService";

export const AddTodo: React.FC = () => {
    const [key, setKey] = useState<string>('');
    const [bodyValue, setBodyValue] = useState<string>('');


    const addTodo = () => {

        storeTodo({
            body: bodyValue
        })
            setKey(Date.now().toString());
            setBodyValue('');
    }

    const updateBodyValue = (ev) => {
        setBodyValue(ev.target.value);
    }

    return (
        <Form onSubmit={(ev) => {addTodo(); ev.preventDefault()}}>
            <Form.Group controlId="formTodo">
                <Form.Label>Add a new todo</Form.Label>
                <Form.Control  autoComplete="off" key={key} autoFocus value={bodyValue}  onChange={updateBodyValue} placeholder="Enter text" />
                <Form.Text className="text-muted"/>
            </Form.Group>

            <Button variant="primary" onClick={addTodo} >
                Add todo
            </Button>
        </Form>
    )
}