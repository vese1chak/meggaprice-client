import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {appendQuestion, fetchQuestions} from "../../http/userAPI";
import {Context} from "../../index";
import SupportList from "./SupportList";

const SupportChat = observer(({setActive}) => {
    const {user} = useContext(Context)
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetchQuestions('USER', user.user.id).then(data => {
            user.setSupportMessages(data)
        })
    }, [])

    const click = async () => {
        try {
            await appendQuestion('USER', user.user.id, message)
            fetchQuestions('USER', user.user.id).then(data => {
                user.setSupportMessages(data)
            })
            setMessage('')
        } catch (e) {
            console.log('Ошибка в supportChat.js')
        }
    }

    return (
        <div className='support__chat'>
            <div className="support__header">
                <h3>Поддержка</h3>
                <div className="support__close" onClick={() => setActive(false)}>×</div>
            </div>
            <SupportList messages={user.supportMessages} />
            <div className="support__footer">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={click}>Отп</button>
            </div>
        </div>
    );
});

export default SupportChat;