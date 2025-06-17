export default function NewCard() {
  return (
    <form className="popup__form" required>
      <input type="text" value="" placeholder="Título" className="popup__input" id="input-title" name="title" minlength="2" maxlength="30" required />
      <span className="popup__error" id="input-title-error"></span>
      <input type="url" value="" placeholder="Enlace de la imagen" className="popup__input" id="input-url-card" name="link" required />
      <span className="popup__error" id="input-url-card-error"></span>
      <button className="popup__button" id="popupS__btn">Crear</button>
    </form>
  )
}
