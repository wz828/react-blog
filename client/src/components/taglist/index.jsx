import React from 'react';
import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import action from '@/redux/action/article';
import { Loading } from 'components';

import './index.less';

let isLoading = true;
class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    isLoading = true;
    !this.props.articleState.list.size && this.props.loadListData();
  }

  render() {
    let tags = new Map();
    let tagKeys = new Set();

    const { list } = this.props.articleState;

    for (let item of list) {
      item[1].tags.map(t => {
        tagKeys.add(t);
      });
    }
    const newTagsKeys = Array.from(tagKeys);
    newTagsKeys.map(key => {
      const temp = Array.from(list).filter(item => {
        return item[1].tags.includes(key);
      });
      tags.set(key, temp);
    });

    if (this.props.articleState.list.size) {
      isLoading = false;
    }

    return (
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div id="tag_cloud" className="tags">
              {newTagsKeys.map((tagKey, keyIndex) => (
                <a key={`tags:${keyIndex + 1}`}>{tagKey}</a>
              ))}
            </div>
            {newTagsKeys.map((tagKey, keyIndex) => (
              <div className="one-tag-list" key={`tags:${keyIndex + 1}`}>
                <span className="fa fa-tag listing-seperator" id={keyIndex}>
                  <span className="tag-text">{tagKey}</span>
                </span>
                {tags.get(tagKey).map((item, itemIndex) => (
                  <div className="post-preview" key={`itemIndex:${itemIndex + 1}`}>
                    <Link to={'/article/' + item[1].pathName}>
                      <h2 className="post-title">{item[1].title}</h2>
                    </Link>
                  </div>
                ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
