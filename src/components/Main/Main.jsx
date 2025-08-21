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
  const [loadingCards, setLoadingCards] = useState(true);
  
  useEffect(() => {
    if (!currentUser?._id) return;
    setLoadingCards(true);
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(err => console.log('Error al cargar tarjetas:', err))
      .finally(() => setLoadingCards(false));
  }, [currentUser?._id]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null); 
  }

  const didCurrentUserLike = (card) =>
  (typeof card?.isLiked === "boolean"
    ? card.isLiked
    : card?.likes?.some((u) => (u?._id || u) === currentUser?._id)) ?? false;

 
  function handleCardLike(card) {
    const wasLiked = didCurrentUserLike(card);

    api.handleLikeCard(card._id, wasLiked)
      .then((res) => {
        const fromApi = res?.data ?? res?.card ?? res ?? {};

        // 1) Optimista / fallback
        setCards((prev) =>
          prev.map((c) => {
            if (c._id !== card._id) return c;

            // Base: si la API trae la card, úsala; si no, usa la actual
            const base = fromApi && fromApi._id ? fromApi : c;

            // Likes garantizados: usa los de la API si vienen; si no, toggle local
            let next = { ...base };
            if (Array.isArray(fromApi?.likes)) {
              next.likes = fromApi.likes;
            } else if (typeof base.isLiked === "boolean") {
              next.isLiked = !wasLiked; // la API trabaja con booleano
            } else {
              next.likes = wasLiked
                ? c.likes.filter((u) => (u._id || u) !== currentUser?._id)
                : [...(c.likes || []), { _id: currentUser?._id }];
            }
            return next;
          })
        );

        // 2) Re-sync con el backend para que al refrescar coincida
        return api.getInitialCards();
      })
      .then((fresh) => setCards(fresh))
      .catch((e) => console.error("Error al alternar like:", e));
  }
  
  async function handleCardDelete(card) {
    try {
      await api.handleDeleteCard(card._id);            // llamada a la API
      setCards((state) => state.filter((c) => c._id !== card._id)); // inmutabilidad con filter()
    } catch (error) {
        console.error("Error al eliminar tarjeta:", error);
      }
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
            <Card key={card._id || card.id} card={card} isLiked={didCurrentUserLike(card)} onLike={() => handleCardLike(card)} onCardDelete={handleCardDelete} handleOpenPopup={setSelectedCard}/>
          ))}
      </section>

      {popup !== null ? <Popup onClose={handleClosePopup} title={popup.title}>{popup.children}</Popup> : 
        selectedCard && (<ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />)}
    </main>
  );
}