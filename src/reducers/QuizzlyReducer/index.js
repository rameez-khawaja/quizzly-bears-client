const initState = {
  quizState: {},
  socket: {},
  player: ""
};

const quizzlyReducer = (state = initState, action) => {
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
      };
    case 'FINISHED_QUIZ':
    let finishedUsersArr = [...state.quizState.users];
    let playerIndex = finishedUsersArr.findIndex(player => player.name === action.payload)
    finishedUsersArr[playerIndex].completed = true;
    return {
      ...state,
      quizState: { ...state.quizState, users: finishedUsersArr }
    }

    case 'INCREASE_QUESTION_NUMBER':
      let newQuestionNumber = state.quizState.questionNumber + 1;
      return {
        ...state,
        quizState: { ...state.quizState, questionNumber: newQuestionNumber }
      };
    case 'INCREASE_SCORE':
      let newUsers = [...state.quizState.users];
      let userIndex = newUsers.findIndex(item => item.name === action.player);
      newUsers[userIndex].score += action.score
      return {
        ...state,
        quizState: { ...state.quizState, users: newUsers }
      };
    default:
      return state;
  }

};




export default quizzlyReducer;
