import React, { Component } from 'react';
import classnames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import dismiss from './dismiss.png'

class Header extends Component {
  render() {
    const { title, isDismissable, handleDismiss } = this.props;
    let cx = classnames.bind(s);

    return (
      <div className={cx({root: true, blackBg: isDismissable})}>
        <div className={s.container}>
          <h1 className={s.title}>{title}</h1>
          {isDismissable && 
            <div className={s.dismiss} onClick={(e) => handleDismiss(e)}>
              <img src={dismiss} alt="Close" title="Close" />
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Header);
