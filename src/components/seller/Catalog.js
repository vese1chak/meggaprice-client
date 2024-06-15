import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import '../../assets/css/style.css'
import {useParams} from "react-router-dom";
import {fetchSellerGoods} from "../../http/sellerAPI";
import GoodItem from "../GoodItem";
import {observer} from "mobx-react-lite";
import Spinner from "../Spinner";

const Catalog = observer(() => {
    const {seller} = useContext(Context);
    const {id} = useParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSellerGoods(id).then(data => {
            seller.setGoods(data)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <div className='seller__body'>
                <div className='parameters'>
                    <div className="parameters__title">Подбор по параметрам</div>
                </div>
                <div className='goods'>
                    <div className="seller__goods">
                        {seller.goods.map(item =>
                            <GoodItem good={item} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Catalog;