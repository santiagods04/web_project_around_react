import { useRef, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = avatarRef.current?.value?.trim();
    if (!url) return; 

    try {
      await handleUpdateAvatar(url);
    } catch (err) {
      console.error("No se pudo actualizar avatar:", err);
    }
  };
  return (
    <form className="popup__form" onSubmit={handleSubmit} required>
      <input type="url" placeholder="Enlace de la imagen" className="popup__input" id="input-url-avatar" name="avatar" required ref={avatarRef}/>
      <span className="popup__error" id="input-url-avatar-error"></span>
      <button className="popup__button" id="popupA__btn">Guardar</button>
    </form>
  )
}