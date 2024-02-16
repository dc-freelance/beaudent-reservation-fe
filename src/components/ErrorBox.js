import React from 'react';

import '../styles/component-styles/error-box.css';

const ErrorBox = (props) => {
    return (
        <div className='error-box'>
            <div className='icon'>
                <box-icon type='regular' name='alarm-exclamation' size='32px' color='white'></box-icon>
            </div>
            <p>{props.message}</p>
        </div>
    );
};

export default ErrorBox;