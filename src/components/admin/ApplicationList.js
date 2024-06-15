import React, {useContext, useEffect} from 'react';
import {Context} from "../../index";
import {fetchApplications} from "../../http/adminAPI";
import ApplicationItem from "./ApplicationItem";
import {observer} from "mobx-react-lite";

const ApplicationList = observer(() => {
    const {admin} = useContext(Context)

    useEffect(() => {
        fetchApplications().then(data => admin.setApplications(data))
    }, [])

    return (
        <div className='application__container'>
            {admin.applications.map(item =>
                <ApplicationItem key={item.id} application={item} />
            )}
        </div>
    );
});

export default ApplicationList;