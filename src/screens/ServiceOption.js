import React from 'react';
import OptionBox from '../components/OptionBox';

const ServiceOption = () => {
    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    <div className='content'>
                        <p className='question'>Apa yang bisa kami bantu untuk anda?</p>
                        <div className='option-group'>
                            <OptionBox img={require('../assets/images/examination-images.png')} value='Perawatan' />
                            <OptionBox img={require('../assets/images/check-up-images.png')} value='Kontrol' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceOption;