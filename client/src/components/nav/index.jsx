import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import ClassNames from 'classnames';
import './index.less';

const liMap = [
  {
    className: 'icon-home',
    title: '首页',
    link: '/',
  },
  {
    className: 'icon-label',
    title: '标签',
    link: '/taglist',
  },
  {
    className: 'icon-archive',
    title: '归档',
    link: '/archive',
  },
  {
    className: 'icon-feedback',
    title: '反馈',
    link: '/feedback',
  },
  {
    className: 'icon-about',
    title: '关于',
    link: '/about',
  },
];
class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { theme } = this.props.themeState;

    return (
      <div className="nav" id="nav">
        <div className="avatar-name">
          <div className={ClassNames('avatar', `${theme}-hover-l`)}>
            <img alt="" src={require('../../resource/avatar.jpg')} />
          </div>
          <div className="name">
            <i>xuwanzhi</i>
          </div>
        </div>
        <div className="contents" id="nav-content">
          <ul>
            {liMap.map(item => (
              <li
                key={item.title}
                className={ClassNames({ active: this.props.location.pathname === item.link })}
              >
                <Link to={item.link}>
                  <i className={ClassNames('iconfont', item.className)}></i>
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

// export default withRouter(Nav)

const mapStateToProps = state => {
  const { themeState } = state;
  return { themeState };
};
const mapDispatchToProps = () => ({});

// connect放在外层，路由改变，组件不更新
// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
