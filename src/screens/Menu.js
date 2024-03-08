import React, { useEffect, useState } from 'react';
import ErrorBox from '../components/ErrorBox';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Menu = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [user, setUser] = useState('');
    const [data, setData] = useState([]);
    const [notif, setNotif] = useState('');

    const checkMember = () => {
        if (state) {
            const { message, creds } = state;
            setNotif(message);
            setUser(creds);
        } else {
            navigate('/credential');
        };
    };

    const setUserData = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}customer`, {
            creds: user
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            setData(result.data.customer);
        }).catch(err => { });
    };

    useEffect(() => {
        checkMember();
        user != '' && setUserData();
    }, [user]);

    const List = ({ data }) => {
        return (
            <div className='reservation-box'>
                <div className='header'>
                    <div>
                        <h1>{data.no}</h1>
                        {
                            data.status == 'Pending' &&
                            <p className='wait'>
                                <span></span>
                                Menunggu Konfirmasi
                            </p>
                        }
                        {
                            data.status == 'Waiting Deposit' &&
                            <p className='wait'>
                                <span></span>
                                Menunggu Pembayaran
                            </p>
                        }
                        {
                            data.status == 'Pending Deposit' &&
                            <p className='wait'>
                                <span></span>
                                Menunggu Konfirmasi Deposit
                            </p>
                        }
                        {
                            data.status == 'Cancel' &&
                            <p className='fail'>
                                <span></span>
                                Dibatalkan
                            </p>
                        }
                        {
                            data.status == 'Confirm' || data.status == 'Examination' || data.status == 'Billing' || data.status == 'Done' ?
                                <p className='success'>
                                    <span></span>
                                    Dikonfirmasi
                                </p>
                                :
                                null
                        }
                    </div>
                    <div>
                        <button onClick={() => navigate('/reservation', {
                            state: {
                                reservation: data.no,
                                member: true,
                                creds: user
                            }
                        })}>Detail</button>
                    </div>
                </div>
                <div className='footer'>
                    <div className='location'>
                        <box-icon type="regular" name="current-location" size="16px" color="rgb(150, 150, 150)"></box-icon>
                        {data.branches.name}
                    </div>
                    {data.request_date}
                </div>
            </div>
        );
    };

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer menu'>
                <button className='back-btn' onClick={() => navigate('/credential')}>Kembali</button>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    {/* <div className='content creds'>
                        <p className='question'>Nomor Whatsapp atau Email Anda</p>
                        <input className='creds-input' placeholder='example@mail.com' autoComplete='off' onChange={event => setCreds(event.target.value)} />
                        <button className='form-button' onClick={login}>Lanjutkan</button>
                    </div> */}
                    <div className='user-menu'>
                        <div className='reservation-list'>
                            {
                                data && data.reservations ? data.reservations.map((value, index) => {
                                    return <List data={value} key={index} />
                                })
                                    :
                                    <div className='reservation-skeleton'>
                                        <div className='skeleton'></div>
                                    </div>
                            }
                        </div>
                        <button className='reservation-box' onClick={() => navigate('/services', {
                            state: {
                                menu: true,
                                member: true,
                                creds: user
                            }
                        })}>
                            <div>
                                <h1>
                                    <box-icon type='regular' name='plus' size='24px' color='rgb(255, 255, 255)'></box-icon>
                                    Tambah Reservasi Baru
                                </h1>
                            </div>
                        </button>
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
        </div >
    );
};

export default Menu;