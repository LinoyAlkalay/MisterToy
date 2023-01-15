import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { logout } from '../store/actions/user.action'
import { LoginSignup } from './login-signup'
import { SET_USER } from '../store/reducers/user.reducer'

export function AppHeader() {
    const user = useSelector((storeState => storeState.userModule.user))
    const dispatch = useDispatch()

    function setUser(user) {
        dispatch({ type: SET_USER, user })
    }

    function onLogout() {
        logout()
            .then(() => {
                setUser(null)
            })
    }

    return <section className="app-header full main-layout">
        <div className="main-header">
            <h1>Toy Store</h1>
            <nav className="nav-app">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {/* <NavLink to="/signin">Sgin In</NavLink> */}
                {/* <NavLink to="/signup">Sgin Up</NavLink> */}
            </nav>

            {user && <section className="user-info">
                <p>{user.fullname}</p>
                <button onClick={onLogout}>Logout</button>
            </section>}

            {!user && <section className="user-info">
                <LoginSignup setUser={setUser} />
            </section>}
        </div>
    </section>
}