import React from 'react';
import styles from './DefaultPageLayout.module.scss';

function DefaultPageLayout({ children }) {
  return (
    <div className={styles.mainScreen}>
      {children}
    </div>
  );
}

export default DefaultPageLayout;
