import React from 'react';
import moment from 'moment';
import ClassNames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '@/redux/action/article';
import { Loading } from 'components';
import './list.less';

const selectOption = [
  {
    value: '',
    desc: '请选择',
  },
  {
    value: 'ascent',
    desc: '时间升序',
  },
  {
    value: 'descend',
    desc: '时间降序',
  },
];
let isLoading = true;
class ArticleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      begin: 0,
      pageSize: 8,
      initList: [],
      list: [],
      inputValue: '',
      selectValue: '',
      canSearch: false,
    };
    this.selectChange = this.selectChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  componentDidMount() {
    isLoading = true;

    // Question:使用then()更好吗？
    // const init = async () => {
    //   const data = await this.props.loadListData();
    //   const temp = Array.from(data);
    //   this.setState({
    //     initList: temp,
    //     list: temp,
    //   });

    // };

    const init = async () => {
      await this.props.loadListData().then(data => {
        const temp = Array.from(data);
        isLoading = false;
        this.setState({
          initList: temp,
          list: temp,
        });
      });
    };
    if (!this.state.list.length) {
      init();
    } else {
      isLoading = false;
    }
  }
  componentWillUnmount() {
    // Question:
    // 这个页面是异步请求数据然后设置state，组件卸载时能怎么设置？
    // 否则，当点击首页再点击其他页面，还会执行原来的setState，警告组件已经卸载 state不能更新
  }
  onChange(e) {
    const value = e.target.value;
    if (value) {
      this.setState({
        inputValue: value,
        canSearch: true,
      });
    } else {
      this.setState({
        inputValue: '',
        list: this.sort(this.state.selectValue),
        canSearch: false,
      });
    }
  }

  nextPage() {
    this.setState({
      begin: this.state.begin + this.state.pageSize,
    });
  }

  lastPage() {
    this.setState({
      begin: this.state.begin - this.state.pageSize,
    });
  }
  sort(val) {
    const sortArray = this.state.initList.concat([]);
    if (val) {
      sortArray.sort((a, b) => {
        const aDate = Date.parse(a[1].date);
        const bDate = Date.parse(b[1].date);

        return val === 'ascent' ? aDate - bDate : bDate - aDate;
      });
    }
    return sortArray;
  }

  selectChange(e) {
    const val = e.target.value;
    this.setState({
      selectValue: val,
      list: this.sort(val),
    });
  }

  searchClick() {
    const value = this.state.inputValue;
    const searchResult = this.state.list.filter(item => {
      const temp = item[0].toUpperCase();
      return temp.includes(value.toUpperCase());
    });
    this.setState({
      list: searchResult,
    });
  }

  render() {
    const list = this.state.list;
    const { showTags, pagination, theme } = this.props.themeState;
    const newList = pagination
      ? list.slice(this.state.begin, this.state.begin + this.state.pageSize * (showTags ? 1 : 2))
      : list;

    return (
      <div>
        <div className="fliter">
          <div className="sort">
            <div className="fliter-title">排序:</div>
            <select
              className={ClassNames('sort-select', `${theme}`)}
              defaultValue={this.state.selectValue}
              onChange={this.selectChange}
            >
              {selectOption.map((item, idx) => (
                <option key={`select:${idx + 1}`} value={item.value}>
                  {item.desc}
                </option>
              ))}
            </select>
          </div>
          <div className={ClassNames('search', `${theme}-hover-s`)}>
            <input className="search-input" onChange={this.onChange} placeholder="请输入" />
            <button
              type="button"
              className={ClassNames('search-btn', `${theme}`)}
              onClick={this.searchClick}
              disabled={!this.state.canSearch}
            >
              标题搜索
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className="post-preview-container">
              {!!newList.length &&
                newList.map((item, index) => (
                  <div className="post-preview" key={`item:${index + 1}`}>
                    <div className="post-time">{moment(item[1].date).format('YYYY-MM-DD')}</div>
                    <div className="post-info">
                      <Link to={'/article/' + item[1].pathName}>
                        <h3>{item[1].title}</h3>
                      </Link>
                      {showTags && (
                        <p>
                          <span>/</span>
                          {item[1].tags.map((tag, tagIndex) => (
                            <span key={`tag:${tagIndex + 1}`}> {tag} /</span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
            {pagination && list.length > this.state.pageSize && (
              <ul className="pager">
                <li
                  className={ClassNames('previous', { hidden: this.state.begin === 0 })}
                  onClick={() => {
                    this.lastPage();
                  }}
                >
                  <a>&larr; Newer Posts</a>
                </li>

                <li
                  className={ClassNames('next', {
                    hidden: this.state.begin + this.state.pageSize >= list.length,
                  })}
                  onClick={() => {
                    this.nextPage();
                  }}
                >
                  <a>Older Posts &rarr;</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { articleState, themeState } = state;
  return { articleState, themeState };
};
const mapDispatchToProps = dispatch => ({
  loadListData: bindActionCreators(action.loadListData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
