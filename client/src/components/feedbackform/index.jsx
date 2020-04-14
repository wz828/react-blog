import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import action from '@/redux/action/freeback';
import './index.less';

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        nickname: '',
        mail: '',
        title: '',
        detail: '',
      },
      count: 0,
    };
  }

  componentDidMount() {}

  onDetailChange(e) {
    const value = e.target.value;
    this.setForm({
      detail: value,
    });
    if (value !== '') {
      this.setState({
        count: value.length,
      });
    }
  }
  setForm(obj = {}) {
    let form = this.state.form;
    let newForm = Object.assign({}, form, obj);
    this.setState({
      form: newForm,
    });
  }

  submitFeedback() {
    if (Object.keys(this.state.form).filter(key => !this.state.form[key]).length !== 0) {
      alert('请完善所有内容');
      return;
    }

    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.state.form.mail)) {
      alert('请输入正确的邮箱');
      return;
    }
    this.props
      .submitFreeback({
        method: 'post',
        data: { info: this.state.form },
      })
      .then(e => {
        alert(e ? '提交留言成功' : '提交留言失败，服务器错误');
      });
  }

  render() {
    return (
      <div className="post-container">
        <div className="post-title">给我留言</div>

        <div className="form-item">
          <label htmlFor="name">昵称：</label>
          <input
            id="name"
            autoComplete="off"
            value={this.state.form.nickname}
            placeholder="请输入您的昵称（必填）"
            onChange={e => {
              this.setForm({
                nickname: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-item">
          <label htmlFor="mail">邮箱：</label>
          <input
            id="mail"
            autoComplete="off"
            value={this.state.form.mail}
            placeholder="请输入您的邮箱（必填）"
            onChange={e => {
              this.setForm({
                mail: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-item">
          <label htmlFor="title">标题：</label>
          <input
            id="title"
            autoComplete="off"
            value={this.state.form.title}
            placeholder="请输入标题（必填）"
            onChange={e => {
              this.setForm({
                title: e.target.value,
              });
            }}
          />
        </div>

        <div className="form-item">
          <label htmlFor="detail">详情：</label>
          <textarea
            id="detail"
            autoComplete="off"
            value={this.state.form.detail}
            placeholder="请输入详情（必填，最多输入200字）"
            maxLength={200}
            onChange={e => {
              this.onDetailChange(e);
            }}
          />
        </div>
        {this.state.count === 200 && <span className="error">!最多输入200字</span>}

        <div className="form-item">
          <button
            type="submit"
            onClick={() => {
              this.submitFeedback();
            }}
          >
            提交留言
          </button>
          <div className="textCount">{this.state.count}/200</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { submitStatus } = state;
  return { submitStatus };
};
const mapDispatchToProps = dispatch => ({
  submitFreeback: bindActionCreators(action.submitFreeback, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);
