

const storeSocket = (socket) => {
    return {
        type: 'STORE_SOCKET',
        payload: socket
    }
}

const changeState = (data) => {
    return {
        type: 'CHANGE_GAME_STATE',
        payload: data
    }
}

const storeUser = (user) => {
    return {
        type: 'STORE_USER',
        payload: user
    }
}

const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user
    }
}

const startGame = () => {
    return {
        type: 'START_GAME',
    }
}
export { storeSocket, changeState, storeUser, addUser, startGame };
