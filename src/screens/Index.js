import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OptionBox from '../components/OptionBox';
import ErrorBox from '../components/ErrorBox';

const Index = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [notif, setNotif] = useState('');

    const checkSession = () => {
        if (state) {
            const { message } = state;
            setNotif(message);
        };
    };

    useEffect(() => {
        checkSession();
    }, []);

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
                        <p className='question'>Apa yang anda inginkan?</p>
                        <div className='option-group'>
                            <button onClick={() => navigate('/reservasi')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/examination-images.png')} value='Pemeriksaan' alt='Pemeriksaan' />
                            </button>
                            <button onClick={() => navigate('/credential')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/reservation-card.png')} value='Cek Reservasi' alt='Cek Reservasi' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='error-container'>
                {
                    notif &&
                    <button className='remove-error-button' onClick={() => setNotif('')}>
                        <ErrorBox message={notif} />
                    </button>
                }
            </div>
        </div>
    );
};

export default Index;