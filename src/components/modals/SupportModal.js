import React, {useState} from 'react'
import Modal from "../reused/Modal"
import SupportQuestion from "./SupportQuestion";

const SupportModal = ({active, setActive, setChatActive}) => {
    return (
        <Modal active={active} setActive={setActive} styles={{padding: 0}}>
            <div className='support__modal'>
                <div className='support__modal__header'><h3>Поддержка</h3></div>
                <div className="support__modal__body">
                    <h3>Выберите цель обращения:</h3>
                    <button onClick={() => {
                        setActive(false)
                        setChatActive(true)
                    }}>Вопрос</button>
                    <button onClick={() => setActive(false)}>Жалоба</button>
                </div>
            </div>
        </Modal>
    );
};

export default SupportModal;