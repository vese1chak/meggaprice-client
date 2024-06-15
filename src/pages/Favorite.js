import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {fetchUserGood} from "../http/goodAPI";
import FavoriteList from "../components/FavoriteList";

const Favorite = () => {
    const {good, user} = useContext(Context);

    useEffect(() => {
        fetchUserGood(user.user.id, 'favorite').then(data => {
            good.setFavoriteGoods(data);
        });
    }, [])

    return (
        <div className='container min-height-750'>
            <div className='sales'></div>
            <div className='shop'>
                <div className='goods'>
                    <div className="top-sales">
                        <div className="top-sales__title">Избранное</div>
                        <FavoriteList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Favorite;