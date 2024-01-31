function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup__img-container">
                <button type="button" className="popup__button-close" onClick={props.onClose}></button>
                <figure className="popuop__figure">
                    <img src={props.card.link || ""} alt={props.card.name || ""} className="popup__img" />
                    <figcaption className="popup__caption"> {props.card.name || ""} </figcaption>
                </figure>
            </div>
        </div>
    );
}
export default ImagePopup;