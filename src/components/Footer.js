import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {ABOUT_ROUTE} from "../utils/consts";
import Application from "./modals/Application";

const Footer = () => {
    const [modalActive, setModalActive] = useState(false)

    return (
        <div className='footer'>
            <div className="container">
                <div className="footer__body">
                    <div className="footer__links">
                        <div className="footer__link">
                            <NavLink to={ABOUT_ROUTE}>О нас</NavLink>
                        </div>
                        <div className="footer__link">
                            <NavLink to={'#'} onClick={() => setModalActive(true)}>Стать продавцом</NavLink>
                        </div>
                        <div className="footer__link">
                            <NavLink to={ABOUT_ROUTE}>Условия</NavLink>
                        </div>
                        <div className="footer__link">
                            <NavLink to={ABOUT_ROUTE}>Часто задаваемые вопросы</NavLink>
                        </div>
                    </div>
                    <div className="footer__icons"></div>
                    <div className="footer__address">Мегатех, каб.528,улица Панфилова, 17, Йошкар-Ола, Республика Марий Эл 424006</div>
                </div>
            </div>
            <Application active={modalActive} setActive={setModalActive}/>
        </div>
    );
};

export default Footer;