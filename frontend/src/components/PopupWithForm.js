function PopupWithForm(props) {
    
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__button-close"></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className={`form popup__form`} onSubmit={props.onSubmit}>
                        {props.children}
                        <button type="submit" className="popup__button form__submit">
                            {props.buttonText}
                        </button>
                </form>
            </div>
        </div>
    )
}


export default PopupWithForm;