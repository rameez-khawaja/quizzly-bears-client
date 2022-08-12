
import quizzlyReducer from '.';
import * as actions from '../../actions';

describe('quizzly reducer', () => {
  it('should return the initial state', () => {
    expect(quizzlyReducer(undefined, {})).toEqual({"player": "", "quizState": {}, "socket": {}});
  });

  it('should handle GET_POST_START', () => {
    const storeSocket = {
      type: actions.storeSocket
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(quizzlyReducer({}, storeSocket)).toEqual({});
  });
  
});
