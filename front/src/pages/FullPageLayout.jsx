import React from 'react';
import styles from './FullPageLayout.module.scss';

function FullPageLayout({ children }) {
  return (
    <div className={styles.mainScreen}>
          {children}
    </div>
  );
}

export default FullPageLayout;