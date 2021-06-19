import {Alert, Button} from "react-bootstrap";
import {params} from "../services/TodoService";

export const ConnectionError: React.FC<{error: string}> = ({error}) => (
    <>
        <Alert>{error}</Alert>
        <Button as="a" href="/">Try again</Button>
        <hr/>
        <textarea style={{width: '100%'}} rows={10} value={JSON.stringify(params)}/>
    </>

)