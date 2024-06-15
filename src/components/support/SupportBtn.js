import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import SupportChat from "./SupportChat";

const SupportBtn = observer(() => {
    const [chatActive, setChatActive] = useState(false)

    if (chatActive) {
        return (
            <SupportChat setActive={setChatActive} />
        )
    }

    return (
        <div className='support'>
            <button className="support__btn" onClick={() => setChatActive(true)}>
                Х
            </button>
        </div>
    );
});

export default SupportBtn;