import React, { Props } from 'react';
import styles from './styles.module.css';
import { CircularProgress } from '@mui/material';


interface PropsI {
    bgColor: string;
    height: string;
    width: string;
    text: string;
    onClick?: ()=>void;
    textColor?: string;
    disabled?: boolean;
    iconUri?: string;
    style?: any;
    loading?: boolean
}

export default function Button({ bgColor, height, width, text, textColor, style, disabled, onClick, iconUri, loading }: PropsI){
    return (
        <button onClick={onClick} disabled={disabled || false} 
            style={{ 
                backgroundColor: bgColor, 
                opacity: disabled? 0.2:1, 
                fontWeight: 'bold', 
                color: textColor || 'white', 
                height, 
                width, 
                borderRadius: '8px', 
                border: '0px',
                display: 'flex',
                alignItems: "center",
                justifyContent: 'center',
                cursor: disabled? 'not-allowed':'pointer',
                ...style
            }}
        >
            {text}
            {iconUri && (
                <img src={iconUri} style={{marginLeft: '15px'}} alt="icon" />
            )}
            {loading && (
                <span style={{marginLeft: '10px'}}>
                    <CircularProgress style={{color: 'white'}} size={20} />
                </span>
            )}
            
        </button>
    )
}