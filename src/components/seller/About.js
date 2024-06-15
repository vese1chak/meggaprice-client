import React, {useContext} from 'react';
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {SHOP_ROUTE} from "../../utils/consts";

const About = ({createdAt, email, description, address, phonenumber, isOwnSellerProfile}) => {
    const {seller} = useContext(Context)
    const history = useNavigate()

    const saveInformation = () => {

    }
    const logOut = () => {
        seller.setSeller({});
        seller.setIsAuth(false);
        seller.setProfile({})
        localStorage.removeItem('tokenSeller');
        history(SHOP_ROUTE)
    }

    return (
        <div className='about-seller'>
            <h2>Оценка: 0.0</h2>
            <h2>На MeggaPrice: {createdAt}</h2>
            <h2>О нас:</h2>
            {isOwnSellerProfile ?
                <textarea rows="7" cols="50" value={description}/>
                :
                description.length ?
                    <div>{description}</div>
                    :
                    <div>Нет информации</div>
            }
            <h2>Контактная информация:</h2>
            <div className="about-seller__contact">
                <div className="about-seller__hint">Телефон:</div>
                {isOwnSellerProfile ?
                    <input
                        className="about-seller__input"
                        value={phonenumber} />
                    :
                    <div className="about-seller__hint">{phonenumber}</div>
                }
                <div className="about-seller__hint">Почта:</div>
                {isOwnSellerProfile ?
                    <input
                        className="about-seller__input"
                        value={email} />
                    :
                    <div className="about-seller__hint">{email}</div>
                }
                <div className="about-seller__hint">Адрес:</div>
                {isOwnSellerProfile ?
                    <input
                        className="about-seller__input"
                        value={address} />
                    :
                    address.length ?
                        <div className="about-seller__hint">{address}</div>
                        :
                        <div>Нет информации</div>
                }
            </div>
            {isOwnSellerProfile &&
                <div>
                    <button className="about-seller__save" onClick={saveInformation}>Сохранить</button>
                    <div className="about-seller__exit">
                        <button onClick={logOut}>Выйти</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default About;