import React, {useState} from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const history = useHistory();

  const [isEditProfilePopupOpen, setProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({name:'', about: '', avatar: ''});
  const [userEmail, settUserEmail] =  React.useState('');
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpened, setIsTooltipOpened] = useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = useState(false);

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

  React.useEffect(() => {
    tokenCheck()
  }, [])

  React.useEffect(() => {
    if (loggedIn) {
        history.push("/");
    }
  }, [loggedIn])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id); 
      api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(err);
        });
    }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;
    api.deleteCard(card._id, isOwn)
    .then(() => {
      setCards((cards) => cards.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
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

  function openInfoPopup() {
    setIsTooltipOpened(true);
}

function closeInfoPopup() {
  setIsTooltipOpened(false);
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

    const handleRegister = (data) => {
      const {password, email} = data;
      return auth.register({password, email})
          .then((res) => {
              if (!res || res.statusCode === 400) throw new Error('Что-то пошло не так');
              setIsSuccessAuth(true);
              openInfoPopup();
              history.push('/sign-in');
          })
          .catch((err) => {
              console.log(`Ошибка: ${err}`)
              setIsSuccessAuth(false);
              openInfoPopup();
          });
      
  }

  const handleLogin = (data) => {
      const {password, email} = data;
      return auth.login({password, email})
      .then((data) => {
          if (!data) throw new Error('Неверные имя пользователя или пароль');
          if (data.token) {
              localStorage.setItem('jwt', data.token);
              tokenCheck();
              history.push('/');
          } else {
              localStorage.removeItem('jwt');
              history.push('/sign-in');
          }
      })
      .catch((err) => {
          console.log(`Ошибка: ${err}`);
      });
      
  }

  const handleLogout = () => {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
      history.push('/sign-in');
  };

  const tokenCheck = () => {
      if (localStorage.getItem('jwt')) {
          const jwt = localStorage.getItem('jwt');
          auth.getToken(jwt)
          .then((res) => {
              settUserEmail (res.data.email);
              setLoggedIn(true);
              history.push('/');
          })
          .catch((err) => { console.log(`Ошибка: ${err}`)})
  }}

return (
  <>
  <CurrentUserContext.Provider value={currentUser}>
  <div className="root">
    <div className="page">
    <Switch>
      <Route path="/sign-in">
        <Login email={userEmail} text={'Регистрация'} onLogin={handleLogin}/>
      </Route>
        <ProtectedRoute exact path="/" 
          component={Main}
          onEditProfile={handleEditProfileClick}  
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          email={userEmail}
          loggedIn={loggedIn}
          text={'Выйти'}
          onClick={handleLogout}>
        </ProtectedRoute>
      <Route path="/sign-up">
        <Register email={userEmail} text={'Войти'} onRegister={handleRegister}/>
      </Route>
    </Switch> 
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/> 
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateAvatar} /> 
    <PopupWithForm name="popupConfirm" title="Вы уверены?" textBtn="Да" />
    <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    <InfoTooltip isOpen={isTooltipOpened} onClose={closeInfoPopup} name="tooltip" auth={isSuccessAuth}/>
    </div>
  </div>
  </CurrentUserContext.Provider>
  </>
  );
}

export default App;