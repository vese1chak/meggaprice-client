import React from 'react';
import './../../assets/css/style.css'

const Modal = ({active, setActive, children, styles}) => {
    return (
        <div className={active ? 'active modal' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'active modal__content' : 'modal__content'} onClick={e => e.stopPropagation()} style={styles}>
                {children}
            </div>
        </div>
    );
};

export default Modal;