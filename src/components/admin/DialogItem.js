import React, {useEffect, useState} from 'react';
import {profile} from "../../http/userAPI";
import Spinner from "../../pages/Spinner";

const DialogItem = ({chat}) => {
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        profile(chat.userId ? chat.userId : chat.sellerId).then(data => {
            if (data.user) {
                setFirstname(data.user.firstname)
                setLastname(data.user.lastname)
                setImgUrl(data.user.img)
            }
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='question__item'>
            <div className="question__header">
                <div className="question__img"><img src={imgUrl === 'https://3myhouse.com/upload/image/store/0.png' ? 'https://3myhouse.com/upload/image/store/0.png' : process.env.REACT_APP_API_URL + imgUrl} alt="alt"/></div>
                <div className="question__name">{firstname} {lastname}</div>
                <div className="question__date">20.11.23 23:00</div>
            </div>
            <div className="question__body">{chat.text}</div>
        </div>
    );
};

export default DialogItem;