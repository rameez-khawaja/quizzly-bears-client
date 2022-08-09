const initState = {
  quizState: {},
  socket: {},
  player: ""
};

const quizzlyReducer = (state = initState, action) => {
  console.log(state)

  switch (action.type) {
    case "CHANGE_STATE":
      return { ...state, quizState: action.payload };
    case "STORE_SOCKET":
      return { ...state, socket: action.payload };
    case 'STORE_USER':
      return {
        ...state, player: action.payload
      };
    case "ADD_USER":
      let allUsers = [...state.quizState.users];
      allUsers.push({ name: action.payload, score: 0, completed: false });
      return {
        ...state, quizState: {
          ...state.quizState, users: allUsers,
        },
      };
    case 'START_QUIZ':
      return {
        ...state,
        quizState: {
          ...state.quizState,
          gameStarted: true
        }
      }
    default:
      return state;
  }

};




export default quizzlyReducer;
