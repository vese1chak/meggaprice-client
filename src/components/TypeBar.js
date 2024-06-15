import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';

const TypeBar = observer(() => {
    const {good} = useContext(Context);
    return (
        <ul className='catalog'>
            {good.types.map(type =>
                <li
                    className='catalog__item'
                    style={type.id === good.selectedType.id ? {fontWeight: 700} : {fontWeight: 400}}
                    onClick={() => good.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </li>
            )}
        </ul>
    );
});

export default TypeBar;