import React, { useContext, useEffect } from 'react';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import GoodList from '../components/GoodList';
import { fetchGoods, fetchTypes } from '../http/goodAPI';

const Shop = observer(() => {
    const {good} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => good.setTypes(data));
        fetchGoods(null).then(data => {
            good.setGoods(data);
        });
        // checkSeller().then(data => {
        //     if (data) {
        //         seller.setSeller(data)
        //         seller.setIsAuth(true)
        //     } else {
        //         console.log('Ошибка в checkSeller, Shop.js')
        //     }
        // })
        // profileSeller(seller.seller.id).then(data => {
        //     seller.setProfile(data)
        // })
    }, []);

    return (
        <div className='container min-height-750'>
            <div className='sales'></div>
            <div className='shop'>
                <div className='parameters'>
                    <div className="parameters__title">Подбор по параметрам</div>
                    {good.types.map(type =>
                        <div
                            key={type.id}>
                            {type.id === good.selectedType.id &&
                                <div>
                                    <div>Категория: {type.name}</div>
                                </div>
                            }
                        </div>
                    )}
                </div>
                <div className='goods'>
                    <div className="top-sales">
                        <div className="top-sales__title">Хиты продаж</div>
                        <GoodList />
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Shop;