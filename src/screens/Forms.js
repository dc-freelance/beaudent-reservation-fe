import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../components/InputGroup';
import OptionBox from '../components/OptionBox';

const Forms = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(1);
    const [title, setTitle] = useState('Daftarkan Diri Anda');
    const [inputInfo, setInputInfo] = useState('*Pisahkan tempat dan tanggal kelahiran dengan tanda koma');

    useEffect(() => {

        // Setting Title and Message
        if (form === 1) {
            setTitle('Daftarkan Diri Anda')
            setInputInfo('*Pisahkan tempat dan tanggal kelahiran dengan tanda koma');
        };

        if (form === 2) {
            setTitle('Bagaimana Kami Menghubungi Anda?')
            setInputInfo('*Kosongkan jika tidak ada');
        };

        if (form === 3) {
            setTitle('Darimana Anda Mengetahui Kami?')
            setInputInfo('');
        };

    }, [form]);

    // 3 Difference forms

    const Profile = () => {
        return (
            <div className='form-body'>
                <InputGroup name='Nomor Identitas' type='number' placeholder='Nomor Kartu Identitas' />
                <InputGroup name='Nama' type='text' placeholder='Masukkan Nama Anda' />
                <InputGroup name='Tempat Tanggal lahir' type='text' placeholder='Contoh: Kota, 26-12-2000' mark='*' />
                <InputGroup name='Jenis Kelamin' type='text' placeholder='Pilih Jenis Kelamin' />
                <InputGroup name='Agama' type='text' placeholder='Pilih Agama' />
                <InputGroup name='Status Pernikahan' type='text' placeholder='Pilih Status Pernikahan' />
            </div>
        );
    };

    const Contact = () => {
        return (
            <div className='form-body'>
                <div className='form-col'>
                    <InputGroup name='Nomor Telepon' type='number' placeholder='No Telepon / Whatsapp' />
                    <InputGroup name='Alamat Email' type='text' placeholder='Masukkan Email Anda' />
                    <InputGroup name='Akun Instagram' type='text' placeholder='Username Akun Anda' mark='*' />
                    <InputGroup name='Akun Youtube' type='text' placeholder='Username Akun Anda' mark='*' />
                </div>
                <div className='form-col'>
                    <InputGroup name='Alamat Rumah' type='textarea' />
                </div>
            </div>
        );
    };

    const BeudentInfo = () => {
        return (
            <div className='option-group'>
                <button className='box-option-btn'>
                    <OptionBox img={require('../assets/images/google.jpg')} value='Browser' />
                </button>
                <button className='box-option-btn'>
                    <OptionBox img={require('../assets/images/instagram.png')} value='Instagram' />
                </button>
                <button className='box-option-btn'>
                    <OptionBox img={require('../assets/images/others.png')} value='Lainnya' />
                </button>
            </div>
        );
    };

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <div className='form-session'>
                    <header>
                        <h2 className='form-title'>{title}</h2>

                        {/* Form step progress */}
                        <div className='progress'>
                            <div className={`point ${form > 0 && 'reached'}`}></div>
                            <div className={`point ${form > 1 && 'reached'}`}></div>
                            <div className={`point ${form > 2 && 'reached'}`}></div>
                            <div className={`line ${form === 1 && 'first'} ${form === 2 && 'second'} ${form === 3 && 'third'}`}></div>
                        </div>
                    </header>

                    {/* Template for the each form */}
                    {form === 1 && <Profile />}
                    {form === 2 && <Contact />}
                    {form === 3 && <BeudentInfo />}

                    <div className='form-footer'>
                        <p>{inputInfo}</p>
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                form > 1 ? setForm((prev) => prev - 1) : navigate('/services')
                            }}>Kembali</button>

                            <button className='form-button' onClick={() => {
                                form < 3 && setForm((prev) => prev + 1)
                            }}>Berikutnya</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forms;
