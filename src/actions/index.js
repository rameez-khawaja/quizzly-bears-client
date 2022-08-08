

const storeSocket = (socket) => {
    return {
        type: 'STORE_SOCKET',
        payload: socket
    }
}

const changeState = (data) => {
    return {
        type: 'CHANGE_STATE',
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

// Start game
const startQuiz = () => { 
    return {
        type: 'START_QUIZ',
    }
}
export { storeSocket, changeState, storeUser, addUser, startQuiz };
