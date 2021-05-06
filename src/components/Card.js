import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const cardData = props.cardData;
    function handleClick() {
        props.onCardClick(cardData);
    }
        function handleLikeClick() {
            props.onCardLike(cardData);
        } 
    
        function handleDeleteClick() {
            props.onCardDelete(cardData);
        } 
    
        const currentUser = React.useContext(CurrentUserContext);
        const isOwn = cardData.owner._id === currentUser._id;
        const isLiked = cardData.likes.some(i => i._id === currentUser._id);

    return(
        <li className="grid-element">
            <img src = {cardData.link} alt={cardData.name} className="grid-element__photo" onClick={handleClick} />
            <div className="grid-element__info">
                <h3 className="grid-element__title">{cardData.name}</h3>
                    <div className="grid-element__like">
                        <button type="button" className={`grid-element__like-button ${isLiked && "grid-element__like-button_theme_black"}`} onClick={handleLikeClick}></button>
                        <span className="grid-element__like-counter">{cardData.likes.length}</span>
                    </div>
                    <div className="grid-element__trash" onClick={handleDeleteClick} style={{display: isOwn? 'block': 'none' }}></div>
            </div>
        </li>
    ) 
}

export default Card;