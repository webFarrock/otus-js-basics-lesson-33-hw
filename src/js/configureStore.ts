export type Store<State = any, Action = { type: string }> = {
    getState(): State;
    dispatch(action: Action): any;
    subscribe(cb: () => void): () => void;
};

export type Reducer<State, Action> = (
    state: State | undefined,
    action: Action
) => State;

export type Middleware<State, Action> = (
    store: Store<State, Action>
) => (next: (action: Action) => any) => (action: Action) => any;

export type ConfigureStore<State, Action> = (
    reducer: Reducer<State, Action>,
    initialState?: State | undefined,
    middlewares?: Middleware<State, Action>[]
) => Store<State, Action>;


export function configureStore<State, Action>(reducer:Reducer<State, Action>, state?:State){
    const subscribers = new Set<() => void>([]);
    const subscribe = (subscriber: () => void) => {
        subscribers.add(subscriber);
        return () => subscribers.delete(subscriber)
    };

    const getState = () => state;
    const dispatch = (action:Action) => {
        state = reducer(state, action);
        subscribers.forEach((subscriber) => subscriber())
    }

    return {
        getState,
        dispatch,
        subscribe,
    }
}
