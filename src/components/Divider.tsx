import React from 'react';

interface PropsI {
    width?: string;
    type?: string;
    marginTop?: string;
    marginBottom?: string;
}

export default function Divider({ type, width, marginTop, marginBottom }: PropsI){
    return (
        <div style={{width: width || '85%', opacity: '.3', marginTop, marginBottom, border: `.5px ${type || 'solid'} #00668F`}} />
    )
}