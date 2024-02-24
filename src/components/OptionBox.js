import React, { useEffect, useState } from 'react';

import '../styles/component-styles/box-option.css';
import SkeletonImg from './SkeletonImg';

const OptionBox = (props) => {
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (props.img) {
            const image = new Image();
            image.src = props.img;
            image.onload = () => setLoad(true);
        }
    }, [props.img]);

    return (
        load === true ?
            <div className={`box-option ${props.active === true && 'active'}`}>
                <div className='icon'>
                    <img src={props.img} draggable='false' />
                </div>
                <p>{props.value}</p>
            </div>
            :
            <SkeletonImg />
    );
};

export default OptionBox;