import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './gridImage.css';

class GridImage extends Component {
  render () {
    const { image, onClick } = this.props;

    return (
      <div className={s.imageContainer} onClick={(e) => onClick(e, image)}>
        <img src={image.url} className={s.image} />
      </div>
    );
  }
}

export default withStyles(s)(GridImage);

