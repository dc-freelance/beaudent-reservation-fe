import React from 'react';

import '../styles/component-styles/input-group.css';

const InputGroup = (props) => {
    return (
        <div className='input-group'>
            <label>{props.name}{props.mark}</label>
            {
                props.type === 'textarea' ?
                    <textarea></textarea>
                    :
                    <input type={props.type} placeholder={props.placeholder} />
            }
        </div>
    );
};


export default InputGroup;