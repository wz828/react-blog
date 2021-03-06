/* export const REQUEST_DATA = "REQUEST_DATA"; */

const RequestTypes = {
  REQUEST_START: 'REQUEST_START',
  REQUEST_LISTSUCCESS: 'REQUEST_LISTSUCCESS',
  REQUEST_CONTENTSUCCESS: 'REQUEST_CONTENTSUCCESS',
  REQUEST_FAILURE: 'REQUEST_FAILURE',
};
const ThemeTypes = {
  CHANGE_SHOWTAGS: 'CHANGE_SHOWTAGS',
  CHANGE_PAGINATION: 'CHANGE_PAGINATION',
  CHANGE_THEME: 'CHANGE_THEME',
};

const SubmitTypes = {
  SUBMITSUCCESS: 'SUBMITSUCCESS',
  SUBMITFAILURE: 'SUBMITFAILURE',
};

export { RequestTypes, ThemeTypes, SubmitTypes };
