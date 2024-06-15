import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useParams} from 'react-router-dom';
import { fetchOneGood } from '../http/goodAPI';
import '../assets/css/icomoon.css';
import {SELLER_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {fetchReviews, fetchUserReview, leaveReview, updateReview} from "../http/userAPI";
import Spinner from "./../components/Spinner";
import SpinnerPage from "./Spinner";
import ReviewList from "../components/good/ReviewList";
import {observer} from "mobx-react-lite";
import {profileSeller} from "../http/sellerAPI";
import RecomendationList from "../components/good/RecomendationList";

const GoodPage = observer(() => {
    const {user} = useContext(Context)
    const [good, setGood] = useState({info: []});
    const {id} = useParams();
    const [dignity, setDignity] = useState('')
    const [flaws, setFlaws] = useState('')
    const [comment, setComment] = useState('')
    const [reviewExist, setReviewExist] = useState(false)
    const [rate, setRate] = useState(0)
    const [loading, setLoading] = useState(false)
    const [reviews, setReviews] = useState([])
    const [seller, setSeller] = useState(0)
    const [sellerName, setSellerName] = useState('')
    const [loadingPage, setLoadingPage] = useState(true)

    useEffect(() => {
        fetchOneGood(id).then(data => {
            setGood(data)
            setSeller(data.sellerId)
            return data.sellerId
        }).then(data => {
            profileSeller(data).then(data => setSellerName(data.seller.name))
        }).then(() => {
            if (user.isAuth) {
                fetchUserReview(user.user.id, id).then(data => {
                    if (data) {
                        setRate(data.rate)
                        setDignity(data.dignity)
                        setFlaws(data.flaws)
                        setComment(data.comment)
                        setReviewExist(true)
                    }
                })
            }
        }).finally(() => setLoadingPage(false))
    }, [])

    const addReview = e => {
        e.preventDefault()
        if (rate > 0) {
            if (reviewExist) {
                updateReview(id, user.user.id, rate, dignity, flaws, comment)
            } else {
                leaveReview(id, user.user.id, rate, dignity, flaws, comment)
            }
        }
    }
    const showReviews = () => {
        setLoading(true)
        fetchReviews(id).then(data => {
            setReviews(data)
        }).finally(() => setLoading(false))
    }

    if (loadingPage) {
        return <SpinnerPage />
    }

    return (
        <div className='container min-height-750'>
            <h1 className="good__title">{good.title} [продавец:<NavLink to={SELLER_ROUTE + '/' + seller}>{sellerName}</NavLink>]</h1>
            <div className="good__stats">
                <div className="good__stars">
                    <span className="icon-star"></span>
                    {good.rating}
                </div>
                <div className="good__reviews">0 отзывов</div>
            </div>
            <div className="good__info">
                <div className="good__img">
                    <img src={process.env.REACT_APP_API_URL + good.img} alt="good" />
                </div>
                <div className="good__params">
                    <div className="good__params__title">Характеристики</div>
                    {good.info.map(info =>
                        <div key={info.id}>
                            <div className="good__params__property">{info.characteristic}: {info.description}</div>
                        </div>
                    )}
                </div>
                <div className="good__to-cart">
                    <div className="good__to-cart__price">
                        {/* Именно тут намеренно повторяется новый и старый ценник */}
                        <div className="good__to-cart__price__new">{good.price}₽</div>
                        <div className="good__to-cart__price__old">{good.price}₽</div>
                    </div>
                    <button>Добавить в корзину</button>
                </div>
            </div>
            <h2 className='good__title'>Описание</h2>
            <div className="good__description">{good.description}</div>
            <hr />
            <h2 className="good__title">С этим товаром берут:</h2>
            <RecomendationList />
            <hr />
            {user.isAuth &&
                <form className="good__leave-review">
                    <h2 className='good__title'>Оставить отзыв:</h2>
                    <div className="good__leave__review__section">
                        <h2>Поставьте оценку</h2>
                        <div className='good__leave__review__buttons'>
                            <button onClick={e => {
                                e.preventDefault()
                                setRate(1)
                            }}>1</button>
                            <button onClick={e => {
                                e.preventDefault()
                                setRate(2)
                            }}>2</button>
                            <button onClick={e => {
                                e.preventDefault()
                                setRate(3)
                            }}>3</button>
                            <button onClick={e => {
                                e.preventDefault()
                                setRate(4)
                            }}>4</button>
                            <button onClick={e => {
                                e.preventDefault()
                                setRate(5)
                            }}>5</button>
                        </div>
                    </div>
                    <div className="good__leave__review__section">
                        <h2>Достоинства</h2>
                        <textarea
                            cols="100"
                            rows="6"
                            style={{resize: 'none'}}
                            onChange={e => setDignity(e.target.value)}
                            placeholder='Достоинства...' />
                    </div>
                    <div className="good__leave__review__section">
                        <h2>Недостатки</h2>
                        <textarea
                            cols="100"
                            rows="6"
                            style={{resize: 'none'}}
                            onChange={e => setFlaws(e.target.value)}
                            placeholder='Недостатки...' />
                    </div>
                    <div className="good__leave__review__section">
                        <h2>Комментарий</h2>
                        <textarea
                            cols="100"
                            rows="6"
                            style={{resize: 'none'}}
                            onChange={e => setComment(e.target.value)}
                            placeholder='Комментарий...' />
                    </div>
                    <button onClick={addReview}>Сохранить</button>
                    <hr/>
                </form>
            }
            <h2 className="good__title">Отзывы:</h2>
            <hr/>
            <button onClick={showReviews} style={reviews.length ? {display: 'none'} : {display: 'block'}}>Показать</button>
            {loading ?
                <Spinner />
                :
                <ReviewList reviews={reviews}/>
            }
        </div>
    );
});

export default GoodPage;