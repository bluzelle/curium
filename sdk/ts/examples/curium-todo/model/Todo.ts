export interface Todo {
    time: string
    body: string
    done: boolean
    synced: boolean
}

export type StoredTodo = Pick<Todo, 'done' | 'body' | 'time'>