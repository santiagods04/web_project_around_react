export default function Card(props) {
  const { card, handleOpenPopup } = props;
  return (
    <div className="elements__target">
      <button className="elements__icon-delete"></button>
      <img src={card.link} alt={card.name} className="elements__image" onClick={() => handleOpenPopup(card)}/>
      <div className="elements__txt-cont">
        <h2 className="elements__txt">{card.name}</h2>
        <button className="elements__icon-like"></button>
      </div>
    </div>
  )
}