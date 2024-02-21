import React from 'react'

const NotFound = () => {
    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='not-found'>
                <img src={require('../assets/images/not-found.png')} alt='not-found' draggable='false' />
            </div>
        </div>
    );
};

export default NotFound;
