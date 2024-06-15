import React from 'react';
import {createSeller} from "../../http/adminAPI";

const ApplicationItem = ({application}) => {
    const approveApplication = () => {
        createSeller(application.name, application.email, application.phone, application.password)
    }
    const declineApplication = () => {

    }

    return (
        <div className='application__item'>
            <div className="application__buttons">
                <button className='approve' onClick={approveApplication}>Одобрить</button>
                <button className='decline' onClick={declineApplication}>Отклонить</button>
            </div>
            <div className="application__data">Название: {application.name}</div>
            <div className="application__data">Почта: {application.email}</div>
            <div className="application__data">Телефон: {application.phone}</div>
            <div className="application__data">Причина: {application.reason}</div>
        </div>
    );
};

export default ApplicationItem;