import React from 'react';
import styles from './styles.module.css';

interface PropsI {
    label: string;
    placeholder?: string
}

export default function FormInput({ label, placeholder }: PropsI){
    return(
        <div className={styles.main}>
            <label className={styles.label}>{label}</label>
            <input placeholder={placeholder} className={styles.input_field} />
        </div>
    )
}