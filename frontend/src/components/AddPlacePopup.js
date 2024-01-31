import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const { isOpen, onClose } = props;

    const [link, setLink] = useState('');
    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ link, name: title });
    }

    useEffect(() => {
        setLink("");
        setTitle("");
    }, [isOpen]);

    return (
        <PopupWithForm
            onClose={onClose}
            isOpen={isOpen}
            name={'add'}
            title="Новое место"
            buttonText="Создать"
            onSubmit={handleSubmit}
        >
            <div>
                <input type="text" name="title" id="title" placeholder="Название" minLength="2" maxLength="30"
                    className="form__input" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <span className="form__input-error form__title-error"></span>
            </div>
            
            <div>
                <input type="url" name="link" id="link" placeholder="Ссылка на картинку" className="form__input"
                    required value={link} onChange={(e) => setLink(e.target.value)} />
                <span className="form__input-error form__link-error"></span>
            </div>
        </PopupWithForm>
    )
}


export default AddPlacePopup;