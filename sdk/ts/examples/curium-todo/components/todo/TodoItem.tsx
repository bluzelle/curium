import {ListGroupItem} from "react-bootstrap";
import {Todo} from "../../model/Todo";
import {formatDistance} from 'date-fns'
import {TodoDeleteBtn} from "./TodoDeleteBtn";
import {TodoDoneBtn} from "./TodoDoneBtn";
import {Mask} from "../Mask";

export const TodoItem: React.FC<{ todo: Todo }> = ({todo}) => (
    <ListGroupItem disabled={!todo.synced}>
        <Mask show={!todo.synced}>
        <div style={{fontSize: '.7em', color: '#aaa'}}>
            <div style={{float: 'right'}}>
                <TodoDeleteBtn todo={todo} />
                <span style={{width: 10, display: 'inline-block'}}/>
                <TodoDoneBtn todo={todo} />
            </div>
                {formatDistance(new Date(todo.time), new Date(), {addSuffix: true})}
        </div>
        <div style={{textDecoration: todo.done ? 'line-through' : ''}}>
            {todo.body}
        </div>
        </Mask>
    </ListGroupItem>
)