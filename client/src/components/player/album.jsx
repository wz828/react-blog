import './index.less';

export default class Album extends React.Component {
  render() {
    const { status = 0 } = this.props;
    return (
      <div className={`album${status ? ' active' : ''}`} onClick={this.props.handler}>
        <img alt="" className="cover" src={this.props.cover} />
        <div className={`icon${status ? ' active' : ''}`}></div>
      </div>
    );
  }
}
