import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Transit = () => {
    const navigate = useNavigate();
    const { state } = useLocation();

    useEffect(() => {
        if (state) {
            const { message, reservation, member, creds, is_control } = state;
            navigate('/reservation', {
                state: {
                    message: message,
                    is_control: is_control,
                    reservation: reservation,
                    member: member,
                    creds: creds
                }
            })
        } else {
            navigate('/reservasi');
        };
    }, []);

    return (
        <div></div>
    );
};

export default Transit;
