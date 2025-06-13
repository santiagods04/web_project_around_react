function Main() {
  return (
    <main className="main">
        <section className="profile">
          <div className="profile__main">
            <div className="profile__image-container">
              <img src="" alt="Aquí hay una imagen" className="profile__image"/>
              <div className="profile__image-overlay">
                <img src="./images/icon-edit-a.svg" alt="Editar avatar" className="profile__image-pencil"/>
              </div>
            </div>
            <div className="profile__txt">
              <div className="profile__cont-edit">
                <h1 className="profile__name">Jacques Cousteau</h1>
                <button className="profile__icon-edit"></button>
              </div>
              <p className="profile__description">Explorador</p>
            </div>
        </div>
          <button className="profile__btn-add"></button>
        </section>
        
        <section className="popup" id="popupU">
          <form className="popup__form" id="popupU__form" required>
            <img src="./images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon" id="popupU__icon"/>
            <h1 className="popup__header" id="popupU__header">Editar perfil</h1>
            <input type="text" value="" placeholder="Nombre" className="popup__input" id="input-name" name="name" minlength="2" maxlength="40" required/>
            <span className="popup__error" id="input-name-error"></span>
            <input type="text" value="" placeholder="Profesión" className="popup__input" id="input-job" name="job" minlength="2" maxlength="200" required/>
            <span className="popup__error" id="input-job-error"></span>
            <button type="submit" className="popup__button" id="popupU__btn">Guardar</button>
          </form>
      </section>
      
      <section className="popup" id="popupS">
        <form className="popup__form" id="popupS__form" required>
          <img src="./images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon" id="popupS__icon"/>
          <h1 className="popup__header" id="popupS__header">Nuevo lugar</h1>
          <input type="text" value="" placeholder="Título" className="popup__input" id="input-title" name="title" minlength="2" maxlength="30" required/>
          <span className="popup__error" id="input-title-error"></span>
          <input type="url" value="" placeholder="Enlace de la imagen" className="popup__input" id="input-url-card" name="link" required/>
          <span className="popup__error" id="input-url-card-error"></span>
          <button className="popup__button" id="popupS__btn">Crear</button>
        </form>
      </section>
      
        <section className="elements"></section>
          
        <template className="template-card">
          <div className="elements__target">
            <button className="elements__icon-delete"></button>
            <img src=" " alt="" className="elements__image"/>
            <div className="elements__txt-cont">
              <h2 className="elements__txt"></h2>
              <button className="elements__icon-like"></button>
            </div>
          </div>
        </template>
        
        <section className="popup-bigcard" id="popup-big">
          <div className="popup-bigcard__container">
            <img src="./images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon popup-bigcard__icon"/>
            <img src=" " alt=" " className="popup-bigcard__img"/>
            <h1 className="popup-bigcard__description"></h1>
          </div>
        </section>
        
        <section className="popup" id="popup-confirm">
          <div className="popup__form" id="popup-confirm__content">
            <img src="./images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon" id="popup-confirm__icon"/>
            <h1 className="popup__header" id="popup-confirm__header">¿Estás seguro/a?</h1>
            <button className="popup__button" id="popup-confirm__btn">Si</button>
          </div>
        </section>
        
        <section className="popup" id="popupA">
          <form className="popup__form" id="popupA__form" required>
            <img src="./images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon" id="popupA__icon"/>
            <h1 className="popup__header" id="popupA__header">Cambiar foto de perfil</h1>
            <input type="url" value="" placeholder="Enlace de la imagen" className="popup__input" id="input-url-avatar" name="avatar" required/>
            <span className="popup__error" id="input-url-avatar-error"></span>
            <button className="popup__button" id="popupA__btn">Guardar</button>
          </form>
        </section>
      </main>
  );
}

export default Main;