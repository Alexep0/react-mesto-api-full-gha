import SuccessImg from "../images/Success.svg";
import UnsuccessImg from "../images/Unsuccess.svg";

function InfoTooltip(props) {
    const success = props.success;

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? `popup_opened` : ""}`}>
            <div className="popup__container">
                <button onClick={props.onClose} type="button" className="popup__button-close"></button>

                <img src={success ? SuccessImg : UnsuccessImg} alt="Иконка" className="popup__icon" />
                
                <h3 className="popup__title-register">  
                {success
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>  
            </div>
        </div>

    )
}


export default InfoTooltip;