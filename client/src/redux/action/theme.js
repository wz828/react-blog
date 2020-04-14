import storage from 'utils/localstorage';
import { ThemeTypes } from './type';

const setPagination = result => ({
  type: ThemeTypes.CHANGE_PAGINATION,
  payload: {
    result,
  },
});

const setShowTags = result => ({
  type: ThemeTypes.CHANGE_SHOWTAGS,
  payload: {
    result,
  },
});
const setTheme = result => ({
  type: ThemeTypes.CHANGE_THEME,
  payload: {
    result,
  },
});

export default {
  getLocalstorage: () => (dispatch, getState) => {
    const { pagination, showTags, theme } = getState().themeState;
    dispatch(setPagination(storage.get('pagination', pagination)));
    dispatch(setShowTags(storage.get('showTags', showTags)));
    dispatch(setTheme(storage.get('theme', theme)));
  },
  changePagination: e => dispatch => {
    dispatch(setPagination(e));
    storage.set('pagination', e);
  },
  changeShowTags: e => dispatch => {
    dispatch(setShowTags(e));
    storage.set('showTags', e);
  },
  changeTheme: e => dispatch => {
    dispatch(setTheme(e));
    storage.set('theme', e);
  },
};
