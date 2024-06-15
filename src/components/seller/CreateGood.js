import React, { useContext, useEffect, useState } from 'react';
import {Context} from '../../index'
import { createGood, fetchTypes } from '../../http/goodAPI';
import { observer } from 'mobx-react-lite';
import {Dropdown} from "react-bootstrap";

const CreateGood = observer(({id}) => {
    const {good, seller} = useContext(Context);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => good.setTypes(data))
    }, []);

    const addInfo = (e) => {
        e.preventDefault()
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    };
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number));
    };
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    };
    const selectFile = e => {
        setFile(e.target.files[0]);
    }
    const clearData = () => {
        console.log('Очищено')
    }
    const addGood = () => {
        const formData = new FormData();
        formData.append('title', name);
        formData.append('description', description);
        formData.append('price', `${price}`);
        formData.append('sellerId', seller.profile.seller.id);
        formData.append('img', file);
        formData.append('typeId', good.selectedType.id);
        formData.append('info', JSON.stringify(info));
        createGood(formData)
    };

    return (
        <div className='container'>
            <div className='create-good'>
                <form>
                    <h2 className="create-good__hint">Выберите категорию</h2>
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary">{good.selectedType.name || "Выберите категорию"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {good.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => good.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <h2 className="create-good__hint">Введите название товара</h2>
                    <input
                        className='create-good__input'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Введите название товара'
                    />
                    <h2 className="create-good__hint">Введите описание товара</h2>
                    <input
                        className='create-good__input'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Введите описание товара'
                    />
                    <h2 className="create-good__hint">Введите стоимость товара</h2>
                    <input
                        className='create-good__input'
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder='Введите стоимость товара'
                        type='number'
                    />
                    <h2 className="create-good__hint">Введите id продавца</h2>
                    <input
                        className='create-good__input'
                        value={id}
                        placeholder='Введите id продавца'
                        type='number'
                        disabled={true}
                    />
                    <h2 className="create-good__hint">Выберите фотографию</h2>
                    <input
                        type='file'
                        onChange={selectFile}
                        style={{alignSelf: "center"}}
                    />
                    <hr className='create-good__double' />
                    <button onClick={addInfo} className='create-good__double'>Добавить новое свойство</button>
                    <div className="create-good__info">
                        <div className="create-good__keys">
                            {info.map(i =>
                                <div key={i.number} className='create-good__key'>
                                    <input
                                        placeholder='Введите название свойства'
                                        value={i.title}
                                        onChange={(e) => changeInfo('title', e.target.value, i.number)} />
                                </div>
                            )}
                        </div>
                        <div className="create-good__values">
                            {info.map(i =>
                                <div key={i.number} className='create-good__value'>
                                    <input
                                        placeholder='Введите описание свойства'
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)} />
                                    <div>
                                        <button onClick={() => removeInfo(i.number)}>Удалить</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
                <div className='create-good__buttons'>
                    <button className='clear' onClick={clearData}>Очистить</button>
                    <button className='append' onClick={addGood}>Добавить</button>
                </div>
            </div>
        </div>
    );
});

export default CreateGood;