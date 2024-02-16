import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorBox from '../components/ErrorBox';

const Credential = () => {
    const navigate = useNavigate();
    const [creds, setCreds] = useState('');
    const [error, setError] = useState('');

    const login = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}customer`, {
            creds: creds
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            if (result.data.error) {
                setError(result.data.error.creds);
            } else {
                if (result.data.customer) {
                    navigate('/services', {
                        state: {
                            member: true,
                            creds: result.data.customer.phone_number
                        }
                    });
                } else {
                    setError('Pengguna Tidak Ditemukan');
                };
            };
        }).catch(err => console.log(err));
    };

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
                        <input className='creds-input' placeholder='example@gmail.com' autoComplete='off' onChange={event => setCreds(event.target.value)} />
                        <button className='form-button' onClick={login}>Lanjutkan</button>
                    </div>
                </div>
            </div>
            <div className='error-container'>
                {
                    error &&
                    <button className='remove-error-button' onClick={() => setError('')}>
                        <ErrorBox message={error} />
                    </button>
                }
            </div>
        </div>
    );
};

export default Credential;