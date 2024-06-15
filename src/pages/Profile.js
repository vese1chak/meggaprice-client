import React, {useContext, useEffect, useState} from 'react';
import { Context } from '..';
import {NavLink, useLocation, useParams} from 'react-router-dom';
import {PROFILE_ROUTE, SHOP_ROUTE} from '../utils/consts';
import {observer} from "mobx-react-lite";
import {check, profile, updateProfile} from "../http/userAPI";
import Spinner from "./Spinner";

const Profile = observer(() => {
    const {user} = useContext(Context);
    const [imgUrl, setImgUrl] = useState('')
    const [staticFirstname, setStaticFirstname] = useState('')
    const [staticLastname, setStaticLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [patronymic, setPatronymic] = useState('')
    const [birthdate, setBirthdate] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(true)
    const [file, setFile] = useState(null)
    const {id} = useParams()
    const location = useLocation();
    const [keyLocation, setKeyLocation] = useState(location.pathname)
    const isOwnProfile = location.pathname === PROFILE_ROUTE + '/' + user.user.id


    useEffect(() => {
        loadData()
    }, [keyLocation]);

    useEffect(() => {
        setKeyLocation(location.pathname)
    }, [location.pathname]);

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setProfile({})
        localStorage.removeItem('token');
    }
    const loadData = () => {
        check().then(data => {
            if (data) {
                user.setUser(data)
                user.setIsAuth(true)
            }
        }).then(() => {
            return profile(id)
        }).then(data => {
            user.setProfile(data)
            return user.profile.user
        }).then(data => {
            setImgUrl(data.img)
            setStaticFirstname(data.firstname)
            setStaticLastname(data.lastname)
            setFirstname(data.firstname)
            setLastname(data.lastname)
            setPatronymic(data.patronymic)
            setBirthdate(data.birthdate)
            setPhone(data.phonenumber)
            setEmail(data.email)
        }).finally(() => setLoading(false))
    }
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const saveInfo = () => {
        const formData = new FormData()
        formData.append('id', user.user.id)
        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('patronymic', patronymic)
        formData.append('phonenumber', phone)
        formData.append('email', email)
        if (file) {
            console.log(file)
            formData.append('img', file)
        }
        updateProfile(formData)
    }

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='container min-height-750'>
            <div className="profile">
                <div className="profile__intro">
                    <div className="profile__picture" style={{position: "relative"}}>
                        <img src={imgUrl === 'https://3myhouse.com/upload/image/store/0.png' ? 'https://3myhouse.com/upload/image/store/0.png' : process.env.REACT_APP_API_URL + user.profile.user.img} alt="picture"/>
                        {isOwnProfile &&
                            <input type='file' onChange={selectFile}></input>
                        }
                    </div>
                    <div className="profile__title">{staticFirstname}</div>
                    <div className="profile__title">{staticLastname}</div>
                    {isOwnProfile &&
                        <NavLink
                            to={SHOP_ROUTE}
                            onClick={() => logOut()}>
                            Выйти
                        </NavLink>
                    }
                    {isOwnProfile &&
                        <button
                            onClick={saveInfo}>
                            Сохранить
                        </button>
                    }
                </div>
                <div className="profile__credentials">
                    <h1>Учётные данные:</h1>
                    <form className="profile__params">
                        <div className="profile__hint">Имя:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='text'
                                value={firstname}
                                onChange={e => setFirstname(e.target.value)}
                            />
                            :
                            <div className="profile__hint">{firstname}</div>
                        }
                        <div className="profile__hint">Фамилия:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='text'
                                value={lastname}
                                onChange={e => setLastname(e.target.value)}
                            />
                            :
                            <div className="profile__hint">{lastname}</div>
                        }
                        <div className="profile__hint">Отчество:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='text'
                                value={patronymic}
                                onChange={e => setPatronymic(e.target.value)}
                            />
                            :
                            <div className="profile__hint">{patronymic}</div>
                        }
                        <div className="profile__hint">Дата рождения:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='text'
                                value={birthdate}
                                onChange={e => setBirthdate(e.target.value)}
                                disabled={true}
                            />
                            :
                            <div className="profile__hint">{birthdate}</div>
                        }
                        <div className="profile__hint">Телефон:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='tel'
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            :
                            <div className="profile__hint">{phone}</div>
                        }
                        <div className="profile__hint">E-mail:</div>
                        {isOwnProfile ?
                            <input
                                className="profile__input"
                                type='email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            :
                            <div className="profile__hint">{email}</div>
                        }
                    </form>
                </div>
            </div>
        </div>
    );
});

export default Profile;