import React from 'react'
import styles from './Header.module.scss'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { SLICE_NAMES } from '../../constants/enums';

const Header = () => {
  const APPUSER = useSelector(state => state[SLICE_NAMES.USER]);
  const navigate = useNavigate();
  return (
    <div className= {styles.header}>
        <div className={styles.logo}>
            <img src="../../../src/assets/logo.svg" alt="logo" draggable = "false"/>
            <p>WeTube</p>
        </div>
        <div className= {styles.search}>
            <div className={styles.searchBox}>
              <img src="../../../src/assets/search-lg.svg" alt="search" draggable = "false"/>
              <input type="text" placeholder='Search'/>
            </div>
        </div>
        <div className={styles.authControls}>
          {APPUSER ? (
            <img src={APPUSER?.user?.avatar} alt="avatar"/>
          ) : (
            <>
            <button className={styles.signIn} onClick = {()=>navigate('/login')}>Sign in</button>
          <button className={styles.signUp} onClick = {()=>navigate('/register')}>Sign up</button>
            </>
          )}
        </div>
    </div>
  )
}

export default Header