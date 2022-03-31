import React from 'react';
import styles from './styles.module.css'


export default function Countdown(){
    return(
        <div className={styles.main}>
            <div className={styles.cell}>
                <span className={styles.time}>
                    12
                </span>
                <span className={styles.label}>
                    hours
                </span>
            </div>
            <div className={styles.cell}>
                <span className={styles.time}>
                    25
                </span>
                <span className={styles.label}>
                    minutes
                </span>
            </div>
            <div className={styles.cell}>
                <span className={styles.time}>
                    45
                </span>
                <span className={styles.label}>
                    seconds
                </span>
            </div>
        </div>
    )
}