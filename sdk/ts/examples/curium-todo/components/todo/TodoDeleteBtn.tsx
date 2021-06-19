import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Todo} from "../../model/Todo";
import {deleteTodo} from "../../services/TodoService";

export const TodoDeleteBtn: React.FC<{todo: Todo}> = ({todo}) => {
    return (
            <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(todo)}/>
    )
}