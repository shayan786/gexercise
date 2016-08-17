import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import share from './share.png';
import add from './add.png';
import like from './like.png';
import comment from './comment.png';

function Footer () {
  return (
    <div className={s.container}>
      <img className={s.icon} src={like} alt="Like" title="Like" onClick={() => alert('Liked!')}/>
      <img className={s.icon} src={comment} alt="Comment" title="Comment" onClick={() => alert('Comment!')}/>
      <img className={s.icon} src={add} alt="Add" title="Add" onClick={() => alert('Add!')}/>
      <img className={s.icon} src={share} alt="Share" title="Share" onClick={() => alert('Share!')}/>
    </div>
  );
}

export default withStyles(s)(Footer);
