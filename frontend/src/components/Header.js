import logo from '../images/logo-header.svg';
import { Link, useNavigate, Route, Routes, Navigate } from 'react-router-dom';

function Header({ email, onSignOut }) {

    const navigate = useNavigate();


    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта Место."></img>
                <Routes>
                    <Route
                        path='/sign-in'
                        element={<Link className="header__link" to="/sign-up">
                            Регистрация
                        </Link>}
                    />

                    <Route
                        path='/sign-up'
                        element={<Link className="header__link" to="/sign-in">
                            Войти
                        </Link>}
                    />

                    <Route
                        path='/'
                        element={<div className="header__logout">
                            <h2 className="header__email">{email}</h2>
                            <Link onClick={onSignOut} className="header__link" to="/sign-in">
                                Выйти
                            </Link>
                        </div>}
                    />
                </Routes>
        </header>
    )
}

export default Header;