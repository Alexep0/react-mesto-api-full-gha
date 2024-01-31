import React from 'react';
import Card from "./Card"
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar-cont" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар"></img>
            <div className="profile__avatar-mouse-on"></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile} aria-label="profile-edit"></button>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>

        <button type="button" className="profile__add-button" onClick={props.onAddPlace} aria-label="profile-add"></button>
      </section>

      <section className="elements">
        {
          props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />))
        }
      </section>
    </main>
  )
}

export default Main;