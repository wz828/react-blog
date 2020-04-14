import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ClassNames from 'classnames';
import { THEME_OPTIONS_MAPPING } from '@/config';
import action from '@/redux/action/theme';

import './index.less';

class Theme extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    };
    this.showClick = this.showClick.bind(this);
  }

  showClick() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  render() {
    const { changePagination, changeShowTags, changeTheme, themeState } = this.props;
    const { showTags, pagination, theme } = themeState;
    const colorStyle = { color: `${theme === 'gray' ? '#fff' : '#000'}` };

    return (
      <div>
        {!this.state.isShow ? (
          <div
            className={ClassNames('theme-btn', `${theme}`)}
            style={colorStyle}
            onClick={this.showClick}
          />
        ) : (
          <div className="theme">
            <div className="title">个性化主题</div>
            <div className="content">
              <div className="item">
                <div className="option">标签：</div>
                <label htmlFor="showTag-yes">展示</label>
                <input
                  id="showTag-yes"
                  type="radio"
                  name="showTag"
                  value="true"
                  checked={showTags === true}
                  onChange={e => {
                    changeShowTags(JSON.parse(e.currentTarget.value));
                  }}
                />
                <label htmlFor="showTag-no">隐藏</label>
                <input
                  id="showTag-no"
                  type="radio"
                  name="showTag"
                  value="false"
                  checked={showTags === false}
                  onChange={e => {
                    changeShowTags(JSON.parse(e.currentTarget.value));
                  }}
                />
              </div>
              <div className="item">
                <div className="option">分页：</div>
                <label htmlFor="pagination-yes">是</label>
                <input
                  id="pagination-yes"
                  type="radio"
                  name="pagination"
                  value="true"
                  checked={pagination === true}
                  onChange={e => {
                    changePagination(JSON.parse(e.currentTarget.value));
                  }}
                />
                <label htmlFor="pagination-no">否</label>
                <input
                  id="pagination-no"
                  type="radio"
                  name="pagination"
                  value="false"
                  checked={pagination === false}
                  onChange={e => {
                    changePagination(JSON.parse(e.currentTarget.value));
                  }}
                />
              </div>
              <div className="item">
                <div className="option">主题：</div>
                <select
                  className="themeSelect"
                  defaultValue={theme}
                  onChange={e => {
                    changeTheme(e.currentTarget.value);
                  }}
                >
                  {Object.keys(THEME_OPTIONS_MAPPING).map(key => (
                    <option key={key} value={key}>
                      {THEME_OPTIONS_MAPPING[key]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              className={ClassNames('close-btn', `${theme}`)}
              style={colorStyle}
              onClick={this.showClick}
            >
              确定
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { themeState } = state;
  return { themeState };
};
const mapDispatchToProps = dispatch => ({
  changePagination: bindActionCreators(action.changePagination, dispatch),
  changeShowTags: bindActionCreators(action.changeShowTags, dispatch),
  changeTheme: bindActionCreators(action.changeTheme, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
