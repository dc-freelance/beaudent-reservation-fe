import React from 'react';
import { useNavigate } from 'react-router-dom';

const Credential = () => {
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
                    <div className='content creds'>
                        <p className='question'>Nomor Whatsapp atau Email Anda</p>
                        <input className='creds-input' placeholder='example@gmail.com' autoComplete='off' />
                        <button className='form-button' onClick={() => navigate('/services')}>Lanjutkan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Credential;