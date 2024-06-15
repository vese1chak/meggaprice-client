import React, {useContext, useEffect, useState} from 'react';
import background from '../assets/img/Rectangle 400.jpg'
import {observer} from "mobx-react-lite";
import Catalog from "../components/seller/Catalog";
import About from "../components/seller/About";
import CreateGood from "../components/seller/CreateGood";
import {checkSeller, profileSeller} from "../http/sellerAPI";
import {Context} from "../index";
import Spinner from "./Spinner";
import {useLocation, useParams} from "react-router-dom";
import {SELLER_ROUTE} from "../utils/consts";

const Seller = observer(() => {
    const {seller} = useContext(Context)
    const [section, setSection] = useState(1)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    const [createdAt, setCreatedAt] = useState('')
    const [name, setName] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [email, setEmail] = useState('')
    const [img, setImg] = useState('')
    const [cardImg, setCardImg] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const location = useLocation()
    const isOwnSellerProfile = location.pathname === SELLER_ROUTE + '/' + seller.seller.id

    useEffect(() => {
        checkSeller().then(data => {
            if (data) {
                console.log(data, 'успешно вошли в аккаунт продавца')
                seller.setSeller(data)
                seller.setIsAuth(true)
                profileSeller(seller.seller.id).then(data => seller.setProfile(data))
            } else {
                console.log('Продавец не авторизован. Произошла ошибка')
            }
        })
        profileSeller(id).then(data => {
            setCreatedAt(`С ${new Date(data.seller.createdAt).getUTCDate() + 1}.${new Date(data.seller.createdAt).getMonth() + 1}.${new Date(data.seller.createdAt).getFullYear()}`)
            setName(data.seller.name)
            setPhonenumber(data.seller.phonenumber)
            setEmail(data.seller.email)
            setImg(data.seller.img)
            setCardImg(data.seller.cardImg)
            setAddress(data.seller.address)
            setDescription(data.seller.description)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner />
    }

    const renderSwitch = () => {
        switch(section) {
            case 1:
                return <Catalog />
            case 2:
                return <About createdAt={createdAt} description={description} email={email} phonenumber={phonenumber} address={address} isOwnSellerProfile={isOwnSellerProfile}/>
            case 3:
                return <CreateGood id={id}/>
        }
    }

    return (
        <div className='container min-height-750'>
            <div className="seller">
                <div className="seller__img"><img src={background} alt="bg"/></div>
                <div className="seller__title">{name}</div>
                <div className="seller__buttons">
                    <button className="seller__button" onClick={() => setSection(1)}>Каталог</button>
                    <button className="seller__button" onClick={() => setSection(2)}>О продавце</button>
                    {isOwnSellerProfile &&
                        <button className="seller__button" onClick={() => setSection(3)}>Добавить товар</button>
                    }
                </div>
                {renderSwitch()}
            </div>
        </div>
    );
});

export default Seller;