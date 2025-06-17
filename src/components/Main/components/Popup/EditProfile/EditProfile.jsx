export default function EditProfile() {
  return (
    <form className="popup__form" required>
      <input type="text" value="" placeholder="Nombre" className="popup__input" id="input-name" name="name" minlength="2" maxlength="40" required />
      <span className="popup__error" id="input-name-error"></span>
      <input type="text" value="" placeholder="Profesión" className="popup__input" id="input-job" name="job" minlength="2" maxlength="200" required />
      <span className="popup__error" id="input-job-error"></span>
      <button type="submit" className="popup__button" id="popupU__btn">Guardar</button>
    </form>
  )
}