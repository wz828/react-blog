import request from 'utils/request';
import { SubmitTypes } from './type';

const submitSuccess = result => ({
  type: SubmitTypes.SUBMITSUCCESS,
  payload: {
    result,
  },
});

const submitFailure = error => ({
  type: SubmitTypes.SUBMITFAILURE,
  payload: {
    error,
  },
});
export default {
  submitFreeback: e => async (dispatch, getState) => {
    try {
      const data = await request('/mail', e);
      dispatch(submitSuccess(data));
      return data.success;
    } catch (error) {
      dispatch(submitFailure(error));
    }
  },
};
