import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Exp.css';

const title = 'Shy - Google Exercise';

class Exp extends Component {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.setTitle(this.props.title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h2> Google Exercise </h2>
          <h3> Actions Available </h3>
          <ul>
            <li className={s.li}> Click Image Icon </li>
            <li className={s.li}> Click Image in Detail View to Hide Header / Footer </li>
            <li className={s.li}> Swipe Left/Right in Detail View </li>
            <li className={s.li}> X To exit Detail View </li>
          </ul>
          <h3> What I Used </h3>
          <h3> Design Choices & Process </h3>
          <ul>
            <li className={s.li}> A quick study of existing well built photo galleries which included google photos, flikr, facebook, dropbox, & shutterstock. </li>
            <li className={s.li}> Majority simply utilize animation through cheap browser resources: opacity (fading) or tranlsation (movement) for performance reasons but also intuitive clean experience. </li>
            <li className={s.li}> The most concerning animation to me was the relationship between selecting or clicking a image from the grid view and conveying to the user that what you clicked is what the detail view will show. </li>
          </ul>
          <h3> What I Used </h3>
          <ul>
            <li className={s.li}> I like to start off most projects with <a href="http://yeoman.io/" target="_blank">yeoman</a> generator.</li>
            <li className={s.li}> Node.js </li>
            <li className={s.li}> Express </li>
            <li className={s.li}> React </li>
            <li className={s.li}> Webpack </li>
            <li className={s.li}> Babel </li>
            <li className={s.li}> CSS Modules </li>
            <li className={s.li}> BrowserSync (dev.) </li>
          </ul>
          <h3> Get it Running (Dev) </h3>
          <ul>
            <li className={s.li}> Must use node v5+, npm v3.3+</li>
            <li className={s.li}> npm install </li>
            <li className={s.li}> npm start </li>
            <li className={s.li}> localhost:3001 </li>
            <li className={s.li}> npm run build (only for production build) </li>
          </ul>
          <br />
          <h3> Hope ya'll think is passable, thanks for taking the time!! </h3>
        </div>
      </div>
    );
  } 
}

export default withStyles(s)(Exp);
