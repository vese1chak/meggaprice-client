import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import {fetchUserGood} from '../http/goodAPI';
import CartList from "../components/CartList";

const Shop = observer(() => {
    const {good, user} = useContext(Context);

    useEffect(() => {
        fetchUserGood(user.user.id, 'cart').then(data => {
            good.setCartGoods(data);
        });
    }, [])

    return (
        <div className='container min-height-750'>
            <div className='sales'></div>
            <div className='shop'>
                <div className='goods'>
                    <div className="top-sales">
                        <div className="top-sales__title">Корзина</div>
                        <CartList />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Shop;