import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Detail.css';
import Swipable from 'react-swipeable';

class Detail extends Component {
  render () {
    const { image, onSwipeRight, onSwipeLeft, onClick } = this.props;

    return (
      <Swipable
        onSwipedRight={() => onSwipeRight(image.index)}
        onSwipedLeft={() => onSwipeLeft(image.index)} >
        <div className={s.container} onClick={() => onClick()}>
          <img src={image.url} className={s.image} />
        </div>
      </Swipable>
    );
  }
}

export default withStyles(s)(Detail);
