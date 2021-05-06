import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return(
        <>
        <main className="content">
            <section className="profile page__section">   
                <div className="profile__avatar">     
                    <img src={currentUser.avatar} alt="Аватарка" className="profile__photo"/>
                    <button type="button" className="profile__avatar-button"  onClick={props.onEditAvatar}></button>
                </div>    
                        <div className="profile__info">
                            <div className="profile__name"
                            ><h1 className="profile__title">{currentUser.name}</h1>
                                <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                            </div>
                            <p className="profile__job">{currentUser.about}</p>          
                        </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>    
        </main>

        <div className="elements page__section">
            <div className="grid-elements">
                {props.cards.map((card)=> (
                <Card key={card._id} cardData={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                )
                )}
            </div>
        </div> 
        </>
    ) 
}

export default Main;