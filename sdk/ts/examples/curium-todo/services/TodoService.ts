import {bluzelle} from "@bluzelle/sdk-js";
import {extend, memoize} from 'lodash'
import {StoredTodo, Todo} from "../model/Todo";
import {bluzelleConfig, userConfig} from "../../example-config";

export const params:any = bluzelleConfig;
export const userParams:any = userConfig;

const todosListeners = [];
const todos: Record<string, Todo> = {};

const bz = bluzelle(params);

export const initialLoadTodos = () => loadTodos();

export const onTodoListUpdated = (fn: (todos: Todo[]) => void) => {
    todosListeners.push(fn);
}


export const storeTodo = (todo: Pick<Todo, 'body'>): Promise<any> => {
    const time = new Date().toISOString();
    todos[time] = {...todo, time, synced: false, done: false};
    notifyListeners();
    const storedTodo: StoredTodo = {...todo, time, done: false};
    return bz
        .then(client => client.db.tx.Create({	
            creator: client.db.address,     			// the creator of the transaction should always be the sender's address*
            uuid: userConfig.uuid,	
            key: time,
            value: new TextEncoder().encode(JSON.stringify(storedTodo)),	// values are stored as byte arrays 
            metadata: new Uint8Array(),			
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0} // Lease object to specify lifespan of key-value**
       }))
        .then(() => todos[time].synced = true)
        .then(notifyListeners)
}

const notifyListeners = () =>
 todosListeners.forEach(listener => listener(Object.values(todos)));

const loadTodos = (): Promise<void> =>
        bz
        .then(client => client.db.q.KeyValues({uuid:client.db.address}))
        .then(result => result.keyValues.map(it => ({...JSON.parse(new TextDecoder().decode(it.value)), synced: true})))
        .then(list => list.map(it => todos[it.time] = extend(todos[it.time] || {},  it)))
        .then(notifyListeners)

export const deleteTodo = (todo: Todo):Promise<any> => {
    todo.synced = false;
    notifyListeners();
    return bz
        .then(client => client.db.tx.DeleteAll({
            creator: client.db.address,
            uuid: userConfig.uuid
        }))
        .then(() => delete todos[todo.time])
        .then(notifyListeners);
}

export const toggleTodoDone = (todo: Todo): Promise<any> => {
    todo.done = !todo.done;
    todo.synced = false;
    notifyListeners();
    const storedTodo: StoredTodo = {
        done: todo.done,
        body: todo.body,
        time: todo.time
    }
    return bz
        .then(client => client.db.tx.Upsert({
            creator: client.db.address,
            uuid: userConfig.uuid,
            key: todo.time,
            value: new TextEncoder().encode(JSON.stringify(storedTodo)),
            metadata: new Uint8Array(),
            lease: {days: 0, seconds: 0, years: 0, hours: 1, minutes: 0} 
        }))
        .then(() => todo.synced = true)
        .then(notifyListeners)
}


