import React from 'react';

import '../styles/component-styles/data-label.css';

const DataLabel = (props) => {
    return (
        <div className='data-label'>
            <label>{props.label}</label>
            <p>{props.data}</p>
        </div>
    );
};

export default DataLabel;