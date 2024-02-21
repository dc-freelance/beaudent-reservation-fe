import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import InputGroup from '../components/InputGroup';
import OptionBox from '../components/OptionBox';
import DataLabel from '../components/DataLabel';
import ErrorBox from '../components/ErrorBox';

import 'boxicons';
import axios from 'axios';

const Forms = () => {
    const navigate = useNavigate();



    // Examination or Check Up

    const { state } = useLocation();
    const [exam, setExam] = useState(0);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState('');
    const [reservationId, setReservationId] = useState(0);
    const [loading, setLoading] = useState(0);

    const checkService = () => {
        if (state) {
            const { examination, member, creds, reservation } = state;
            setExam(examination);
            member === true && setForm(4);
            setReservationId(reservation);
            setUserData();
            setLogin(member);
            setUser(creds);
        } else {
            navigate('/');
        };
    };



    // Text for each form

    const [form, setForm] = useState(1);
    const [title, setTitle] = useState('Daftarkan Diri Anda');
    const [inputInfo, setInputInfo] = useState('');
    const [modal, setModal] = useState(0);
    const [agree, setAgree] = useState(0);
    const [regConfirm, setRegConfirm] = useState(0);
    const [regAgree, setRegAgree] = useState(0);



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

    const banks = [
        { label: 'Bank Central Asia (BCA)', value: 'BCA' },
        { label: 'Bank Rakyat Indonesia (BRI)', value: 'BRI' },
        { label: 'Bank Mandiri', value: 'Mandiri' },
        { label: 'Bank Negara Indonesia (BNI)', value: 'BNI' },
        { label: 'Bank CIMB Niaga', value: 'CIMB Niaga' },
        { label: 'Bank Danamon', value: 'Danamon' },
        { label: 'Bank Panin', value: 'Panin' },
        { label: 'Bank Lainnya', value: 'Lainnya' },
    ];




    // User input group by form types

    const [profile, setProfile] = useState({
        id: '',
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
        res_status: '',
        branch_id: ['', ''],
        treatment_id: ['', ''],
        request_date: '',
        request_time: '',
        anamnesis: '',
        customer_bank: ['', ''],
        customer_bank_account_name: '',
        customer_bank_account: '',
        deposit: '',
        deposit_status: '',
        transfer_date: '',
        deposit_receipt: '',
        is_control: ''
    });



    // Error Messages

    const [errors, setErrors] = useState({});
    const [totalErrors, setTotalErrors] = useState(Object.values(errors).reduce((acc, arr) => acc + arr.length, 0));

    const removeError = (key, index) => {
        const updatedErrors = { ...errors };
        updatedErrors[key] = updatedErrors[key].filter((_, i) => i !== index);

        setErrors(updatedErrors);
        setTotalErrors(totalErrors - 1);
    };



    // Registration API

    const doRegist = async (agree) => {
        if (agree === 1) {
            setLoading(1);
            await axios.post(`${process.env.REACT_APP_API_URL}registration`, {
                identity_number: profile.identity_number,
                name: profile.name,
                place_of_birth: profile.place_of_birth,
                date_of_birth: profile.date_of_birth,
                religion: profile.religion[1],
                gender: profile.gender[1],
                marrital_status: profile.marrital_status[1],
                occupation: profile.occupation,
                phone_number: contact.phone_number,
                email: contact.email,
                instagram: contact.instagram,
                youtube: contact.youtube,
                facebook: contact.facebook,
                address: contact.address,
                source_of_information: sourceInfo[1]
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(result => {
                setLoading(0);
                if (result.data.error) {
                    setErrors(result.data.error);
                    setTotalErrors(Object.values(result.data.error).reduce((acc, arr) => acc + arr.length, 0));
                } else {
                    const data = result.data.customer;

                    setForm(4);
                    setRegConfirm(0);

                    let marrit = '';
                    if (data.marrital_status === 'Single') {
                        marrit = 'Belum Menikah';
                    };
                    if (data.marrital_status === 'Married') {
                        marrit = 'Menikah';
                    };
                    if (data.marrital_status === 'Divorved') {
                        marrit = 'Kawin Cerai';
                    };

                    setProfile({
                        ...profile,
                        id: data.id,
                        religion: data.religion,
                        gender: data.gender === 'Male' ? 'Laki-Laki' : 'Perempuan',
                        marrital_status: marrit
                    });
                    navigate('/reservation', {
                        state: {
                            examination: exam,
                            member: true,
                            creds: contact.phone_number
                        }
                    });
                };
            }).catch(err => {
                console.log(err);
                setLoading(0);
                setErrors({
                    error: [
                        'Terjadi Masalah Saat Mengirim Data'
                    ]
                });
            })
        } else {
            setErrors({
                agree: [
                    'Anda Tidak Menyetujui Syarat dan Ketentuan Kami'
                ]
            });
        };
    };



    // Reservation API

    const doReservation = async () => {
        if (agree === 1) {
            setLoading(1);
            await axios.post(`${process.env.REACT_APP_API_URL}reservation`, {
                customer_bank_account: reservation.customer_bank_account_name,
                branch_id: reservation.branch_id[1],
                request_date: reservation.request_date,
                request_time: reservation.request_time,
                customer_id: profile.id,
                is_control: exam === true ? 1 : 0,
                treatment_id: reservation.treatment_id[1],
                deposit: reservation.deposit,
                anamnesis: reservation.anamnesis,
                deposit_receipt: reservation.deposit_receipt,
                customer_bank: reservation.customer_bank[1],
                customer_bank_account_name: reservation.customer_bank_account_name,
                transfer_date: reservation.transfer_date
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(result => {
                setLoading(0);
                if (result.data.error) {
                    setErrors(result.data.error);
                    setTotalErrors(Object.values(result.data.error).reduce((acc, arr) => acc + arr.length, 0));
                } else {
                    navigate('/', {
                        state: {
                            message: 'Anda Telah Melakukan Reservasi'
                        }
                    });
                };
            }).catch(err => {
                console.log(err);
                setLoading(0);
                setErrors({
                    error: [
                        'Terjadi Masalah Saat Mengirim Data'
                    ]
                });
            })
        } else {
            setErrors({
                agree: [
                    'Anda Tidak Menyetujui Syarat dan Ketentuan Kami'
                ]
            });
        };
    };



    // Deposit

    const doDeposit = async () => {
        if (agree === 1) {
            setLoading(1);
            await axios.post(`${process.env.REACT_APP_API_URL}deposit`, {
                id: reservationId.id,
                deposit: reservation.deposit,
                deposit_receipt: reservation.deposit_receipt,
                customer_bank: reservation.customer_bank[1],
                customer_bank_account: reservation.customer_bank_account,
                customer_bank_account_name: reservation.customer_bank_account_name,
                transfer_date: reservation.transfer_date
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(result => {
                setLoading(0);
                if (result.data.error) {
                    setErrors(result.data.error);
                    setTotalErrors(Object.values(result.data.error).reduce((acc, arr) => acc + arr.length, 0));
                } else {
                    navigate('/', {
                        state: {
                            message: 'Anda Telah Membayar Deposit'
                        }
                    });
                };
            }).catch(err => {
                console.log(err);
                setLoading(0);
                setErrors({
                    error: [
                        'Terjadi Masalah Saat Mengirim Data'
                    ]
                });
            })
        } else {
            setErrors({
                agree: [
                    'Anda Tidak Menyetujui Syarat dan Ketentuan Kami'
                ]
            });
        };
    };



    // Set user data

    const setUserData = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}customer`, {
            creds: user
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            const data = result.data.customer;

            let marrit = '';
            if (data.marrital_status === 'Single') {
                marrit = 'Belum Menikah';
            };
            if (data.marrital_status === 'Married') {
                marrit = 'Menikah';
            };
            if (data.marrital_status === 'Divorved') {
                marrit = 'Kawin Cerai';
            };

            setProfile({
                id: data.id,
                identity_number: data.identity_number,
                name: data.name,
                place_of_birth: data.place_of_birth,
                date_of_birth: data.date_of_birth,
                gender: data.gender === 'Male' ? 'Laki-Laki' : 'Perempuan',
                religion: data.religion,
                marrital_status: marrit,
                occupation: data.occupation,
            });

            setContact({
                phone_number: data.phone_number,
                email: data.email,
                address: data.address,
            });

            if (reservationId != null) {
                const customerRes = data.reservations[data.reservations.length - 1];
                setReservation({
                    ...reservation,
                    branch_id: customerRes.branches.name,
                    treatment_id: customerRes.treatments.name,
                    request_date: customerRes.request_date,
                    request_time: customerRes.request_time,
                    is_control: customerRes.is_control,
                    anamnesis: customerRes.anamnesis,
                });

                if (customerRes.deposit_status != null) {
                    setReservation({
                        branch_id: customerRes.branches.name,
                        treatment_id: customerRes.treatments.name,
                        request_date: customerRes.request_date,
                        request_time: customerRes.request_time,
                        is_control: customerRes.is_control,
                        anamnesis: customerRes.anamnesis,
                        customer_bank: customerRes.customer_bank,
                        customer_bank_account_name: customerRes.customer_bank_account_name,
                        customer_bank_account: customerRes.customer_bank_account,
                        deposit: customerRes.deposit,
                        deposit_receipt: customerRes.deposit_receipt,
                        transfer_date: customerRes.transfer_date,
                        deposit_status: customerRes.deposit_status
                    });
                };
            };
        }).catch(err => { });
    };



    // Get branches 

    const [branches, setBranches] = useState([]);
    const getBranches = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}branch`);
            const branchData = response.data.branch.map(data => ({
                label: data.name,
                value: data.id
            }));
            setBranches(branchData);
        } catch (error) {
            console.error(error);
        }
    };



    // Get treatments

    const [treatments, setTreatments] = useState([]);
    const getTreatments = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}treatment`);
            const treatmentData = response.data.treatments.map(data => ({
                label: data.name,
                value: data.id
            }));
            setTreatments(treatmentData);
        } catch (error) {
            console.error(error);
        }
    };



    // IDR Currency
    const convertRp = (val) => {
        let final;
        let rp = val.split('.')[0].split('').reverse().join('');
        for (let i = 0; i < val.length; i += 3) {
            final += rp.substring(i, i + 3) + '.';

            if (i >= val.length - 3) {
                let removeDot = final.split('').reverse().join('').replace('denifednu', '');
                removeDot[1] == '.' ? final = removeDot.substring(2, removeDot.length) : final = removeDot.substring(1, removeDot.length);
            }
        };

        return final + ',00';
    };



    useEffect(() => {
        checkService();
        getBranches();
        getTreatments();

        // Setting Title and Message

        if (form === 1) {
            setTitle('Daftarkan Diri Anda')
            setInputInfo('*Wajib Diisi');
        };

        if (form === 2) {
            setTitle('Bagaimana Kami Menghubungi Anda?')
            setInputInfo('*Wajib Diisi');
        };

        if (form === 3) {
            setTitle('Darimana Anda Mengetahui Kami?')
            setInputInfo('Wajib Memilih Sumber Informasi');
        };

        if (form === 4) {
            setTitle('Formulir Reservasi')
        };

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
                        mark='*'
                        value={profile.identity_number}
                        set={(value) => handleInput('identity_number', value)}
                    />
                    <InputGroup
                        name='Nama'
                        type='text'
                        placeholder='Masukkan Nama Anda'
                        mark='*'
                        value={profile.name}
                        set={(value) => handleInput('name', value)}
                    />
                    <div className='double-input'>
                        <InputGroup
                            name='Tempat Tanggal lahir'
                            type='text'
                            placeholder='Kota'
                            mark='*'
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
                        mark='*'
                        options={religion}
                        index={profile.religion[0]}
                        set={(value) => handleInput('religion', value)}
                    />
                    <InputGroup
                        name='Jenis Kelamin'
                        type='select'
                        placeholder='Pilih Jenis Kelamin'
                        mark='*'
                        options={gender}
                        index={profile.gender[0]}
                        set={(value) => handleInput('gender', value)}
                    />
                    <InputGroup
                        name='Status Pernikahan'
                        type='select'
                        placeholder='Pilih Status Pernikahan'
                        mark='*'
                        options={maritalStatus}
                        index={profile.marrital_status[0]}
                        set={(value) => handleInput('marrital_status', value)}
                    />
                    <InputGroup
                        name='Pekerjaan'
                        type='text'
                        placeholder='Masukkan Nama atau Detail Pekerjaan'
                        mark='*'
                        value={profile.occupation}
                        set={(value) => handleInput('occupation', value)}
                    />
                </div>
                <div className='form-footer'>
                    <p>{inputInfo}</p>

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
                        <button className='form-button on' onClick={saveData}>Berikutnya</button>
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
                            mark='*'
                            value={contact.phone_number}
                            set={(value) => handleInput('phone_number', value)}
                        />
                        <InputGroup
                            name='Alamat Email'
                            type='text'
                            placeholder='Masukkan Email Anda'
                            mark='*'
                            value={contact.email}
                            set={(value) => handleInput('email', value)}
                        />
                        <InputGroup
                            name='Akun Instagram'
                            type='text'
                            placeholder='Username Akun Anda'
                            value={contact.instagram}
                            set={(value) => handleInput('instagram', value)}
                        />
                        <InputGroup
                            name='Akun Facebook'
                            type='text'
                            placeholder='Username Akun Anda'
                            value={contact.facebook}
                            set={(value) => handleInput('facebook', value)}
                        />
                        <InputGroup
                            name='Akun Youtube'
                            type='text'
                            placeholder='Username Akun atau Channel Anda'
                            value={contact.youtube}
                            set={(value) => handleInput('youtube', value)}
                        />
                    </div>
                    <div className='form-col'>
                        <InputGroup
                            name='Alamat Rumah'
                            type='textarea'
                            placeholder='Alamat lengkap tempat tinggal anda'
                            mark='*'
                            value={contact.address}
                            set={(value) => handleInput('address', value)}
                        />
                    </div>
                </div>
                <div className='form-footer'>
                    <p>{inputInfo}</p>

                    <div className='btn-group'>
                        <button className='form-button' onClick={() => saveData(0)}>Kembali</button>
                        <button className='form-button on' onClick={() => saveData(1)}>Berikutnya</button>
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
            act === 1 ? setRegConfirm(1) : setForm((prev) => prev - 1);
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
                        <button className='form-button on' onClick={() => saveData(1)}>Registrasi</button>
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

        const saveData = () => {
            setReservation({
                ...reservation,
                ...localReservation
            });

            setModal(1);
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
                            <DataLabel label='Agama' data={profile.religion || 'Belum Melengkapi Data'} />
                            <DataLabel label='Jenis Kelamin' data={profile.gender || 'Belum Melengkapi Data'} />
                            <DataLabel label='Status Pernikahan' data={profile.marrital_status || 'Belum Melengkapi Data'} />
                            <DataLabel label='Nomor Telepon' data={contact.phone_number || 'Belum Melengkapi Data'} />
                            <DataLabel label='Alamat Email' data={contact.email || 'Belum Melengkapi Data'} />
                            <DataLabel label='Pekerjaan' data={profile.occupation || 'Belum Melengkapi Data'} />
                            <DataLabel label='Alamat Rumah' data={contact.address || 'Belum Melengkapi Data'} />
                        </div>
                    </div>
                    <div className='section'>
                        <h3>Reservasi</h3>
                        {
                            reservationId == null ?
                                <div className='form-body'>
                                    <InputGroup
                                        name='Cabang Klinik'
                                        type='select'
                                        placeholder='Pilih Cabang'
                                        options={branches}
                                        index={reservation.branch_id[0]}
                                        set={(value) => handleInput('branch_id', value)}
                                    />
                                    <InputGroup
                                        name='Layanan'
                                        type='select'
                                        placeholder='Pilih Layanan'
                                        options={treatments}
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
                                :
                                <div className='form-body'>
                                    <InputGroup
                                        name='Cabang Klinik'
                                        type='text'
                                        placeholder='Pilih Cabang'
                                        options={branches}
                                        value={reservation.branch_id}
                                        read={true}
                                    />
                                    <InputGroup
                                        name='Layanan'
                                        type='text'
                                        placeholder='Pilih Layanan'
                                        options={treatments}
                                        value={reservation.treatment_id}
                                        read={true}
                                    />
                                    <div className='double-input'>
                                        <InputGroup
                                            name='Waktu Kunjungan'
                                            type='text'
                                            placeholder='Jam'
                                            value={reservation.request_time}
                                            read={true}
                                        />
                                        <InputGroup
                                            name=''
                                            type='date'
                                            placeholder='Tanggal'
                                            value={reservation.request_date}
                                            read={true}
                                        />
                                    </div>
                                    <InputGroup
                                        name='Masalah Mulut'
                                        type='text'
                                        placeholder='Berikan keluhan mulut yang anda alami'
                                        value={reservation.anamnesis}
                                        read={true}
                                    />
                                </div>
                        }
                    </div>
                    {
                        reservationId != null && reservationId.is_control == 0 && reservationId.status == 'Done' && reservationId.deposit_status == null &&
                        <div className='section'>
                            <h3>Pembayaran Deposit</h3>
                            <div className='form-body'>
                                <InputGroup
                                    name='Bank Pengirim'
                                    type='select'
                                    placeholder='Pilih Bank'
                                    options={banks}
                                    index={reservation.customer_bank[0]}
                                    set={(value) => handleInput('customer_bank', value)}
                                />
                                <InputGroup
                                    name='Nomor Rekening'
                                    type='number'
                                    placeholder='Nomor Rekening Bank'
                                    value={reservation.customer_bank_account}
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
                                    label={localReservation.deposit_receipt ? 'Bukti Terunggah' : 'Unggah Bukti'}
                                    type='file'
                                    placeholder='Unggah Bukti'
                                    set={(value) => handleInput('deposit_receipt', value)}
                                />
                            </div>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.is_control == 0 && reservationId.status != 'Reservation' && reservationId.deposit_status != null &&
                        <div className='section'>
                            <h3>Pembayaran Deposit</h3>
                            <div className='form-body'>
                                <InputGroup
                                    name='Bank Pengirim'
                                    type='text'
                                    placeholder='Pilih Bank'
                                    options={banks}
                                    value={reservation.customer_bank}
                                    read={true}
                                />
                                <InputGroup
                                    name='Nomor Rekening'
                                    type='number'
                                    placeholder='Nomor Rekening Bank'
                                    value={reservation.customer_bank_account}
                                    read={true}
                                />
                                <InputGroup
                                    name='Nama Rekening'
                                    type='text'
                                    placeholder='Nama Rekening Bank'
                                    value={reservation.customer_bank_account_name}
                                    read={true}
                                />
                                <InputGroup
                                    name='Jumlah Deposit'
                                    type='text'
                                    placeholder='Rp'
                                    value={`Rp ${convertRp(reservation.deposit)}`}
                                    read={true}
                                />
                                <InputGroup
                                    name='Tanggal Pembayaran'
                                    type='date'
                                    placeholder='Atur Tanggal'
                                    value={reservation.transfer_date}
                                    read={true}
                                />
                                <a className='view-image input-group' href={`${process.env.REACT_APP_BE_URL}${reservation.deposit_receipt}`} target='_blank'>
                                    <InputGroup
                                        name='Bukti Pembayaran'
                                        label='Lihat Bukti'
                                        type='file'
                                    />
                                </a>
                            </div>
                        </div>
                    }
                </div>
                <div className='form-footer'>
                    {
                        reservationId == null &&
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                navigate('/services', {
                                    state: {
                                        member: login,
                                        creds: user
                                    }
                                })
                            }}>Kembali</button>
                            <button className='form-button on' onClick={saveData}>Reservasi</button>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.status == 'Done' && reservationId.deposit_status == null &&
                        <div className='payment-info'>
                            <label>Rekening Pembayaran</label>
                            <p>BCA : 8631216161 (PT. Beaudent Medika Indonesia)</p>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.status == 'Done' && reservationId.deposit_status == null &&
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                navigate('/credential')
                            }}>Kembali</button>
                            <button className='form-button on' onClick={(saveData)}>Bayar Deposit</button>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.status != 'Done' &&
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                navigate('/credential')
                            }}>Kembali</button>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.status == 'Done' && reservationId.deposit_status != null &&
                        <div className='payment-info'>
                            <label>Rekening Pembayaran</label>
                            <p>BCA : 8631216161 (PT. Beaudent Medika Indonesia)</p>
                        </div>
                    }
                    {
                        reservationId != null && reservationId.status == 'Done' && reservationId.deposit_status != null &&
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => {
                                navigate('/credential')
                            }}>Kembali</button>
                        </div>
                    }
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
                                {
                                    reservationId == null &&
                                    <p>Mohon periksa kembali data formulir reservasi anda</p>
                                }
                                {
                                    reservationId != null && reservationId.deposit_status == null &&
                                    <div className='status-group'>
                                        <div className='status-box'>
                                            <label>Reservasi : </label>
                                            {
                                                reservationId.status == 'Reservation' &&
                                                <p className='wait'>Menunggu Konfirmasi</p>
                                            }
                                            {
                                                reservationId.status == 'Cancel' &&
                                                <p className='fail'>Dibatalkan</p>
                                            }
                                            {
                                                reservationId.status == 'Done' &&
                                                <p className='success'>Dikonfirmasi</p>
                                            }
                                        </div>
                                    </div>
                                }
                                {
                                    reservationId != null && reservationId.deposit_status != null &&
                                    <div className='status-group'>
                                        <div className='status-box'>
                                            <label>Reservasi : </label>
                                            {
                                                reservationId.status == 'Reservation' &&
                                                <p className='wait'>Menunggu Konfirmasi</p>
                                            }
                                            {
                                                reservationId.status == 'Cancel' &&
                                                <p className='fail'>Dibatalkan</p>
                                            }
                                            {
                                                reservationId.status == 'Done' &&
                                                <p className='success'>Dikonfirmasi</p>
                                            }
                                        </div>
                                        <div className='status-box'>
                                            <label>Deposit : </label>
                                            {
                                                reservationId.deposit_status == 'Waiting' &&
                                                <p className='wait'>Menunggu Konfirmasi</p>
                                            }
                                            {
                                                reservationId.deposit_status == 'Decline' &&
                                                <p className='fail'>Dibatalkan</p>
                                            }
                                            {
                                                reservationId.deposit_status == 'Confirm' &&
                                                <p className='success'>Dikonfirmasi</p>
                                            }
                                        </div>
                                    </div>
                                }
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



            {/* Error Messages */}
            <div className='error-container'>
                {
                    Object.entries(errors).map(([key, value]) => (
                        value.map((message, index) => (
                            <button key={`${key}-${index}`} className='remove-error-button' onClick={() => removeError(key, index)}>
                                <ErrorBox message={message} />
                            </button>
                        ))
                    )).flat().slice(0, 4)
                }
                {totalErrors > 4 && (
                    <ErrorBox key='error' message={`Dan ${totalErrors - 4} Kesalahan Lain`} />
                )}
            </div>



            {/* Confirmation Modal */}
            {/* Regist */}
            <div className={`modal ${regConfirm === 1 && 'active'}`}>
                <div className='pop-up'>
                    <div className='notif'>
                        <div className='icon'>
                            <box-icon type='regular' name='message-alt-check' size='64px' color='white'></box-icon>
                        </div>
                        <p>Pastikan data diri anda telah sesuai sebelum mendaftar, anda akan diarahkan ke halaman reservasi setelah ini.</p>
                    </div>
                    <div className='card'>
                        <div className='agreement'>
                            <div>
                                <button className={`check-box ${regAgree === 1 && 'checked'}`} onClick={() => regAgree === 1 ? setRegAgree(0) : setRegAgree(1)}>
                                    <box-icon type='regular' name='check-double' size='18px' color='white'></box-icon>
                                </button>
                            </div>
                            <div>
                                <p>Saya telah membaca dan menyetujui <a href={require('../assets/docs/terms-and-agreement.pdf')} download>syarat dan ketentuan</a> mendaftar dari Beaudent</p>
                            </div>
                        </div>
                        <div className='btn-group'>
                            <button className='form-button' onClick={() => setRegConfirm(0)}>Batal</button>
                            <button className='form-button on' onClick={() => doRegist(regAgree)}>Daftar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reservation */}
            <div className={`modal ${modal === 1 && 'active'}`}>
                <div className='pop-up'>
                    <div className='notif'>
                        <div className='icon'>
                            <box-icon type='regular' name='mail-send' size='64px' color='white'></box-icon>
                        </div>
                        <p>Kami akan mengirimkan konfirmasi melalui email anda. Mohon pantau email anda secara berkala.</p>
                    </div>
                    <div className='card'>
                        <div className='agreement'>
                            <div>
                                <button className={`check-box ${agree === 1 && 'checked'}`} onClick={() => agree === 1 ? setAgree(0) : setAgree(1)}>
                                    <box-icon type='regular' name='check-double' size='18px' color='white'></box-icon>
                                </button>
                            </div>
                            <div>
                                <p>Saya telah membaca dan menyetujui <a href={require('../assets/docs/terms-and-agreement.pdf')} download>syarat dan ketentuan</a> reservasi dari Beaudent</p>
                            </div>
                        </div>
                        {
                            reservationId == null &&
                            <div className='btn-group'>
                                <button className='form-button' onClick={() => setModal(0)}>Batal</button>
                                <button className='form-button on' onClick={doReservation}>Kirim</button>
                            </div>
                        }
                        {
                            reservationId != null && reservationId.deposit_status == null &&
                            <div className='btn-group'>
                                <button className='form-button' onClick={() => setModal(0)}>Batal</button>
                                <button className='form-button on' onClick={doDeposit}>Kirim</button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className={`modal loading ${loading === 1 && 'active'}`}>
                <div className='spinner'>
                    <box-icon type='regular' name='loader-circle' size='48px' color='rgb(255, 116, 142)'></box-icon>
                </div>
            </div>
        </div>
    );
};

export default Forms;
