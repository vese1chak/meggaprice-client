import React from 'react';
import SupportItem from "./SupportItem";
import {observer} from "mobx-react-lite";

const SupportList = observer(({messages}) => {
    return (
        <div className='support__body'>
            {messages.map(item =>
                <SupportItem data={item} />
            )}
        </div>
    );
});

export default SupportList;