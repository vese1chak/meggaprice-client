import React, {useEffect, useState} from 'react';
import {profile} from "../../http/userAPI";
import Spinner from "../../pages/Spinner";

const SupportItem = ({data}) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        profile(data.userId).then(data => {
            setFirstname(data.user.firstname)
            setLastname(data.user.lastname)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="support__item">
            <div className="support__data">
                <div className="support__date">23:00 20.11.23</div>
                <div className="support__initials">{firstname} {lastname}</div>
            </div>
            <div className="support__message">{data.text}</div>
        </div>
    );
};

export default SupportItem;