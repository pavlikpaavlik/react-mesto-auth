import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()

    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [props.isOpen]);

    function handleAvatarSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            avatar: avatarRef.current.value
        });
    }

return (
    <PopupWithForm  isOpen={props.isOpen} onClose={props.onClose} onUpdateUser={props.onUpdateUser} name="popupAvatar" title="Обновить аватар" textBtn="Сохранить" onSubmit={handleAvatarSubmit}  children = {
        <>
               <input required name="avatar" placeholder="Ссылка на аватар" id="avatar-link" className="popup__input popup__input_value_avatar" type="url" ref={avatarRef}/>
               <span className="popup__input-error" id="avatar-link-error"></span>
        </>
        }/>
)
}

export default EditAvatarPopup;