import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import OptionBox from '../components/OptionBox';
import ErrorBox from '../components/ErrorBox';

const VisitStatus = () => {
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
                <button className='back-btn' onClick={() => navigate('/')}>Kembali</button>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    <div className='content'>
                        <p className='question'>Sudah pernah mendaftar di Beaudent?</p>
                        <div className='option-group'>
                            <button onClick={() => navigate('/services')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/new-patient-images.png')} value='Belum Pernah' alt='Belum Pernah' />
                            </button>
                            <button onClick={() => navigate('/credential')} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/member-images.png')} value='Sudah Pernah' alt='Sudah Pernah' />
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

export default VisitStatus;