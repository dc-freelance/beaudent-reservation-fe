import React from 'react';
import Select from 'react-select';

import '../styles/component-styles/input-group.css';

const InputGroup = (props) => {
    const selectThemes = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(250, 250, 250)',
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

    return (
        <div className='input-group'>
            <label>{props.name}{props.mark}</label>
            {
                props.type === 'select' &&
                <Select
                    className='basic-single'
                    classNamePrefix='select'
                    isSearchable='true'
                    name={props.key}
                    options={props.options}
                    placeholder={props.placeholder}
                    noOptionsMessage={() => 'Opsi Tidak Ditemukan'}
                    styles={selectThemes} />
            }
            {
                props.type === 'textarea' && <textarea></textarea>
            }
            {
                props.type !== 'select' && props.type !== 'textarea' && <input type={props.type} placeholder={props.placeholder} />
            }
        </div>
    );
};


export default InputGroup;