import React from 'react';
import OptionBox from '../components/OptionBox';

const Index = () => {
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
                        <p className='question'>Sudah pernah reservasi di Beaudent?</p>
                        <div className='option-group'>
                            <OptionBox img={require('../assets/images/new-patient-images.png')} value='Belum Pernah' />
                            <OptionBox img={require('../assets/images/member-images.png')} value='Sudah Pernah' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;