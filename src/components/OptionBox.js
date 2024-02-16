import React from 'react';

import '../styles/component-styles/box-option.css';

const OptionBox = (props) => {
    return (
        <div className={`box-option ${props.active === true && 'active'}`}>
            <div className='icon'>
                <img src={props.img} draggable='false' />
            </div>
            <p>{props.value}</p>
        </div>
    );
};

export default OptionBox;