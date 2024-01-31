import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const card = props.card;
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    function handleClick() {
        props.onCardClick(card);
    }

    function handleLikeClick() {
        props.onCardLike(card);
    }

    function handleDeleteClick() {
        props.onCardDelete(card);
    }

    return (
        <div className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
            {isOwn && <button type="button" className="element__trash-button" onClick={handleDeleteClick} />}
            <div className="element__bottom-block">
                <h3 className="element__title">{card.name}</h3>
                <div>
                    <button type="button" onClick={handleLikeClick} className={`element__like-button ${isLiked ? 'element__like-button_active' : ""}`}></button>
                    <p className="element__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;