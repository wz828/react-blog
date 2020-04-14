// store 的样例代码 可直接使用
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './redux/reducer/index';

// redux 注入操作
const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
