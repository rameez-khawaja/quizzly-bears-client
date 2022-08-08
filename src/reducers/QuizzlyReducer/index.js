const initState = {
  gameState: {},
  socket: {},
  user: "",
};

const quizzlyReducer = (state = initState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return { ...state, gameState: action.payload };
    case "STORE_SOCKET":
      return { ...state, socket: action.payload };
      case 'STORE_USER':
        return {
            ...state,
            user: action.payload
        };
    case "ADD_USER":
      let allUsers = [...state.gameState.users];
      allUsers.push({ name: action.payload, score: 0, completed: false });
      return {
        ...state,
        gameState: {
          ...state.gameState,
          users: allUsers,
        },
      };
    default:
      return state;
  }
};

export default quizzlyReducer;
