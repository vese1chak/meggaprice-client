import React, {useContext, useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {fetchGoods} from "../../http/goodAPI";
import {Context} from "../../index";
import GoodItem from "../GoodItem";

const RecomendationList = observer(() => {
    const {good} = useContext(Context)

    useEffect(() => {
        fetchGoods(null).then(data => {
            good.setRecomendations(data)
        })
    }, [])

    return (
        <div className='recomendation__container'>
            {good.recomendations.slice(0, 5).map(item =>
                <GoodItem key={item.id} good={item} />
            )}
        </div>
    );
});

export default RecomendationList;