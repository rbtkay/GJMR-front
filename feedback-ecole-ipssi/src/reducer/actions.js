
export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    token
});

export const setLog = (log) => ({
    type: 'SET_LOG',
    log
});

export const removeUser = () => ({
    type: 'REMOVE_USER'
});

export const removeLog = () => ({
    type: 'REMOVE_LOG'
});