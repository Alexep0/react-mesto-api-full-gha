import React, {useState, useEffect, useContext, useRef} from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup(props) {
    const {onClose, isOpen, onUpdateAvatar} = props;
    
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
          avatar: inputRef.current.value /* Значение инпута, полученное с помощью рефа */,
        });
    } 

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name={'avatar'}
            title="Обновить аватар"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
          >
            <div>
              <input ref={inputRef} type="url" name="link" id="avatar-link" placeholder="Ссылка на аватар" className="form__input" required></input>
              <span className="form__input-error form__avatar-link-error"></span>
            </div>
          </PopupWithForm>
    )
}


export default EditAvatarPopup;