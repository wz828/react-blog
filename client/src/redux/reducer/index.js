import { combineReducers } from 'redux';
import articleState from './articleReducers';
import themeState from './themeReducers';
import submitStatus from './freebackReducers';

/* 使用 combineReducers 进行 export */
export default combineReducers({
  articleState,
  themeState,
  submitStatus,
});
