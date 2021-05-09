import React from 'react';

function PopupWithForm(props) {

    return(
        <section className={`popup ${props.isOpen? "popup_opened": ""}`}  id={props.name}>   
            <div className="popup__container"> 
                <form className="popup__form" name={`form-${props.name}`} noValidate onSubmit={props.onSubmit}>  
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button> 
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__save">{props.textBtn}</button>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;