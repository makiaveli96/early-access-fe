import React, { useEffect, useState } from 'react'
import Chip from '@mui/material/Chip';
import styles from './styles.module.css';
import { Icon } from '@iconify/react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';

interface PropsI {
  highlights: Array<{name: string}>;
  allItems: Array<any>;
  selected: Array<{name: string}>;
  setSelected: any;
  placeholder?: string;
}

{/* <Chip key={index} variant="outlined" style={{backgroundColor: '#F2F2F2'}} label={option} */}
function ChipSelectorInput({ highlights, allItems, selected, setSelected, placeholder }: PropsI) {

  // const [selected, setSelected] = useState([]);
  const [inputVal, setInputVal] = useState<any | null>('')
  const [dropdownResult, setDropdownResult] = useState([]);
  const [arrayToRender, setArrayToRender] = useState<any | null>([])
  const filter = createFilterOptions<any>();

  console.log(dropdownResult.length, ' l---length')

  function checkSelected(option){
    let isSelected: boolean;
    var found = selected.find(item=>item.name == option.name)
    if(found){
      isSelected = true;
    }else{
      isSelected = false
    }
    return isSelected
  }

  // const handleCountry=(e, val)=>{
  //   setSupportedCountries(val)
  // }

  function selectItem(option){
    const re = /^[0-9\b]+$/;
    if(re.test(option.name)) {
      return null
    }
    setSelected((prev)=>{
      const isExists = selected.find(item=>item.name.toLowerCase() == option.name.toLowerCase());
      // const 
      if(isExists){
        const newItems = selected.filter(item=>item.name.toLowerCase() !== option.name.toLowerCase());
        return [...newItems]        
      }else{
        return [...prev, { name: option.name }]
      }
    })
    setInputVal('');
    setDropdownResult([])
  }

  function handleSearch(val){
      var filter = allItems.filter(item => {
        return item.name.toLowerCase().indexOf(val.toLowerCase()) !== -1
      })
    setDropdownResult(filter)
    setInputVal(val)
  }

  function rendeArray(){

    let result = [...selected, ...highlights].filter(function({name}) {
      return !this.has(name) && this.add(name);
    }, new Set)

    console.log(result, ' result--')
    setArrayToRender(result)
  }

  useEffect(()=>{
    rendeArray()
  },[selected])

  useEffect(()=>{
    if(inputVal.length == 0){
      setDropdownResult([])
    }
  },[inputVal])

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <TextField
        id="outlined-address"
        placeholder={placeholder}
        autoComplete='new-password'
        style={{width: '100%'}}
        value={inputVal}
        onChange={e=>handleSearch(e.target.value)}
      />
      {dropdownResult?.length > 0 && (
        <div className={styles.dropdown}>
          {dropdownResult.map(option=>(
          <MenuItem key={option.name} onClick={()=>selectItem(option)} value={option.name}>
            {option.name}
          </MenuItem>
          ))}
        </div>
      )}
{/* 
      {inputVal.length > 1 && dropdownResult?.length == 0 && (
        <div className={styles.dropdown}>
          <MenuItem key={0} onClick={()=>selectItem({ name: inputVal })} value={inputVal}>
            Add <span style={{fontStyle: 'italic', color: '#475569', marginLeft: '5px'}}>'{inputVal}'</span>
          </MenuItem>
        </div>
      )} */}
     
      <div style={{width: '100%', height: 'auto', display: 'flex', flexWrap: 'wrap', marginBottom: '20px'}}>
        {arrayToRender.map((option, i)=>(
          <> 
            {checkSelected(option)?(
              <span key={i} onClick={()=>selectItem(option)} className={styles.chip_selected}>
                <span style={{marginRight: '5px'}}>{option.name}</span>
                <Icon icon="ic:sharp-cancel" color="#F57A00" height="20px" width="20px" />
              </span>
            ):(
              <span key={i} onClick={()=>selectItem(option)} className={styles.chip}>{option.name}</span>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

export default ChipSelectorInput