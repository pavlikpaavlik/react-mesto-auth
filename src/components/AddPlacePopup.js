import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const name = React.useRef()
    const link = React.useRef()

    React.useEffect(() => {
        name.current.value = '';
        link.current.value = '';
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
          name: name.current.value,
          link: link.current.value
        });
      }
    
return(

<PopupWithForm isOpen={props.isOpen} onClose={props.onClose}  name="popupAdd" title="Новое место" textBtn="Создать" onSubmit={handleSubmit} children = {
    <>
       <input ref={name} required minLength="2" maxLength="30" type="text" name="place" placeholder="Название" id="place-input" className="popup__input popup__input_value_place"/>
       <span className="popup__input-error" id="place-input-error"></span>
       <input ref={link} required name="card-url" placeholder="Ссылка на картинку" id="input-url" className="popup__input popup__input_card-link" type="url"/>
       <span className="popup__input-error" id="link-input-error"></span>
    </>
}/>
)
}

export default AddPlacePopup;