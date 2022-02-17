type CombineReducer<ReducersConfig = any, Action = { type: any }> = (config: {
    [key in keyof ReducersConfig]: (
        state: ReducersConfig[key] | undefined,
        action: Action
    ) => ReducersConfig[key];
}) => (
    state:
        { [key in keyof ReducersConfig]: ReducersConfig[key]; }
        | undefined,
    action: Action
) => {
    [key in keyof ReducersConfig]: ReducersConfig[key];
};

export const combineReducers = <ReducersConfig = any, Action = { type: any }>(
    reducersMap: {
        [key in keyof ReducersConfig]: (
            state: ReducersConfig[key] | undefined,
            action: Action
        ) => ReducersConfig[key];
    }
): (
    state:
        { [key in keyof ReducersConfig]: ReducersConfig[key]; }
        | undefined,
    action: Action
) => {
    [key in keyof ReducersConfig]: ReducersConfig[key];
} => {

    return (
        state:
            { [key in keyof ReducersConfig]: ReducersConfig[key]; }
            | undefined,
        action: Action
    ): {
        [key in keyof ReducersConfig]: ReducersConfig[key];
    } => {
        const result = Object.create(null);

        for (const key in reducersMap) {
            result[key] = reducersMap[key](state && state[key], action);
        }

        return result;
    }
}
