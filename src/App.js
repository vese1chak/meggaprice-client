import React, {useContext, useEffect, useState} from 'react';
// импорт компонента для навигации между страницами
import {BrowserRouter} from "react-router-dom";
// импорт компонента для роутинга
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check, profile} from "./http/userAPI";
import Footer from "./components/Footer";
import {checkSeller} from "./http/sellerAPI";
import Spinner from "./pages/Spinner";
import SupportBtn from "./components/support/SupportBtn";

const App = observer(() => {
    const {user, seller} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUser(data)
                user.setIsAuth(true)
                profile(user.user.id).then(data => user.setProfile(data))
                console.log(data, 'успешно вошли в аккаунт пользователя')
            } else {
                console.log('Пользователь не авторизован. Произошла ошибка')
            }
        })
        checkSeller().then(data => {
            if (data) {
                console.log(data, 'успешно вошли в аккаунт продавца')
                seller.setSeller(data)
                seller.setIsAuth(true)
            } else {
                console.log(data, 'Продавец не авторизован. Произошла ошибка')
            }
        }).finally(() => setLoading(false))
        console.log(user, 'user')
        console.log(seller, 'seller')
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            {user.isAuth &&
                <SupportBtn />
            }
            <Footer />
        </BrowserRouter>
    );
});

export default App;