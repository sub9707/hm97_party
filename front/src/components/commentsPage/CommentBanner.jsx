import React from 'react'
import styles from './CommentBanner.module.scss';

function CommentBanner() {
  return (
    <div className={styles.BannerBox}><span className={styles.star}>☆</span> <span className={styles.first}>우리끼리 </span> <span className={styles.second}>한마디</span> <span className={styles.star}>☆</span></div>
  )
}

export default CommentBanner