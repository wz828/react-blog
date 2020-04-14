import { RequestTypes } from '../action/type';

let defaultMeta = new Map();
export default (state = { list: defaultMeta, content: {} }, action) => {
  switch (action.type) {
    case RequestTypes.REQUEST_LISTSUCCESS: {
      const list = action.payload.result;
      return {
        ...state,
        list,
      };
    }
    case RequestTypes.REQUEST_CONTENTSUCCESS: {
      const content = action.payload.result;
      return {
        ...state,
        content,
      };
    }
    case RequestTypes.REQUEST_FAILURE: {
      const error = action.payload.error;
      throw error;
    }
    default:
      return {
        ...state,
      };
  }
};
