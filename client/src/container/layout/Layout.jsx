import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ClassNames from 'classnames';
import { Nav, Player, Theme } from 'components';
import action from '@/redux/action/theme';
import { MUSIC } from '@/config';
import './Layout.less';

const message = "Welcome to xuwanzhi's blog!";
class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getLocalstorage();
  }

  render() {
    const { theme } = this.props.themeState;

    return (
      <div className={ClassNames('theme-bg', { [`${theme}-img`]: true })}>
        <Theme />
        <div className="site-nav-toggle" id="site-nav-toggle">
          <button type="button">
            <span className="btn-bar"></span>
            <span className="btn-bar"></span>
            <span className="btn-bar"></span>
          </button>
        </div>

        <div className="index-about">
          <i>{message}</i>
        </div>

        <div className="index-container">
          <div className="index-left">
            <Nav />
            <div className="index-about-mobile">
              <i>{message}</i>
            </div>
          </div>
          <div className="index-middle">{this.props.children}</div>
        </div>
        <Player {...MUSIC} />

        <footer className="footer">
          <p>Created By xuwanzhi@2020</p>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { themeState } = state;
  return { themeState };
};
const mapDispatchToProps = dispatch => ({
  getLocalstorage: bindActionCreators(action.getLocalstorage, dispatch),
});

//withReoter需要在外层
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
