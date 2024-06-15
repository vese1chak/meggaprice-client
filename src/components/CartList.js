import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import CartItem from "./CartItem";

const CartList = observer(() => {
    const {good} = useContext(Context);

    return (
        <div className='card__container'>
            {good.cartGoods.map(good =>
                <CartItem key={good.id} good={good} />
            )}
        </div>
    );
});

export default CartList;