import React, {useContext, useEffect} from 'react';
import { Context } from '..';
import '../assets/css/style.min.css';
import '../assets/css/icomoon.css';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import {
    PROFILE_ROUTE,
    ADMIN_ROUTE,
    CART_ROUTE,
    FAVORITE_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    SHOP_ROUTE,
    SELLER_ROUTE
} from '../utils/consts';
import { observer } from 'mobx-react-lite';
import TypeBar from "./TypeBar";
import { check } from '../http/userAPI';
import {checkSeller} from "../http/sellerAPI";

const NavBar = observer(() => {
    const {user, good, seller} = useContext(Context);
    const location = useLocation();
    const history = useNavigate()
    const isShop = location.pathname === SHOP_ROUTE;

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUser(data)
                user.setIsAuth(true)
                console.log(data, 'успешно вошли в аккаунт пользователя')
            } else {
                console.log('Пользователь не авторизован. Произошла ошибка')
            }
        });
        checkSeller().then(data => {
            if (data) {
                console.log(data, 'успешно вошли в аккаунт продавца')
                seller.setSeller(data)
                seller.setIsAuth(true)
            } else {
                console.log('Продавец не авторизован. Произошла ошибка')
            }
        })
    }, [])

    return (
        <header className='header'>
            <div className='container'>
                <div className='supheader'>
                    <div className='currency'>RUB</div>
                    <div className='current-city'>
                        <span className="icon-mark"></span>
                        Йошкар-Ола
                    </div>
                </div>
                <div className='menu'>
                    <div className='logo' onClick={() => good.setSelectedType({})}>
                        <NavLink to={SHOP_ROUTE}>
                            <img src={require('../assets/icons/logo.jpeg')} alt='logo' />
                        </NavLink>
                    </div>
                    <form className='menu__search'>
                        <input
                            name="search"
                            placeholder="Искать на Megga Price"
                            type="text"
                            onChange={(e) => good.setSearchValue(e.target.value)}
                        />
                        <button onClick={() => history(SHOP_ROUTE)}>
                            <span className="icon-search"></span>
                        </button>
                    </form>
                    {user.isAuth ?
                        <div className='menu__actions'>
                            <div className='menu__actions__item'>
                                <div className='menu__actions__item__img'>
                                    <span className="icon-box"></span>
                                </div>
                                <NavLink to={ORDERS_ROUTE} className='menu__actions__item__title'>Заказы</NavLink>
                            </div>
                            <div className='menu__actions__item'>
                                <div className='menu__actions__item__img'>
                                    <span className="icon-heart"></span>
                                </div>
                                <NavLink to={FAVORITE_ROUTE} className='menu__actions__item__title'>Избранное</NavLink>
                            </div>
                            <div className='menu__actions__item'>
                                <div className='menu__actions__item__img'>
                                    <span className="icon-shopping-cart"></span>
                                </div>
                                <NavLink to={CART_ROUTE} className='menu__actions__item__title'>Корзина</NavLink>
                            </div>
                            <div className='menu__actions__item'>
                                <div className='menu__actions__item__img'>
                                    <span className="icon-user"></span>
                                </div>
                                <NavLink to={PROFILE_ROUTE + '/' + user.user.id} className='menu__actions__item__title'>Профиль</NavLink>
                            </div>
                            {user.user.role === 'ADMIN' &&
                                <div className='menu__actions__item'>
                                    <div className='menu__actions__item__img'>
                                        <span className="icon-cog"></span>
                                    </div>
                                    <NavLink to={ADMIN_ROUTE} className='menu__actions__item__title'>Админ панель</NavLink>
                                </div>
                            }
                        </div>
                        :
                        <div className='menu__actions'>
                            {seller.isAuth ?
                                <div className='menu__actions__item'>
                                    <div className='menu__actions__item__img'>
                                        <span className="icon-user"></span>
                                    </div>
                                    <NavLink to={SELLER_ROUTE + '/' + seller.seller.id} className='menu__actions__item__title'>Профиль</NavLink>
                                </div>
                                :
                                <div className='menu__actions__item'>
                                    <div className='menu__actions__item__img'>
                                        <span className="icon-user"></span>
                                    </div>
                                    <NavLink to={LOGIN_ROUTE} className='menu__actions__item__title'>Войти</NavLink>
                                </div>
                            }
                        </div>
                    }
                </div>
                {isShop &&
                    <TypeBar />
                }
                {/*{user.isAuth ?*/}
                {/*    <div className='status-bar'>*/}
                {/*        <button*/}
                {/*            style={{marginRight: '20px'}}*/}
                {/*            onClick={() => history(ADMIN_ROUTE)}>*/}
                {/*            Админ панель*/}
                {/*        </button>*/}
                {/*        <button*/}
                {/*            onClick={() => logOut()}>*/}
                {/*            Выйти*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*    :*/}
                {/*    <div className='status-bar'>*/}
                {/*        <button onClick={() => history(LOGIN_ROUTE)}>Авторизация</button>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
        </header>
    );
});

export default NavBar;