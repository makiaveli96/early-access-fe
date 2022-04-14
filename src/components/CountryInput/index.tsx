import React from 'react';
import styles from './styles.module.css';
import countryList from '../../utils/countries'

interface PropsI {
    label: string;
    value: string;
    setValue: any;
    onChange: any;
    key: any;
    placeholder?: string
}

export default function CountryInput({ label, placeholder, value, key, setValue, onChange }: PropsI){

    function SearchCountry(val: string){
        const result = countryList.filter(country=>{
            return country.toLowerCase().indexOf(val.toLowerCase()) !== -1
        })
    }

    return(
        <div key={key} className={styles.main}>
            <label className={styles.label}>SAERCH HERE</label>
            <input 
            key={key}
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                className={styles.input_field} 
            />
            <div className={styles.search_result}>

            </div>
        </div>
    )
}