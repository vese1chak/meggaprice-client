// импорт путей
import {
    ADMIN_ROUTE,
    BASKET_ROUTE,
    FAVORITE_ROUTE, GOOD_ROUTE,
    LOGIN_ROUTE,
    ORDERS_ROUTE,
    PROFILE_ROUTE,
    QUESTIONS_ROUTE, REGISTRATION_ROUTE, SELLER_ROUTE, SHOP_ROUTE
} from "./utils/consts";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import Favorite from "./pages/Favorite";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Questions from "./pages/Questions";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import Seller from "./pages/Seller";
import GoodPage from "./pages/GoodPage";

// массив страниц, к которым имеет доступ только авторизованный пользователь
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
        path: FAVORITE_ROUTE,
        Component: Favorite
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: QUESTIONS_ROUTE,
        Component: Questions
    }
]

// массив страниц, к которым имеет доступ даже неавторизованный пользователь
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: SELLER_ROUTE,
        Component: Seller
    },
    {
        path: GOOD_ROUTE + '/:id', // указываем для просмотра товара по адресу .../good/1 и т.д.
        Component: GoodPage
    }
]