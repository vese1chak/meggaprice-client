import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect} from 'react';
import { Context } from '..';
import GoodItem from './GoodItem';
import {fetchGoods} from "../http/goodAPI";

const GoodList = observer(() => {
    const {good} = useContext(Context);

    useEffect(() => {
        fetchGoods(good.selectedType.id).then(data => {
            good.setGoods(data)
        })
    }, [good.selectedType])

    const filteredGoods = good.goods.filter(item => {
        return item.title.toLowerCase().includes(good.searchValue.toLowerCase())
    })

    return (
        <div className='card__container'>
            {filteredGoods.map(good =>
                <GoodItem key={good.id} good={good} />
            )}
        </div>
    );
});

export default GoodList;