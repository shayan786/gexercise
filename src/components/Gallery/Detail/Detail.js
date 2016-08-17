import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Detail.css';
import Swipable from 'react-swipeable';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Detail extends Component {
  render () {
    const { image, onSwipeRight, onSwipeLeft, onClick } = this.props;

    return (
      <ReactCSSTransitionGroup 
        transitionName={{
          enter: s.enter,
          enterActive: s.enterActive,
          leave: s.leave,
          leaveActive: s.leaveActive,
          appear: s.appear,
          appearActive: s.appearActive
        }}
        transitionAppear={true}
        transitionAppearTimeout={200}
        transitionEnterTimeout={200}
        transitionLeaveTimeout={200}>
        <Swipable
          onSwipedRight={() => onSwipeRight(image.index)}
          onSwipedLeft={() => onSwipeLeft(image.index)} >
          <div className={s.container} onClick={() => onClick()}>
            <img src={image.url} className={s.image} />
          </div>
        </Swipable>
      </ReactCSSTransitionGroup>
    );
  }
}

export default withStyles(s)(Detail);
