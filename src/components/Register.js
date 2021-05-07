import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({email, text, onRegister}) {
    const [data, setData] = React.useState({ email: '', password: '' });

    function handleChange(e) {
        const {name, value} = e.target;
        setData({ ...data, [name]: value });
    }
    
    function handleSubmit(e){
        e.preventDefault()
        onRegister(data);
    } 
    
    return (
        <>
            <Header email={email} text={text} link="/sign-in"/>
            <section className="register page__section">
                    <h2 className="popup__form-title">Регистрация</h2>
                    <form onSubmit={handleSubmit} className="popup__form">
                        <input required onChange={handleChange} className="popup__form-input" type="email" name="email" placeholder="Email" value={data.email}></input>
                        <input required onChange={handleChange} className="popup__form-input" type="password" name="password" placeholder="Пароль" value={data.password}></input>
                        < button className="popup__form-button">Зарегистрироваться</button>
                        <Link  to="/sign-in" className="popup__form-link" >Уже зарегистрированы? Войти</Link>
                    </form>
            </section>
        </>
        
    )
}

export default Register; 