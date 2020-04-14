import React from 'react';
import './index.less';

const arr = Array.from({ length: 8 }, (v, k) => k);
export default class Loading extends React.Component {
  render() {
    return (
      <div className="point-loading">
        {arr.map(item => (
          <span key={item} className="point" />
        ))}
      </div>
    );
  }
}
