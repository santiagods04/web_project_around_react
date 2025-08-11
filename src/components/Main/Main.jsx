import { useState, useEffect, useContext } from "react";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/NewCard/NewCard";
import EditAvatar from "./components/Popup/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/EditProfile/EditProfile";
import ImagePopup from "./components/Popup/ImagePopup/ImagePopup";
import Card from "./components/Card/Card";
import api from "../../utils/Api.js";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main() {
  const [cards, setCards] = useState([]);
  const [popup, setPopup] = useState(null);
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const editAvatarPopup = { title: "Editar avatar", children: <EditAvatar /> };
  const editProfilePopup = { title: "Editar perfil", children: <EditProfile /> };
  const currentUser = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);
  
  useEffect(() => {
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
  }, []);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__image-container">
            <img src={currentUser?.avatar} alt={currentUser?.name} className="profile__image" />
            <div className="profile__image-overlay">
              <img src="/images/icon-edit-a.svg" alt="Editar perfil" className="profile__image-pencil" onClick={() => handleOpenPopup(editAvatarPopup)} />
            </div>
          </div>

          <div className="profile__txt">
            <div className="profile__cont-edit">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button className="profile__icon-edit" onClick={() => handleOpenPopup(editProfilePopup)}></button>
            </div>
            <p className="profile__description">Explorador</p>
          </div>
        </div>
        <button className="profile__btn-add" onClick={() => handleOpenPopup(newCardPopup)}></button>
      </section>

      
      <section className="elements">
          {cards.map((card) => (
            <Card key={card._id} card={card} handleOpenPopup={setSelectedCard}/>
          ))}
      </section>

      {popup !== null ? <Popup onClose={handleClosePopup} title={popup.title}>{popup.children}</Popup> : 
        selectedCard && (<ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />)}
    </main>
  );
}