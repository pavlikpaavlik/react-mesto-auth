import React from 'react';

function ImagePopup(props) {
    return (
          <div className={`popup popup_photo-zoom ${props.card.link? "popup_opened":""}`} id="popupImg">
            <div className="popup__container-place">
              <img className="popup__photo" src={props.card.link} alt={props.card.name} />
              <figcaption className="popup__place">{props.card.name}</figcaption>
              <button className="popup__close-button" onClick={props.onClose} />
            </div>
          </div>
    )
}

export default ImagePopup;