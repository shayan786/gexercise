import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Grid.css';
import GridImage from './GridImage.js';

class Grid extends Component {
  renderImages (images) {
    if (images.length === 0 || !images)
      return null

    const { showImage, mounted } = this.props;

    return (
      images.map((i, key) => {
        return (
          <GridImage
            key={key}
            image={i}
            onClick={showImage}
            mounted={mounted} />
        )
      })
    )
  }

  render () {
    const { images } = this.props;

    return (
      <div className={s.container}>
        { this.renderImages(images) }
      </div>
    );
  }
}

export default withStyles(s)(Grid);
