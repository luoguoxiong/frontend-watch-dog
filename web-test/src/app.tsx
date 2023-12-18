import React from 'react';
import logo from '@/src/static/logo.svg';
import styles from '@/src/app.module.less';
import './app.css';

function App() {
  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <img
          src={logo}
          className={styles['App-logo']}
          alt="logo" />
        <p>
          Edit <code>src/app.js</code> and save to reload.
        </p>
        <a
          className={styles['App-link']}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
