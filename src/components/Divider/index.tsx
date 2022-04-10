import React from 'react';
import styles from './styles.module.css'

interface PropsI {
    width?: string;
    type?: string;
    marginTop?: string;
    marginBottom?: string;
}

export default function Divider({ type, width, marginTop, marginBottom }: PropsI){
    return (
        <div className={styles.line} style={{ width: width || '85%', opacity: '.3', marginTop, marginBottom, }} />
    )
} 