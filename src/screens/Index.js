import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OptionBox from '../components/OptionBox';

const Index = () => {
    const navigate = useNavigate();

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
        </div>
    );
};

export default Index;