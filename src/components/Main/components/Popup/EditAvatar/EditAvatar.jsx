export default function EditAvatar() {
  return (
    <form className="popup__form" required>
      <input type="url" value="" placeholder="Enlace de la imagen" className="popup__input" id="input-url-avatar" name="avatar" required />
      <span className="popup__error" id="input-url-avatar-error"></span>
      <button className="popup__button" id="popupA__btn">Guardar</button>
    </form>
  )
}