import { SubmitTypes } from '../action/type';

export default (state = {}, action) => {
  switch (action.type) {
    case SubmitTypes.SUBMITSUCCESS: {
      const result = action.payload.result;
      return {
        ...state,
        result,
      };
    }
    case SubmitTypes.SUBMITFAILURE: {
      const result = action.payload.result;
      return {
        ...state,
        result,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
