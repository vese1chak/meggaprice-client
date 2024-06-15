import React, {useState} from 'react';
import Modal from './../reused/Modal';
import {createApplication, isApplicationExist} from "../../http/adminAPI";
import {SHOP_ROUTE} from "../../utils/consts";
import {useNavigate} from "react-router-dom";

const Application = ({active, setActive}) => {
    const history = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [reason, setReason] = useState('')

    const click = async (e) => {
        try {
            e.preventDefault()
            if (!name || !email || !phone || !reason) {
                return alert('Введите необходимые данные!')
            } else if (!email.includes('@')) {
                return alert('Неверная почта!')
            } else if (!password || !repassword) {
                return alert('Введите пароль!')
            } else if (!(password === repassword)) {
                return alert('Пароли не совпадают!')
            } else {
                if (!await isApplicationExist(email)) {
                    let data = await createApplication(name, email, phone, password, reason)
                } else {
                    alert('Кто-то уже подал заявку с подобной почтой')
                }
            }
            window.location.reload()
            history(SHOP_ROUTE)
        } catch (e) {
            alert(e)
            console.log(e)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <div className="application">
                <div className="application__title">
                    Регистрация продавца
                </div>
                <form className='application__form'>
                    <div className="application__hint">
                        *Введите имя:
                    </div>
                    <div className="application__input">
                        <input
                            name='name'
                            type='text'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="application__hint">
                        *E-Mail:
                    </div>
                    <div className="application__input">
                        <input
                            name='email'
                            type='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="application__hint">
                        *Номер телефона:
                    </div>
                    <div className="application__input">
                        <input
                            name='phone'
                            type='tel'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="application__hint">
                        *Введите желаемый пароль:
                    </div>
                    <div className="application__input">
                        <input
                            name='password'
                            type='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="application__hint">
                        *Повторите пароль:
                    </div>
                    <div className="application__input">
                        <input
                            name='repassword'
                            type='password'
                            value={repassword}
                            onChange={e => setRepassword(e.target.value)}
                        />
                    </div>
                    <div className="application__reason">
                        <textarea
                            rows='4'
                            placeholder='*Почему выбрали нас и что собираетесь продавать? М?'
                            value={reason}
                            onChange={e => setReason(e.target.value)}
                        />
                    </div>
                    <label className='application__checkbox'>
                        <input
                            name="remember"
                            type="checkbox"
                            value="" />
                        Даю согласие на обработку персональных данных
                    </label>
                    <label className='application__checkbox'>
                        <input
                            name="remember"
                            type="checkbox"
                            value="" />
                        Подписаться на рассылку новостей
                    </label>
                    <button onClick={click}>Подать заявку</button>
                </form>
            </div>
        </Modal>
    );
};

export default Application;