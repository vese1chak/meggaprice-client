import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { GOOD_ROUTE } from '../utils/consts';
import '../assets/css/icomoon.css';
import favorite from '../assets/icons/favorite.png';
import {appendToUsergood} from "../http/goodAPI";
import {Context} from "../index";

const GoodItem = ({good}) => {
    const {user} = useContext(Context)
    const history = useNavigate();

    const addGoodToCart = () => {
        if (user.isAuth) {
            const formData = new FormData()
            formData.append('userId', user.user.id)
            formData.append('goodId', good.id)
            formData.append('type', 'cart')
            appendToUsergood(formData)
        }
    }

    const addGoodToFavorite = () => {
        if (user.isAuth) {
            const formData = new FormData()
            formData.append('userId', user.user.id)
            formData.append('goodId', good.id)
            formData.append('type', 'favorite')
            appendToUsergood(formData)
        }
    }

    return (
        <div className="card">
            <div className="card__to-favorite">
                <a href="./" onClick={addGoodToFavorite}>
                    <img src={favorite} alt="favorite" />
                </a>
            </div>
            <div className="card__img" onClick={() => history(GOOD_ROUTE + '/' + good.id)}>
                <img src={process.env.REACT_APP_API_URL + good.img} alt="good" />
            </div>
            <div className="card__info">
                <div className="card__stats">
                    <div className="card__rating">
                        <span className="icon-star"></span>
                        <span>{good.rating}</span>
                    </div>
                    <div className="card__reviews">
                        <span className="icon-message-circle"></span>
                        <span>10480</span>
                    </div>
                </div>
                <div className="card__title">
                    {good.title}
                </div>
                <div className="card__order">
                    <div className="card__price">
                        <div className="card__price-old">{good.price}₽</div>
                        <div className="card__price-new">{good.price}₽</div>
                    </div>
                    <button onClick={addGoodToCart}>В корзину</button>
                </div>
            </div>
            <div className="card__promo"></div>
        </div>
    );
};

export default GoodItem;