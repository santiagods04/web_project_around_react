import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const { card, handleOpenPopup, onCardLike, onCardDelete, isLiked } = props;
  const { currentUser } = useContext(CurrentUserContext);
  const cardLikeButtonClassName = `elements__icon-like ${
    isLiked ? "elements__icon-like_active" : ""
  }`;

   function handleDeleteClick() {
    onCardDelete(card);           
  }
  
  return (
    <div className="elements__target">
      <button className="elements__icon-delete" onClick={handleDeleteClick}></button>
      <img src={card.link} alt={card.name} className="elements__image" onClick={() => handleOpenPopup(card)}/>
      <div className="elements__txt-cont">
        <h2 className="elements__txt">{card.name}</h2>
        <button className={cardLikeButtonClassName} onClick={onCardLike}></button>
      </div>
    </div>
  )
}