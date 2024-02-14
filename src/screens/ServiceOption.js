import React from 'react';
import OptionBox from '../components/OptionBox';
import { useNavigate } from 'react-router-dom';

const ServiceOption = () => {
    const navigate = useNavigate();

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <button className='back-btn' onClick={() => navigate('/')}>Kembali</button>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    <div className='content'>
                        <p className='question'>Apa yang bisa kami bantu untuk anda?</p>
                        <div className='option-group'>
                            <button onClick={() => navigate('/reservation')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/examination-images.png')} value='Perawatan' alt='Perawatan' />
                            </button>
                            <button onClick={() => navigate('/reservation')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/check-up-images.png')} value='Kontrol' alt='Kontrol' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceOption;