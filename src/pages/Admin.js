import React, {useState} from 'react';
import ApplicationList from "../components/admin/ApplicationList";
import {observer} from "mobx-react-lite";
import QuestionList from "../components/admin/QuestionList";
import ComplaintList from "../components/admin/ComplaintList";
import BlockedList from "../components/admin/BlockedList";

const Admin = observer(() => {
    const [section, setSection] = useState(1)

    const renderSwitch = () => {
        switch(section) {
            case 1:
                return <QuestionList />
            case 2:
                return <ComplaintList />
            case 3:
                return <ApplicationList />
            case 4:
                return <BlockedList />
        }
    }

    return (
        <div className='container min-height-750'>
            <div className="admin">
                <div className="admin__tabs">
                    <button className="admin__tab" onClick={() => setSection(1)} style={section === 1 ? {backgroundColor: '#4EA16B'} : {}}>Вопросы</button>
                    <button className="admin__tab" onClick={() => setSection(2)} style={section === 2 ? {backgroundColor: '#4EA16B'} : {}}>Жалобы</button>
                    <button className="admin__tab" onClick={() => setSection(3)} style={section === 3 ? {backgroundColor: '#4EA16B'} : {}}>Заявки</button>
                    <button className="admin__tab" onClick={() => setSection(4)} style={section === 4 ? {backgroundColor: '#4EA16B'} : {}}>Черный список</button>
                </div>
                <div className="admin__content">
                    {renderSwitch()}
                </div>
            </div>
        </div>
    );
});

export default Admin;