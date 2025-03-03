import React from 'react';

import { NavButton } from '../button.jsx';
import styles from './index.module.css';

function ImageCard(props) {
  return (
    <section className={styles.imgCard}>
      <h3>{props.text}</h3>
      <img src={props.imageURL} alt={props.text} />
      <div className={styles.cardBg}></div>
      <NavButton text="View Recipe" location={props.location} />
    </section>  
  );
}

export { ImageCard }