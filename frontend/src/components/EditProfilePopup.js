import React, {useState, useEffect, useContext} from 'react';
import PopupWithForm from './PopupWithForm'; 
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const {onClose, isOpen} = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name || "");
        setDescription(currentUser.about || "");
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name={'edit'}
            title="Редактировать профиль"
            buttonText="Сохранить"
            onSubmit={handleSubmit}
          >
            <input type="text" name="name" id="name" placeholder="Имя" minLength="2" maxLength="40"
              className="form__input" required value={name} onChange={(e) => setName(e.target.value)}/>
            <span className="form__input-error form__name-error"></span>
            <input type="text" name="job" id="job" placeholder="О себе" minLength="2" maxLength="200"
              className="form__input" required value={description} onChange={(e) => setDescription(e.target.value)}/>
            <span className="form__input-error form__job-error"></span>
          </PopupWithForm>
    )
}


export default EditProfilePopup;