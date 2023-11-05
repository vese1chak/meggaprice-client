import React from 'react';
// импорт компонентов из пакета react-router-dom
import {Routes, Route, Navigate} from "react-router-dom"
// импорт массивов, каждый элемент которых будет обработан далее
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";

const AppRouter = () => {
    const isAuth = true
    return (
        // группировка всех маршрутов. Если ни один не отработает - выполнится самый последний
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;