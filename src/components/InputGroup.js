import React, { useState } from 'react';
import Select from 'react-select';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';

import '../styles/component-styles/input-group.css';

const InputGroup = (props) => {
    const selectThemes = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(255, 255, 255)',
            borderRadius: 'none',
            border: 'none',
            borderBottom: '2px solid rgb(235, 235, 235)',
            borderColor: state.isFocused ? 'none' : 'none',
            boxShadow: state.isFocused ? 'none' : 'none',
            '&:hover': {
                border: 'none',
                borderBottom: '2px solid rgb(235, 235, 235)',
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgb(180, 180, 180)'
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'rgb(235, 235, 235)' : 'white',
            '&:hover': {
                backgroundColor: 'rgb(245, 245, 245)'
            },
            color: state.isSelected ? 'rgb(100, 100, 100)' : 'rgb(100, 100, 100)'
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'rgb(100, 100, 100)'
        })
    };

    const handleSelect = (selectedOption) => {
        props.set([selectedOption ? props.options.indexOf(selectedOption) : null, selectedOption ? selectedOption.value : null]);
    };



    // Limit Input Hours
    const [selectedTime, setSelectedTime] = useState(new Date());
    const { startOfHour, setHours, setMinutes, parse, format } = require('date-fns');
    const start = startOfHour(setHours(new Date(), 9));
    const end = setMinutes(setHours(new Date(), 20), 30);



    return (
        <div className='input-group'>
            <label>{props.name}{props.mark}</label>
            {
                props.type === 'select' &&
                <Select
                    className='basic-single'
                    classNamePrefix='select'
                    isSearchable={true}
                    name={props.name}
                    options={props.options}
                    placeholder={props.placeholder}
                    noOptionsMessage={() => 'Opsi Tidak Ditemukan'}
                    styles={selectThemes}
                    defaultValue={props.options[props.index]}
                    onChange={handleSelect}
                />

            }
            {
                props.type === 'textarea' &&
                <textarea
                    onChange={event => props.set(event.target.value)}
                    defaultValue={props.value}
                    placeholder={props.placeholder}
                ></textarea>
            }
            {
                props.type === 'file' &&
                <>
                    <input
                        type={props.type}
                        accept='image/jpeg, image/png'
                        placeholder={props.placeholder}
                        onChange={event => props.set(event.target.files[0])}
                    />
                    <label>{props.label}</label>
                </>
            }
            {
                props.type === 'time' &&
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileTimePicker
                        value={selectedTime}
                        minTime={start}
                        maxTime={end}
                        ampm={false}
                        onChange={time => {
                            const formattedTime = format(time, 'HH:mm');
                            setSelectedTime(time);
                            props.set(formattedTime);
                        }}
                    />
                </LocalizationProvider>
            }
            {
                props.type !== 'select' && props.type !== 'textarea' && props.type !== 'file' && props.type !== 'time' &&
                <input
                    type={props.type}
                    placeholder={props.placeholder}
                    defaultValue={props.value}
                    onChange={event => props.set(event.target.value)}
                />
            }
        </div>
    );
};


export default InputGroup;