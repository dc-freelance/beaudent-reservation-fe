import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputGroup from '../components/InputGroup';
import OptionBox from '../components/OptionBox';
import DataLabel from '../components/DataLabel';

const Forms = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(1);
    const [title, setTitle] = useState('Daftarkan Diri Anda');
    const [inputInfo, setInputInfo] = useState('*Pisahkan tempat dan tanggal kelahiran dengan tanda koma');

    //Static options for select

    const religion = [
        { label: 'Islam', value: 'islam' },
        { label: 'Kristen Protestan', value: 'kristen protestan' },
        { label: 'Katolik', value: 'katolik' },
        { label: 'Hindu', value: 'hindu' },
        { label: 'Buddha', value: 'buddha' },
        { label: 'Konghucu', value: 'konghucu' }
    ];

    const gender = [
        { label: 'Laki-laki', value: 'laki-laki' },
        { label: 'Perempuan', value: 'perempuan' }
    ];

    const maritalStatus = [
        { label: 'Belum Menikah', value: 'belum menikah' },
        { label: 'Menikah', value: 'menikah' },
        { label: 'Cerai Hidup', value: 'cerai hidup' },
        { label: 'Cerai Mati', value: 'cerai mati' },
        { label: 'Janda/Duda', value: 'janda/duda' }
    ];


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


        if (form === 4) {
            setTitle('Formulir Reservasi')
        };

    }, [form]);

    // 3 Difference forms

    const Profile = () => {
        return (
            <div className='form-body'>
                <InputGroup name='Nomor Identitas' type='number' placeholder='Nomor Kartu Identitas' />
                <InputGroup name='Nama' type='text' placeholder='Masukkan Nama Anda' />
                <InputGroup name='Tempat Tanggal lahir' type='text' placeholder='Contoh: Kota, 26-12-2000' mark='*' />
                <InputGroup name='Jenis Kelamin' type='select' placeholder='Pilih Jenis Kelamin' options={gender} />
                <InputGroup name='Agama' type='select' placeholder='Pilih Agama' options={religion} />
                <InputGroup name='Status Pernikahan' type='select' placeholder='Pilih Status Pernikahan' options={maritalStatus} />
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

    const Reservation = () => {
        return (
            <div className='reservation-session'>
                <div className='section'>
                    <h3>Data Diri Anda</h3>
                    <div className='form-body'>
                        <DataLabel label='Nomor Identitas' data='3511110802010002' />
                        <DataLabel label='Nama' data='Chelo Tasnim Haryono' />
                        <DataLabel label='Tempat Tanggal Lahir' data='Surabaya, 7 Januari 2001' />
                        <DataLabel label='Jenis Kelamin' data='Laki-Laki' />
                        <DataLabel label='Agama' data='dummydata' />
                        <DataLabel label='Status Pernikahan' data='Belum Menikah' />
                        <DataLabel label='Nomor Telepon' data='+62 852-1124-9982' />
                        <DataLabel label='Alamat Email' data='dummy@gmail.com' />
                        <DataLabel label='Alamat Rumah' data='Jalan Maju Terus Pantang Mundur No. 200' />
                    </div>
                </div>
                <div className='section'>
                    <h3>Reservasi</h3>
                    <div className='form-body'>
                        <InputGroup name='Cabang Klinik' type='select' placeholder='Pilih Cabang' options={[{ label: 'Surabaya', value: 'surabaya' }]} />
                        <InputGroup name='Layanan' type='select' placeholder='Pilih Layanan' options={[{ label: 'Tambal Gigi', value: 'tambal gigi' }]} />
                        <InputGroup name='Waktu Kunjungan' type='datetime' placeholder='Atur Tanggal dan Jam' />
                    </div>
                </div>
                <div className='section'>
                    <h3>Pembayaran Deposit</h3>
                    <div className='form-body'>
                        <InputGroup name='Bank Pengirim' type='select' placeholder='Pilih Bank' options={[{ label: 'BRI', value: 'bri' }]} />
                        <InputGroup name='Nama Rekening' type='text' placeholder='Nama Rekening Bank' />
                        <InputGroup name='Jumlah Deposit' type='number' placeholder='Rp' />
                        <InputGroup name='Tanggal Pembayaran' type='date' placeholder='Atur Tanggal' />
                        <InputGroup name='Bukti Pembayaran' type='file' placeholder='Unggah Bukti' />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className='page'>
            <div className='semantic-bg top'></div>
            <div className='semantic-bg bottom'></div>
            <div className='layer'>
                <div className='form-session'>
                    {
                        form < 4 ?
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
                            :
                            <header>
                                <h2 className='form-title'>{title}</h2>
                                <p>Mohon periksa kembali data formulir reservasi anda</p>
                                <img src={require('../assets/images/logo.jpg')} alt='Beaudent Logo' draggable='false' />
                            </header>
                    }
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
                    {form === 4 && <Reservation />}

                    <div className='form-footer'>
                        <p>{inputInfo}</p>
                        {
                            form === 4 &&
                            <div className='payment-info'>
                                <label>Rekening Pembayaran</label>
                                <p>BCA : 3500120201020 (Beaudent)</p>
                            </div>
                        }

                    <div className='form-footer'>
                        <p>{inputInfo}</p>
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                form > 1 ? setForm((prev) => prev - 1) : navigate('/services')
                            }}>Kembali</button>

                            <button className={`form-button ${form === 4 && 'on'}`} onClick={() => {
                                form < 4 && setForm((prev) => prev + 1)

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
