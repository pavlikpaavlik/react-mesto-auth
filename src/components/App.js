import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(false)
  const [currentUser, setCurrentUser ] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(()=>{
    api.getInitialCards()
    .then((data)=>{
        setCards(data)
        })
        .catch((err)=>{
          console.log(err)
        })
  }, [])


  React.useEffect(()=>{
    api.getUserProfile()
    .then((res)=>{
      setCurrentUser(res)
      })
      .catch((err)=>{
          console.log(err)
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) { 
      api.likeCard(card._id)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err)=>{
        console.log(err)
        })
      } else {
          api.dislikeCard(card._id)
          .then((newCard) => {  
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            setCards(newCards);
          })
          .catch((err)=>{
              console.log(err)
            })
          }  
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api.deleteCard(card._id, isOwn)
    .then(() => {
      const newCards = cards.filter((c) =>  {
      return (c._id !== card._id) });
      setCards(newCards);
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleUpdateUser(data) {
    api.setUserProfile(data)
    .then((res)=>{
      setCurrentUser(res)
      closeAllPopups();
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  function handleUpdateAvatar(data){
    api.newAvatar(data)
    .then((res) =>{
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleAddPlaceSubmit(data){
    api.addNewCard(data)
    .then((newCard) => {
      setCards(
        [newCard, ...cards]     
      )
      closeAllPopups()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function handleEditProfileClick() {
    setProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  } 

  function closeAllPopups() {
    setProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(false)
  }

return (
  <>
  <CurrentUserContext.Provider value={currentUser}>
  <div className="root">
    <div className="page">
    <Header/>
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} cards={cards}/>
    <Footer/>
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} /> 
    <PopupWithForm name="popupConfirm" title="Вы уверены?" textBtn="Да" />
    <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  </div>
  </CurrentUserContext.Provider>
  </>
  );
}

export default App;