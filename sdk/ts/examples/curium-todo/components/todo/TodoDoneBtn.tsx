import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {Todo} from "../../model/Todo";
import {toggleTodoDone} from "../../services/TodoService";

export const TodoDoneBtn: React.FC<{todo: Todo}> = ({todo}) => {
    return (
        <FontAwesomeIcon icon={faCheck} onClick={() => toggleTodoDone(todo)}/>
    )
}