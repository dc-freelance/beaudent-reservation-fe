import React, { useEffect, useState } from 'react';
import OptionBox from '../components/OptionBox';
import { useLocation, useNavigate } from 'react-router-dom';

const ServiceOption = () => {
    const navigate = useNavigate();

    const { state } = useLocation();
    const [data, setData] = useState([]);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const [fromMenu, setFromMenu] = useState(false);

    const checkMember = () => {
        if (state) {
            const { member, creds, menu, reservation } = state;
            reservation && setData(reservation);
            setLogin(member);
            setUser(creds);
            setFromMenu(menu);
        };
    };

    useEffect(() => {
        checkMember();
    }, []);

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <button className='back-btn' onClick={() => fromMenu == true ? navigate('/menu', {
                    state: {
                        member: login,
                        creds: user
                    }
                }) : navigate('/reservasi')}>Kembali</button>
                <div className='option-session'>
                    <div className='logo'>
                        <img src={require('../assets/images/logo.jpg')} draggable='false' />
                    </div>
                    <div className='content'>
                        <p className='question'>Apa yang bisa kami bantu untuk anda?</p>
                        <div className='option-group'>
                            <button onClick={() => navigate('/reservation', {
                                state: {
                                    examination: 2,
                                    menu: fromMenu,
                                    member: login,
                                    creds: user
                                }
                            })} className='box-option-btn'>
                                <OptionBox img={require('../assets/images/examination-images.png')} value='Perawatan' alt='Perawatan' />
                            </button>
                            <button onClick={() => navigate('/reservation', {
                                state: {
                                    examination: 1,
                                    menu: fromMenu,
                                    member: login,
                                    creds: user
                                }
                            })} className='box-option-btn'>
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