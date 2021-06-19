import {Button, Form, Spinner} from "react-bootstrap";
import {params as bluzelleParams, userParams as bluzelleUserParams} from '../services/TodoService'
import {ChangeEvent, EventHandler, useState} from "react";
import {useRouter} from "next/router";
import {extend} from 'lodash';

export const ParamsForm: React.FC = () => {
    const [params, setParams]:any = useState(bluzelleParams);
    const [userParams, setUserParams]:any = useState(bluzelleUserParams);
    const router = useRouter();
    const [connecting, setConnecting] = useState<boolean>(false);

    const updateParam = (name: string) => (ev: ChangeEvent<HTMLInputElement>) => setParams({...params, [name]: ev.target.value})
    const updateUserParam = (name: string) => (ev: ChangeEvent<HTMLInputElement>) => setUserParams({...userParams, [name]: ev.target.value})

    const formSubmit = ev => {
        setConnecting(true);
        extend(bluzelleParams, params);
        extend(bluzelleUserParams, userParams);
        ev.preventDefault();
        router.push('/todo');
    }

    return (
        <Form onSubmit={formSubmit}>
            <ParamFormField label="Mnemonic" value={params.mnemonic} onChange={updateParam('mnemonic')}/>
            <ParamFormField label="Endpoint" value={params.url} onChange={updateParam('url')}/>
            <ParamFormField label="UUID" value={bluzelleUserParams.uuid} onChange={updateUserParam('uuid')}/>
            <Button variant="primary" onClick={formSubmit} disabled={connecting}>
                {connecting ? 'Connecting...' : 'Connect'}
            </Button>
        </Form>
    )
}

export const ParamFormField: React.FC<{ label: string, value: string, autoFocus?: boolean, onChange: EventHandler<ChangeEvent> }> = ({label, ...props}) => (
    <Form.Group controlId="label">
        <Form.Label>{label}</Form.Label>
        <Form.Control autoComplete="off" {...props} onBlur={props.onChange}/>
        <Form.Text className="text-muted"/>
    </Form.Group>

)