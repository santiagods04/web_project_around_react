import React, { useState, useEffect } from "react";
import api from "../utils/Api";  
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getInfoUser()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.error("Error cargando usuario:", err));
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;
    api.getInitialCards().then(setCards).catch(console.error);
  }, [currentUser?._id]);

  const didCurrentUserLike = (card) =>
    (typeof card?.isLiked === "boolean"
      ? card.isLiked
      : card?.likes?.some((u) => (u?._id || u) === currentUser?._id)) ?? false;

  const handleCardLike = async (card) => {
    try {
      const wasLiked = didCurrentUserLike(card);
      await api.handleLikeCard(card._id, wasLiked);
      const fresh = await api.getInitialCards();
      setCards(fresh);
    } catch (e) {
      console.error("Error alternando like:", e);
    }
  };

  
  const handleCardDelete = async (card) => {
    try {
      await api.handleDeleteCard(card._id);
      setCards((prev) => prev.filter((c) => c._id !== card._id));
    } catch (e) {
      console.error("Error al eliminar tarjeta:", e);
    }
  };

  const handleAddPlaceSubmit = async ({ name, link }) => {
    try {
      const newCard = await api.newCard({ name, link }); 
      setCards((prev) => [newCard, ...prev]);            
      handleClosePopup();                                 
    } catch (e) {
      console.error("Error al crear tarjeta:", e);
    }
  };

  const handleOpenPopup = (popup) => setPopup(popup);
  const handleClosePopup = () => setPopup(null);

   const handleUpdateUser = (data) => {
      (async () => {
        await api.updateUserInfo(data).then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        });
      })();
    };
  
  const handleUpdateAvatar = (avatarUrl) => {
      (async () => {
        await api.updateAvatar(avatarUrl).then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        });
      })();
  };  
  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onAddPlaceSubmit={handleAddPlaceSubmit} onOpenPopup={handleOpenPopup} onClosePopup={handleClosePopup} popup={popup}/>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  )
}

export default App
