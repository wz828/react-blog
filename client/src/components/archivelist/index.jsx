import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import action from '@/redux/action/article';
import { Loading } from 'components';

import './index.less';

let isLoading = true;
class ArchiveList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    isLoading = true;
    !this.props.articleState.list.size && this.props.loadListData();
  }

  yearFormat(date) {
    return moment(date).format('YYYY');
  }
  render() {
    let years = new Set();
    let yearsMap = new Map();

    const { list } = this.props.articleState;

    for (let item of list) {
      years.add(this.yearFormat(item[1].date));
    }
    const newYears = Array.from(years);
    newYears.map(year => {
      const temp = Array.from(list).filter(item => {
        return this.yearFormat(item[1].date) === year;
      });
      yearsMap.set(year, temp);
    });

    if (this.props.articleState.list.size) {
      isLoading = false;
    }

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="archives-container">
            {newYears.map((year, yearIndex) => (
              <div className="one-tag-list" key={`year:${yearIndex + 1}`}>
                <span className="fa fa-calendar-times-o listing-seperator">
                  <span className="tag-text">{year}</span>
                </span>
                <ul>
                  {yearsMap.get(year).map((item, index) => (
                    <li key={`idx:${index + 1}`}>
                      <span>{moment(item[1].date).format('MM-DD')}</span>
                      <i className="fa fa-angle-double-right" aria-hidden="true" />
                      <Link to={'/article/' + item[1].pathName}>
                        <span>{item[1].title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { articleState } = state;
  return { articleState };
};
const mapDispatchToProps = dispatch => ({
  loadListData: bindActionCreators(action.loadListData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArchiveList);
