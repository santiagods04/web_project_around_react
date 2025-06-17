export default function ImagePopup(props) {
    const { card, onClose } = props;
    return (
        <section className="popup popup__show">
            <div className="popup__content_content_image">
                <img
                    src="/images/icon-close.svg"
                    alt="Cerrar"
                    className="popup__icon"
                    onClick={onClose}
                />
                <img src={card.link} alt={card.name} className="popup__img" />
                <h2 className="popup__img-description">{card.name}</h2>
            </div>
        </section>
    )
}