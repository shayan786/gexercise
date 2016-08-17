import React, { Component, PropTypes } from 'react';
import classnames from 'classnames/bind';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import sHeader from '../../components/Header/Header.css';
import sFooter from '../../components/Gallery/Footer/Footer.css';

import Header from '../../components/Header/Header.js';
import Grid from '../../components/Gallery/Grid/Grid.js';
import Detail from '../../components/Gallery/Detail/Detail.js';
import Footer from '../../components/Gallery/Footer/Footer.js';
import { images } from '../../components/Gallery/images';

const title = 'Shy - Google Exercise';

class Home extends Component {
  constructor(props) {
    super(props) ;

    this.state = {
      showDetail: false,
      showHeaderAndFooter: true,
      showDetailImage: null
    }
  }

  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.setTitle(title);
  }

  showImage(event, image) {
    const TRANSITION_DELAY = 300;
    const imageEl = event.target;
    const imageContainerEl = event.target.parentElement;

    imageContainerEl.style.transformOrigin = getTransformOrigin(imageContainerEl);

    if (!imageContainerEl.classList.toString().includes(s.enlargeContainer))
      imageContainerEl.classList.add(s.enlargeContainer);
    
    setTimeout(() => {
      this.setState({
        showDetail: true,
        showDetailImage: image
      });
    }, TRANSITION_DELAY);
    

    function getTransformOrigin (el) {
      const rect = el.getBoundingClientRect();
      const WINDOW_WIDTH = window.innerWidth;
      const WINDOW_HEIGHT = window.innerHeight;

      // 0% 0% (top left)
      if ((rect.left < WINDOW_WIDTH / 2) && (rect.top < WINDOW_HEIGHT / 4))
        return '0% 0%';
      if ((rect.left < WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 4) && (rect.top < WINDOW_HEIGHT / 2))
        return '0% 25%';
      if ((rect.left < WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 2) && (rect.top < WINDOW_HEIGHT / 1.4))
        return '0% 75%';
      if ((rect.left < WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 1.4))
        return '0% 100%';
      if ((rect.left > WINDOW_WIDTH / 2) && (rect.top < WINDOW_HEIGHT / 4))
        return '100% 0%';
      if ((rect.left > WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 4) && (rect.top < WINDOW_HEIGHT / 2))
        return '100% 25%';
      if ((rect.left > WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 2) && (rect.top < WINDOW_HEIGHT / 1.4))
        return '100% 75%';
      if ((rect.left > WINDOW_WIDTH / 2) && (rect.top > WINDOW_HEIGHT / 1.4))
        return '100% 100%';
    }
  }

  handleDismiss(event) {
    event.preventDefault();

    this.setState({
      showDetail: false,
      showDetailImage: null
    });
  }

  toggleHeaderAndFooter() {
    const { showHeaderAndFooter, showDetail } = this.state;

    if (showHeaderAndFooter && showDetail) {
      const footer = document.getElementsByClassName(sFooter.container)[0];
      const header = document.getElementsByClassName(sHeader.root)[0];

      if (!header.classList.toString().includes(s.hide))
        header.classList.add(s.hide);

      if (!footer.classList.toString().includes(s.hide))
        footer.classList.add(s.hide);

      setTimeout(() => {
        this.setState({
          showHeaderAndFooter: !showHeaderAndFooter
        })
      }, 400)
    }
    else {
      this.setState({
        showHeaderAndFooter: !showHeaderAndFooter
      })
    }
  }

  onSwipeRight (currentImageIndex) {
    if (currentImageIndex !== 0) {
      this.setState({
        showDetailImage: images[currentImageIndex-1]
      })
    }
  }

  onSwipeLeft (currentImageIndex) {
    if (currentImageIndex !== images.length - 1) {
      this.setState({
        showDetailImage: images[currentImageIndex+1]
      })
    }
  }

  render() {
    const { showDetail, showDetailImage, showHeaderAndFooter } = this.state;
    let cx = classnames.bind(s);

    return (
      <div>
        { showHeaderAndFooter &&
          <Header
            title={showDetail ? showDetailImage.title : "Image Gallery"}
            isDismissable={showDetail && showHeaderAndFooter} 
            handleDismiss={this.handleDismiss.bind(this)} />
        }
        <section className={cx({root: true, blackBg: showDetail})}>
          <div className={cx({container: true, blackBg: showDetail})} >
            {showDetail && 
              <Detail 
                image={showDetailImage}
                onSwipeRight={this.onSwipeRight.bind(this)}
                onSwipeLeft={this.onSwipeLeft.bind(this)} 
                onClick={this.toggleHeaderAndFooter.bind(this)} />
            }
            {!showDetail &&
              <Grid 
                images={images} 
                showImage={this.showImage.bind(this)} />
            }
            {showDetail && showHeaderAndFooter &&
              <Footer />
            }
          </div>
        </section>
      </div>
    );
  } 
}

export default withStyles(s)(Home);
