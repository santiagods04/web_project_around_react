import { useState } from "react";

export default function NewCard(props) {

  const {onAddPlaceSubmit} = props;
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlaceSubmit?.({ name, link });
  };

  

  return (
    <form className="popup__form" onSubmit={handleSubmit} required>
      <input type="text"  placeholder="Título" className="popup__input" id="input-title" name="title" minLength="2" maxLength="30" onChange={(e) => setName(e.target.value)} required />
      <span className="popup__error" id="input-title-error"></span>
      <input type="url" placeholder="Enlace de la imagen" className="popup__input" id="input-url-card" name="link" onChange={(e) => setLink(e.target.value)} required />
      <span className="popup__error" id="input-url-card-error"></span>
      <button className="popup__button" id="popupS__btn">Crear</button>
    </form>
  )
}
