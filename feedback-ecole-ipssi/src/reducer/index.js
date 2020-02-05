const initialState = {
    user: null,
    log: null
};

function reducer(state = initialState, action) {
    let nextState;

    switch (action.type) {

        case "SET_USER":
            nextState = {
                ...state,
                user: action.user
            };
            return nextState || state;

        case "REMOVE_USER":
            nextState = {
                ...state,
                user: null
            };;
            return nextState || state;

        case "SET_TOKEN":
            nextState = {
                ...state,
                user: {
                    ...state.user,
                    token: action.token
                }
            };
            return nextState || state;

        case "SET_LOG":
            nextState = {
                ...state,
                log: action.log
            };
            return nextState || state;

        case "REMOVE_LOG":
            nextState = {
                ...state,
                log: null
            };
            return nextState || state;

        default:
            return state;
    }
}

export default reducer;
