export default function Popup(props) {
  
  const {title, children, onClose} = props;

  return (
    <section className="popup" id="popupU">
          <div className="popup__content" id="popupU__form" required>
            <img src="/images/icon-close.svg" alt="Aquí hay un icono" className="popup__icon" id="popupU__icon" onClick={onClose}/>
            <h3 className="popup__header" id="popupU__header">{title}</h3>
            {children}
          </div>
    </section>
  )
}