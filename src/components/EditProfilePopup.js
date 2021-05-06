import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const [name, setName ] = React.useState('');
    const [description, setDescription ] = React.useState({});

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }  

    const currentUser = React.useContext(CurrentUserContext);
    
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [props.isOpen, currentUser]); 

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
          name,
          about: description
        });
    } 
    
    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} name="popupEdit" title="Редактировать профиль" textBtn="Сохранить" onSubmit={handleSubmit} children = {
        <>
           <input value={name || ""} onChange={handleChangeName} required minLength="2" maxLength="40" type="text" name="name" placeholder="Имя" id="name-input" className="popup__input popup__input_value_name" />
           <span className="popup__input-error" id="name-input-error"></span>
           <input value={description || ""} onChange={handleChangeDescription} required minLength="2" maxLength="200" type="text" name="about" placeholder="Профессия" id="job-input" className="popup__input popup__input_value_job" />
           <span className="popup__input-error" id="job-input-error"></span>
        </>
        }/>
    )
}

export default EditProfilePopup;