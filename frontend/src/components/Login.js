import React, { useState } from 'react';

export default function Login(props) {
    const { onLogin } = props;

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin({
            email: login,
            password,
        });
    }

    return (
        <div className='sign'>
            <div className='sign__container'>
                <h1 className='sign__title'>Вход</h1>
                <form className={`form`} onSubmit={handleSubmit}>
                    <div>
                        <input type="email" name="login" id="login" placeholder="Email" className="form__input form__input_type-black"
                            required value={login} onChange={(e) => setLogin(e.target.value)} />
                        <span className="form__input-error form__link-error"></span>
                    </div>

                    <div>
                        <input type="password" name="password" id="password" placeholder="Пароль" minLength="2" maxLength="30"
                            className="form__input form__input_type-black" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                             />
                        <span className="form__input-error form__title-error"></span>
                    </div>

                    <button type="submit" className="form__submit sign__button">Войти</button>
                </form>
            </div>
        </div>
    );
}