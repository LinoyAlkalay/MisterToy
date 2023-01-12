import { NavLink } from 'react-router-dom'
import imgUrl from '../assets/imgs/hero.jpg'

export function AppHeader() {

    return <section className="app-header full main-layout">
        {/* <img className="full" src={imgUrl} alt="" /> */}
        <div className="main-header">
            <h1>Toy Store</h1>
            <nav className="nav-app">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
        </div>
    </section>
}