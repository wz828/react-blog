import React from 'react';

import './content.less';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '@/redux/action/article';

const ReactMarkdown = require('react-markdown');

class ArticleContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
    };
  }

  componentDidMount() {
    const { match, articleState } = this.props;
    const { pathName } = match.params;
    const { list } = articleState;

    if (list.has(pathName)) {
      const data = list.get(pathName);
      this.setState({
        post: data,
      });
    }
    this.props.loadContentData(pathName);

    /* Question:这样写，state改变了但是组件没有更新，为什么
    const getData = async () => {
      const data = await this.props.loadContentData(pathName);
      this.setState({
        post: Object.assign(data)
      })

    };
    getData();
    */
  }

  render() {
    const { title, date, tags, _content } = this.props.articleState.content;
    return (
      <div className="post-container">
        <div className="post-title">{this.state.post.title || title}</div>

        <div className="post-meta">
          <span className="attr">
            发布于：
            {moment(this.state.post.date || date).format('YYYY-MM-DD hh:mm:ss')}
          </span>

          <span className="attr">
            标签：/
            {(this.state.post.tags || tags || []).map(item => ' ' + item + ' /')}
          </span>

          <span className="attr">访问：</span>
        </div>

        <div className="post-content">
          <ReactMarkdown source={this.state.post_content || _content} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { articleState } = state;
  return { articleState };
};
const mapDispatchToProps = dispatch => ({
  loadContentData: bindActionCreators(action.loadContentData, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent);
