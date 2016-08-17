import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './gridImage.css';
import classnames from 'classnames/bind';

class GridImage extends Component {
  render () {
    const { image, onClick, mounted } = this.props;
    const cx = classnames.bind(s);

    return (
      <div className={cx({imageContainer: true, isLoaded: !mounted})} onClick={(e) => onClick(e, image)}>
        <img
          src={image.url}
          className={s.image} />
      </div>
    );
  }
}

export default withStyles(s)(GridImage);

