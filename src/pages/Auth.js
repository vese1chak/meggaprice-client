import React, { useContext, useState } from 'react';
import '../assets/css/style.min.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Button, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import {sellerLogin} from "../http/sellerAPI";

const Auth = observer(() => {
    const {user, seller} = useContext(Context);
    const location = useLocation();
    const history = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [acceptHandling, setAcceptHandling] = useState(false);
    const [sellerAuth, setSellerAuth] = useState(false);

    const isInputFilled = () => {
        if (!firstName || !lastName || !patronymic || !birthDate || !email || !phoneNumber || !password || !rePassword || !acceptHandling) {
            return (
                <div style={{color: 'red'}}>Необходимо заполнить все поля и дать согласие!</div>
            )
        }
    }

    const click = async () => {
        try {
            if (sellerAuth) {
                let data = await sellerLogin(email, password)
                seller.setSeller(data)
                console.log(data)
                seller.setIsAuth(true)
                history(SHOP_ROUTE);
                window.location.reload()
            } else {
                let data;
                if (isLogin) {
                    data = await login(email, password);
                } else {
                    if (password === rePassword) {
                        data = await registration(firstName, lastName, patronymic, birthDate, phoneNumber, email, password);
                    } else {
                        return alert('Пароли не совпадают!');
                    }
                }
                console.log(data)
                user.setUser(user);
                user.setIsAuth(true);
                history(SHOP_ROUTE);
                window.location.reload()
            }
        } catch (e) {
            // alert(e.response.data.message);
            alert(e.message)
        }
    }

    return (
        <div className='container min-height-750'>
            <div className='auth'>
                <div className='auth__title'>
                    {isLogin ? 'Авторизация' : 'Регистрация'}
                </div>
                {isLogin ?
                    <Form style={{height: '260px'}}>
                        <Form.Control
                            name="email"
                            placeholder="Ваш E-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        <Form.Control
                            name="password"
                            placeholder="Ваш пароль"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        <label>
                            <input
                                name="remember"
                                type="checkbox"
                                value="" />
                            Запомнить меня
                        </label>
                        <label>
                            <input
                                name="selelr"
                                type="checkbox"
                                checked={sellerAuth}
                                onChange={() => {
                                    setSellerAuth(!sellerAuth)
                                    console.log(sellerAuth)
                                }}/>
                            Захожу от имени продавца
                        </label>
                        <Button onClick={click}>
                            Войти
                        </Button>
                    </Form>
                    :
                    <Form style={{height: '600px'}}>
                        <Form.Control
                            name="firstname"
                            placeholder="Имя"
                            type="text"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)} />
                        <Form.Control
                            name="lastname"
                            placeholder="Фамилия"
                            type="text"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)} />
                        <Form.Control
                            name="patronymic"
                            placeholder="Отчество"
                            type="text"
                            value={patronymic}
                            onChange={e => setPatronymic(e.target.value)} />
                        <Form.Control
                            name="birthdate"
                            placeholder="Дата рождения"
                            type="text"
                            value={birthDate}
                            onChange={e => setBirthDate(e.target.value)} />
                        <Form.Control
                            name="email"
                            placeholder="Ваш E-mail"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                        <Form.Control
                            name="phone"
                            placeholder="Ваш телефон"
                            type="tel"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)} />
                        <Form.Control
                            name="password"
                            placeholder="Ваш пароль"
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}/>
                        <Form.Control
                            name="repassword"
                            placeholder="Повторите пароль"
                            type="password"
                            value={rePassword}
                            onChange={e => setRePassword(e.target.value)} />
                        <label>
                            <input
                                name="agreement"
                                type="checkbox"
                                value={acceptHandling}
                                onChange={e => setAcceptHandling(e.target.value)} />
                            Даю согласие на обработку персональных данных
                        </label>
                        <label>
                            <input
                                name="spam"
                                type="checkbox"
                                value="" />
                            Подписаться на рассылку новостей
                        </label>
                        {
                            isInputFilled()
                        }
                        <Button onClick={click} style={isInputFilled() ? {opacity: 0.4, cursor: 'not-allowed'} : {}}>
                            Зарегистрироваться
                        </Button>
                    </Form>
                }
                {isLogin ?
                    <div className='extra-options'>
                        <div className="extra-options__item">
                            <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                        </div>
                        <div className="extra-options__item">
                            {/* Исправить ссылку */}
                            <NavLink to={SHOP_ROUTE}>Забыли пароль?</NavLink>
                        </div>
                    </div>
                    :
                    <div className='extra-options'>
                        <div className="extra-options__item">
                            <NavLink to={LOGIN_ROUTE}>Вход</NavLink>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
});

export default Auth;