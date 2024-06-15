import React, {useContext} from 'react';
// импорт компонентов из пакета react-router-dom
import {Routes, Route, Navigate} from "react-router-dom"
// импорт массивов, каждый элемент которых будет обработан далее
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = observer(() => {
    const {user} = useContext(Context)
    return (
        // группировка всех маршрутов. Если ни один не отработает - выполнится самый последний
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
});

export default AppRouter;