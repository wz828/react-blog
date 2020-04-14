import request from 'utils/request';
import { RequestTypes } from './type';

/*
 * 将异步请求抽离到 action 的好处：
 * 一方面可以抽离组件代码，并且组件之间更方便地共享数据
 * 另外一方面可以让请求发送不再被组件生命周期影响，也可以有效节流
 * */

/* TODO AND TIP:

这里我们需要定义异步 action，请求 list 接口来读取数据（可以通过 `${preURL}/list` 的方式来构造链接）

另外对于具体的数据存储方式，建议采用 javascript 的 map 数据结构，这会给我们之后带来方便，这里给出一些提示代码（不一定完全要采用）：

    let articleMeta = new Map();
    for(let item of response.data){
        articleMeta.set(item.pathName, item)
    }
*/
const requestStart = () => ({
  type: RequestTypes.REQUEST_START,
});

const requestListSuccess = result => ({
  type: RequestTypes.REQUEST_LISTSUCCESS,
  payload: {
    result,
  },
});
const requestContentSuccess = result => ({
  type: RequestTypes.REQUEST_CONTENTSUCCESS,
  payload: {
    result,
  },
});

const requestFailure = error => ({
  type: RequestTypes.REQUEST_FAILURE,
  payload: {
    error,
  },
});
export default {
  loadListData: () => async (dispatch, getState) => {
    dispatch(requestStart());
    try {
      const data = await request('/list');
      let articleMeta = new Map();
      for (let item of data) {
        articleMeta.set(item.pathName, item);
      }
      dispatch(requestListSuccess(articleMeta));
      return articleMeta;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  },
  loadContentData: pathName => async (dispatch, getState) => {
    dispatch(requestStart());
    try {
      const data = await request(`/post?pathName=${pathName}`);
      dispatch(requestContentSuccess(data));
      return data;
    } catch (error) {
      dispatch(requestFailure(error));
    }
  },
};
