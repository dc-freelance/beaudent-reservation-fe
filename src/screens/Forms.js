import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import InputGroup from '../components/InputGroup';
import OptionBox from '../components/OptionBox';
import DataLabel from '../components/DataLabel';

import 'boxicons';

const Forms = () => {
    const navigate = useNavigate();

    // Examination or Check Up

    const { state } = useLocation();
    const [exam, setExam] = useState(0);
    const [login, setLogin] = useState(false);

    const checkService = () => {
        if (state) {
            const { examination } = state;
            setExam(examination);

            const { member } = state;
            member === true && setForm(4);
            setLogin(member);
        } else {
            navigate('/services');
        };
    };

    // Text for each form

    const [form, setForm] = useState(1);
    const [title, setTitle] = useState('Daftarkan Diri Anda');
    const [inputInfo, setInputInfo] = useState('');
    const [modal, setModal] = useState(0);
    const [agree, setAgree] = useState(0);

    // Static options for select

    const religion = [
        { label: 'Islam', value: 'Islam' },
        { label: 'Kristen Protestan', value: 'Kristen Protestan' },
        { label: 'Katolik', value: 'Katolik' },
        { label: 'Hindu', value: 'Hindu' },
        { label: 'Buddha', value: 'Buddha' },
        { label: 'Konghucu', value: 'Konghucu' }
    ];

    const gender = [
        { label: 'Laki-laki', value: 'Male' },
        { label: 'Perempuan', value: 'Female' }
    ];

    const maritalStatus = [
        { label: 'Belum Menikah', value: 'Single' },
        { label: 'Menikah', value: 'Married' },
        { label: 'Kawin Cerai', value: 'Divorved' },
    ];

    // User input group by form types

    const [profile, setProfile] = useState({
        identity_number: '',
        name: '',
        place_of_birth: '',
        date_of_birth: '',
        religion: ['', ''],
        gender: ['', ''],
        marrital_status: ['', ''],
        occupation: '',
    });

    const [contact, setContact] = useState({
        phone_number: '',
        email: '',
        instagram: '',
        facebook: '',
        youtube: '',
        address: '',
    });

    const [sourceInfo, setSourceInfo] = useState([]);

    const [reservation, setReservation] = useState({
        branch_id: '',
        treatment_id: '',
        request_date: '',
        request_time: '',
        anamnesis: '',
        customer_bank_account: '',
        customer_bank_account_name: '',
        deposit: '',
        transfer_date: '',
        deposit_receipt: ''
    });

    useEffect(() => {
        checkService();

        // Setting Title and Message

        if (form === 1) {
            setTitle('Daftarkan Diri Anda')
            setInputInfo('');
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

        console.log(profile, contact);

    }, [form]);

    // 3 Difference forms

    const Profile = ({ profile, setProfile }) => {
        const [localProfile, setLocalProfile] = useState(profile);

        const handleInput = (property, value) => {
            setLocalProfile(prev => ({
                ...prev,
                [property]: value
            }));
        };

        const saveData = () => {
            setProfile({
                ...profile,
                ...localProfile
            });

            setForm((prev) => prev + 1);
        };

        return (
            <>
                <div className='form-body'>
                    <InputGroup
                        name='Nomor Identitas'
                        type='number'
                        placeholder='Nomor Kartu Identitas'
                        value={profile.identity_number}
                        set={(value) => handleInput('identity_number', value)}
                    />
                    <InputGroup
                        name='Nama'
                        type='text'
                        placeholder='Masukkan Nama Anda'
                        value={profile.name}
                        set={(value) => handleInput('name', value)}
                    />
                    <div className='double-input'>
                        <InputGroup
                            name='Tempat Tanggal lahir'
                            type='text'
                            placeholder='Kota'
                            value={profile.place_of_birth}
                            set={(value) => handleInput('place_of_birth', value)}
                        />
                        <InputGroup
                            name=''
                            type='date'
                            value={profile.date_of_birth}
                            set={(value) => handleInput('date_of_birth', value)}
                        />
                    </div>
                    <InputGroup
                        name='Agama'
                        type='select'
                        placeholder='Pilih Agama'
                        options={religion}
                        index={profile.religion[0]}
                        set={(value) => handleInput('religion', value)}
                    />
                    <InputGroup
                        name='Jenis Kelamin'
                        type='select'
                        placeholder='Pilih Jenis Kelamin'
                        options={gender}
                        index={profile.gender[0]}
                        set={(value) => handleInput('gender', value)}
                    />
                    <InputGroup
                        name='Status Pernikahan'
                        type='select'
                        placeholder='Pilih Status Pernikahan'
                        options={maritalStatus}
                        index={profile.marrital_status[0]}
                        set={(value) => handleInput('marrital_status', value)}
                    />
                    <InputGroup
                        name='Pekerjaan'
                        type='text'
                        placeholder='Masukkan Nama atau Detail Pekerjaan'
                        value={profile.occupation}
                        set={(value) => handleInput('occupation', value)}
                    />
                </div>
                <div className='form-footer'>
                    <div className='btn-group'>
                        {
                            login === true ?
                                <button className='form-button' onClick={() => {
                                    navigate('/services', {
                                        state: {
                                            member: login
                                        }
                                    })
                                }}>Kembali</button>
                                :
                                <button className='form-button' onClick={() => navigate('/services')}>Kembali</button>
                        }
                        <button className='form-button' onClick={saveData}>Berikutnya</button>
                    </div>
                </div>
            </>
        );
    };

    const Contact = ({ contact, setContact }) => {
        const [localContact, setLocalContact] = useState(contact);

        const handleInput = (property, value) => {
            setLocalContact(prev => ({
                ...prev,
                [property]: value
            }));
        };

        const saveData = (act) => {
            setContact({
                ...contact,
                ...localContact
            });

            act === 1 ? setForm((prev) => prev + 1) : setForm((prev) => prev - 1);
        };

        return (
            <>
                <div className='form-body'>
                    <div className='form-col'>
                        <InputGroup
                            name='Nomor Telepon'
                            type='number'
                            placeholder='No Telepon / Whatsapp'
                            value={contact.phone_number}
                            set={(value) => handleInput('phone_number', value)}
                        />
                        <InputGroup
                            name='Alamat Email'
                            type='text'
                            placeholder='Masukkan Email Anda'
                            value={contact.email}
                            set={(value) => handleInput('email', value)}
                        />
                        <InputGroup
                            name='Akun Instagram'
                            type='text'
                            placeholder='Username Akun Anda'
                            mark='*'
                            value={contact.instagram}
                            set={(value) => handleInput('instagram', value)}
                        />
                        <InputGroup
                            name='Akun Facebook'
                            type='text'
                            placeholder='Username Akun Anda'
                            mark='*'
                            value={contact.facebook}
                            set={(value) => handleInput('facebook', value)}
                        />
                        <InputGroup
                            name='Akun Youtube'
                            type='text'
                            placeholder='Username Akun atau Channel Anda'
                            mark='*'
                            value={contact.youtube}
                            set={(value) => handleInput('youtube', value)}
                        />
                    </div>
                    <div className='form-col'>
                        <InputGroup
                            name='Alamat Rumah'
                            type='textarea'
                            value={contact.address}
                            set={(value) => handleInput('address', value)}
                        />
                    </div>
                </div>
                <div className='form-footer'>
                    <p>{inputInfo}</p>

                    <div className='btn-group'>
                        <button className='form-button' onClick={() => saveData(0)}>Kembali</button>
                        <button className='form-button' onClick={() => saveData(1)}>Berikutnya</button>
                    </div>
                </div>
            </>
        );
    };

    const BeudentInfo = ({ sourceInfo, setSourceInfo }) => {
        const [localSourceInfo, setLocalSourceInfo] = useState(sourceInfo);

        const selectBox = (index, val) => {
            setLocalSourceInfo([index, val]);
        };

        const saveData = (act) => {
            setSourceInfo(localSourceInfo);
            act === 1 ? setForm((prev) => prev + 1) : setForm((prev) => prev - 1);
        };

        return (
            <>
                <div className='option-group'>
                    <button className='box-option-btn' onClick={() => selectBox(0, 'browser')}>
                        <OptionBox img={require('../assets/images/google.jpg')} value='Browser' active={localSourceInfo[0] === 0 ? true : false} />
                    </button>
                    <button className='box-option-btn' onClick={() => selectBox(1, 'instagram')}>
                        <OptionBox img={require('../assets/images/instagram.png')} value='Instagram' active={localSourceInfo[0] === 1 ? true : false} />
                    </button>
                    <button className='box-option-btn' onClick={() => selectBox(2, 'lainnya')}>
                        <OptionBox img={require('../assets/images/others.png')} value='Lainnya' active={localSourceInfo[0] === 2 ? true : false} />
                    </button>
                </div>
                <div className='form-footer'>
                    <p>{inputInfo}</p>

                    <div className='btn-group'>
                        <button className='form-button' onClick={() => saveData(0)}>Kembali</button>
                        <button className='form-button' onClick={() => saveData(1)}>Berikutnya</button>
                    </div>
                </div>
            </>
        );
    };

    const Reservation = ({ profile, contact, reservation, setReservation }) => {
        const [localReservation, setLocalReservation] = useState(reservation);

        const handleInput = (property, value) => {
            setLocalReservation(prev => ({
                ...prev,
                [property]: value
            }));
        };

        const saveData = (act) => {
            setReservation({
                ...reservation,
                ...localReservation
            });

            act === 1 ? setModal(1) : setForm((prev) => prev - 1);
        };

        return (
            <>
                <div className='reservation-session'>
                    <div className='section'>
                        <h3>Data Diri Anda</h3>
                        <div className='form-body'>
                            <DataLabel label='Nomor Identitas' data={profile.identity_number || 'Belum Melengkapi Data'} />
                            <DataLabel label='Nama' data={profile.name || 'Belum Melengkapi Data'} />
                            <DataLabel label='Tempat Tanggal Lahir' data={profile.place_of_birth && profile.date_of_birth ? profile.place_of_birth + ', ' + profile.date_of_birth : 'Belum Melengkapi Data'} />
                            <DataLabel label='Agama' data={profile.religion[1] || 'Belum Melengkapi Data'} />
                            <DataLabel label='Jenis Kelamin' data={profile.gender[1] || 'Belum Melengkapi Data'} />
                            <DataLabel label='Status Pernikahan' data={profile.maritalStatus || 'Belum Melengkapi Data'} />
                            <DataLabel label='Nomor Telepon' data={contact.phone_number || 'Belum Melengkapi Data'} />
                            <DataLabel label='Alamat Email' data={contact.email || 'Belum Melengkapi Data'} />
                            <DataLabel label='Pekerjaan' data={profile.occupation || 'Belum Melengkapi Data'} />
                            <DataLabel label='Alamat Rumah' data={contact.address || 'Belum Melengkapi Data'} />
                        </div>
                    </div>
                    <div className='section'>
                        <h3>Reservasi</h3>
                        <div className='form-body'>
                            <InputGroup
                                name='Cabang Klinik'
                                type='select'
                                placeholder='Pilih Cabang'
                                options={[{ label: 'Surabaya', value: 'surabaya' }]}
                                index={reservation.branch_id[0]}
                                set={(value) => handleInput('branch_id', value)}
                            />
                            <InputGroup
                                name='Layanan'
                                type='select'
                                placeholder='Pilih Layanan'
                                options={[{ label: 'Tambal Gigi', value: 'tambal gigi' }]}
                                index={reservation.treatment_id[0]}
                                set={(value) => handleInput('treatment_id', value)}
                            />
                            <div className='double-input'>
                                <InputGroup
                                    name='Waktu Kunjungan'
                                    type='time'
                                    placeholder='Jam'
                                    value={reservation.request_time}
                                    set={(value) => handleInput('request_time', value)}
                                />
                                <InputGroup
                                    name=''
                                    type='date'
                                    placeholder='Tanggal'
                                    value={reservation.request_date}
                                    set={(value) => handleInput('request_date', value)}
                                />
                            </div>
                            <InputGroup
                                name='Masalah Mulut'
                                type='text'
                                placeholder='Berikan keluhan mulut yang anda alami'
                                value={reservation.anamnesis}
                                set={(value) => handleInput('anamnesis', value)}
                            />
                        </div>
                    </div>
                    {
                        exam === 2 &&
                        <div className='section'>
                            <h3>Pembayaran Deposit</h3>
                            <div className='form-body'>
                                <InputGroup
                                    name='Bank Pengirim'
                                    type='select'
                                    placeholder='Pilih Bank'
                                    options={[{ label: 'BRI', value: 'bri' }]}
                                    index={reservation.customer_bank_account[0]}
                                    set={(value) => handleInput('customer_bank_account', value)}
                                />
                                <InputGroup
                                    name='Nama Rekening'
                                    type='text'
                                    placeholder='Nama Rekening Bank'
                                    value={reservation.customer_bank_account_name}
                                    set={(value) => handleInput('customer_bank_account_name', value)}
                                />
                                <InputGroup
                                    name='Jumlah Deposit'
                                    type='number'
                                    placeholder='Rp'
                                    value={reservation.deposit}
                                    set={(value) => handleInput('deposit', value)}
                                />
                                <InputGroup
                                    name='Tanggal Pembayaran'
                                    type='date'
                                    placeholder='Atur Tanggal'
                                    value={reservation.transfer_date}
                                    set={(value) => handleInput('transfer_date', value)}
                                />
                                <InputGroup
                                    name='Bukti Pembayaran'
                                    type='file'
                                    placeholder='Unggah Bukti'
                                />
                            </div>
                        </div>
                    }
                </div>
                <div className='form-footer'>
                    <div className='payment-info'>
                        <label>Rekening Pembayaran</label>
                        <p>BCA : 3500120201020 (Beaudent)</p>
                    </div>
                    <div className='btn-group'>
                        {
                            login === true ?
                                <button className='form-button' onClick={() => {
                                    navigate('/services', {
                                        state: {
                                            member: login
                                        }
                                    })
                                }}>Kembali</button>
                                :
                                <button className='form-button' onClick={() => saveData(0)}>Kembali</button>
                        }
                        <button className='form-button on' onClick={() => saveData(1)}>Konfirmasi</button>
                    </div>
                </div >
            </>
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
                            <header className='reservation'>
                                <h2 className='form-title'>{title}</h2>
                                <p>Mohon periksa kembali data formulir reservasi anda</p>
                                <img src={require('../assets/images/logo.jpg')} alt='Beaudent Logo' draggable='false' />
                            </header>
                    }

                    {/* Template for the each form */}
                    {form === 1 && <Profile profile={profile} setProfile={setProfile} />}
                    {form === 2 && <Contact contact={contact} setContact={setContact} />}
                    {form === 3 && <BeudentInfo sourceInfo={sourceInfo} setSourceInfo={setSourceInfo} />}
                    {form === 4 && <Reservation profile={profile} contact={contact} reservation={reservation} setReservation={setReservation} />}
                </div>
            </div>

            {/* Confirmation Modal */}
            <div className={`modal ${modal === 1 && 'active'}`}>
                <div className='pop-up'>
                    <div className='notif'>
                        <div className='icon'>
                            <box-icon type='regular' name='mail-send' size='64px' color='white'></box-icon>
                        </div>
                        <p>Kami akan mengirimkan nomor antrian melalui email anda. Mohon pantau email anda secara berkala.</p>
                    </div>
                    <div className='card'>
                        <div className='agreement'>
                            <div>
                                <button className={`check-box ${agree === 1 && 'checked'}`} onClick={() => agree === 1 ? setAgree(0) : setAgree(1)}></button>
                            </div>
                            <div>
                                <p>Saya telah membaca dan menyetujui syarat dan ketentuan dari Beaudent</p>
                            </div>
                        </div>
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => setModal(0)}>Batal</button>
                            <button className='form-button on'>Kirim</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forms;
