import React from 'react';
import Header from './Header';

function Login({email, text, onLogin}) {

    const [data, setData] = React.useState({ email: '', password: '' });

    function handleChange(e) {
        const { name, value } = e.target
        setData({ ...data, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(data);
    }

    return (
        <>
            <Header email={email} text={text} link="/sign-up"/>
            <section className="login">
                <h2 className="popup__form-title">Вход</h2>
                <form onSubmit={handleSubmit} className="popup__form">
                    <input onChange={handleChange} className="popup__form-input" type="email" name="email" placeholder="Email"></input>
                    <input onChange={handleChange} className="popup__form-input" type="password" name="password" placeholder="Пароль"></input>
                    <button className="popup__form-button" type="submit">Войти</button>
                </form>
            </section>
        </>
        
    )
}

export default Login; 