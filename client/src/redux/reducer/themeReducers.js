import { ThemeTypes } from '../action/type';

const defaultTheme = {
  showTags: true,
  pagination: true,
  theme: 'blue',
};
export default (state = defaultTheme, action) => {
  switch (action.type) {
    case ThemeTypes.CHANGE_PAGINATION: {
      const pagination = action.payload.result;
      return {
        ...state,
        pagination,
      };
    }
    case ThemeTypes.CHANGE_SHOWTAGS: {
      const showTags = action.payload.result;
      return {
        ...state,
        showTags,
      };
    }

    case ThemeTypes.CHANGE_THEME: {
      const theme = action.payload.result;
      return {
        ...state,
        theme,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
