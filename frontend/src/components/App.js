import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import React, { useState, useEffect } from 'react';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js';
import { api } from "../utils/Api";
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './Login.js'
import Register from './Register.js'
import ProtectedRoute from './ProtectedRoute.js';
import { authApi } from "../utils/AuthApi";
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    checkToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) getData()
  }, [isLoggedIn])

  useEffect(() => {
    document.title = 'Mesto';
  }, []);

  const checkToken = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      authApi.checkToken(jwt).then((res) => {
        if (res) {
          setIsLoggedIn(true);
          setEmail(res.user.email);
          navigate("/", { replace: true })
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  function getData() {
    api.getUserInfo()
      .then((data) => {
        setСurrentUser(data.user);
        setEmail(data.user.email);
      })
      .catch((err) => {
        console.log(err);
      });

    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (isLiked) {
      api.removeLikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data.avatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
      .then((newCard) => {
        setCards([newCard.card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const navigate = useNavigate();

  function handleRegister(data) {
    authApi.register(data)
      .then(() => {
        navigate('/sign-in');
        setIsSuccessInfoTooltipStatus(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(data) {
    authApi.login(data)
      .then((res) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', res.token);

        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessInfoTooltipStatus(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function signOut() {
    setEmail("");
    localStorage.removeItem('jwt');
    navigate('/sing-in');
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={isLoggedIn}
          email={email}
          onSignOut={signOut}
        />

        <Routes>
          <Route path="/*" element={<Navigate to="/" replace />} />
          <Route
            path='/'
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
              >

                <Main
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                />

              </ProtectedRoute>

            }
          />



          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegister} />}
          />

          <Route
            path='/sign-in'
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>

        <Footer />

        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          success={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
