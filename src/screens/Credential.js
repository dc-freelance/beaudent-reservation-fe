import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorBox from '../components/ErrorBox';

const Credential = () => {
    const navigate = useNavigate();
    const [creds, setCreds] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(0);
    const [searchCreds, setSearchCreds] = useSearchParams();

    const login = async (param_creds = '') => {
        setLoading(1);
        if (creds != '') {
            param_creds = creds;
        };
        await axios.post(`${process.env.REACT_APP_API_URL}customer`, {
            creds: param_creds
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            setLoading(0);
            if (result.data.error) {
                setError(result.data.error.creds);
            } else {
                if (result.data.customer) {
                    if (result.data.customer.reservations[0]) {
                        navigate('/menu', {
                            state: {
                                member: true,
                                creds: result.data.customer.phone_number
                            }
                        });
                    } else {
                        navigate('/services', {
                            state: {
                                member: true,
                                creds: result.data.customer.phone_number
                            }
                        });
                    };
                } else {
                    setError('Pengguna Tidak Ditemukan');
                };
            };
        }).catch(err => {
            console.log(err);
            setLoading(0);
            setError('Terjadi Masalah Saat Mengirim Data');
        });
    };

    const checkRes = async (noRes) => {
        setLoading(1);
        await axios.get(`${process.env.REACT_APP_API_URL}search-res/${noRes}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            setLoading(0);
            if (result.data.reservation) {
                navigate('/reservation', {
                    state: {
                        reservation: noRes,
                        member: true,
                        creds: result.data.reservation.customers.phone_number
                    }
                });
            } else {
                setError('Reservasi Tidak Valid');
            };
        }).catch(err => {
            console.log(err);
            setLoading(0);
            setError('Terjadi Masalah Saat Mengirim Data');
        });
    };

    const isBase64 = (str) => {
        if (str === '' || str.trim() === '') {
            return false;
        };

        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        };
    };

    useEffect(() => {
        // searchCreds.get('creds') && login(isBase64(searchCreds.get('creds')) === true ? atob(searchCreds.get('creds')) : searchCreds.get('creds'));
        searchCreds.get('no') && checkRes(isBase64(searchCreds.get('no')) === true ? atob(searchCreds.get('no')) : searchCreds.get('no'));
    }, []);

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <button className='back-btn' onClick={() => navigate('/reservasi')}>Kembali</button>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    <div className='content creds'>
                        <p className='question'>Nomor Whatsapp atau Email Anda</p>
                        <input className='creds-input' placeholder='example@mail.com' autoComplete='off' onChange={event => setCreds(event.target.value)} />
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
            <div className={`modal loading ${loading === 1 && 'active'}`}>
                <div className='spinner'>
                    <box-icon type='regular' name='loader-circle' size='48px' color='rgb(255, 116, 142)'></box-icon>
                </div>
            </div>
        </div>
    );
};

export default Credential;