import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import FavoriteItem from "./FavoriteItem";

const CartList = observer(() => {
    const {good} = useContext(Context);

    return (
        <div className='card__container'>
            {good.favoriteGoods.map(good =>
                <FavoriteItem key={good.id} good={good} />
            )}
        </div>
    );
});

export default CartList;