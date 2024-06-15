import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GOOD_ROUTE } from '../utils/consts';
import '../assets/css/icomoon.css';
import favorite from '../assets/icons/favorite.png';

const CartItem = ({good}) => {
    const history = useNavigate();

    return (
        <div className="card">
            <div className="card__to-favorite">
                <a href="./">
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
                    <button>В корзине</button>
                </div>
            </div>
            <div className="card__promo"></div>
        </div>
    );
};

export default CartItem;