import React from 'react';
import Modal from "../reused/Modal";

const SupportQuestion = ({chatActive, setChatActive}) => {
    return (
        <Modal active={chatActive} setActive={setChatActive} styles={{padding: 0}}>
            <div className='support__modal'>
                <div className='support__modal__header'><h3>Поддержка</h3></div>
            </div>
        </Modal>
    );
};

export default SupportQuestion;