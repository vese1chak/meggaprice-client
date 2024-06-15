import React, {useEffect, useState} from 'react';
import {profile} from "../../http/userAPI";
import Spinner from "../../pages/Spinner";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../../utils/consts";

const Review = ({review}) => {
    const history = useNavigate()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [id, setId] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        profile(review.userId).then(data => {
            setFirstname(data.user.firstname)
            setLastname(data.user.lastname)
            setImgUrl(data.user.img)
            setId(data.user.id)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className="reviews__item">
            <div className="reviews__header">
                <div className="reviews__author" onClick={() => history(PROFILE_ROUTE + '/' + id)}>
                    <div className="reviews__author__photo"><img src={imgUrl === 'https://3myhouse.com/upload/image/store/0.png' ? 'https://3myhouse.com/upload/image/store/0.png' : process.env.REACT_APP_API_URL + imgUrl} alt="photo"/></div>
                    <div className="reviews__author__text">{firstname} {lastname[0]}.</div>
                </div>
                <div className="reviews__about">
                    <div className="reviews__about__date">23 мая 2023</div>
                    <div className="reviews__about__rating">*****</div>
                </div>
            </div>
            <div className="reviews__body">
                <div className="reviews__section">
                    <div className="reviews__section__title">Достоинства:</div>
                    <div className="reviews__section__text">{review.dignity}</div>
                </div>
                <div className="reviews__section">
                    <div className="reviews__section__title">Недостатки:</div>
                    <div className="reviews__section__text">{review.flaws}</div>
                </div>
                <div className="reviews__section">
                    <div className="reviews__section__title">Комментарий:</div>
                    <div className="reviews__section__text">{review.comment}</div>
                </div>
            </div>
            <hr/>
        </div>
    );
};

export default Review;