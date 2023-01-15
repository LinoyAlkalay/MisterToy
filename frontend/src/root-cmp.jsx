import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './assets/scss/main.scss'

import { store } from './store/store'
import { HomePage } from './views/home-page'
import { ToyIndex } from './views/toy-index'
import { AboutUs } from './views/about-us'
import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'
import { ToyEdit } from './views/toy-edit'
import { ToyDetails } from './views/toy-details'
import { DashboardPage } from './views/dashboard-page'
import SignIn from './views/sign-in'
import SignUp from './views/sgin-up'

export default function App() {
  return (
    <Provider store={store}>
      <Router>

        <section className="app main-layout">

          <AppHeader />

          <Routes>
            <Route element={<HomePage />} path="/" />
            <Route element={<ToyIndex />} path="/toy" />
            <Route element={<ToyEdit />} path="/toy/edit" />
            <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
            <Route element={<ToyDetails />} path="/toy/:toyId" />
            <Route element={<AboutUs />} path="/about" />
            <Route element={<DashboardPage />} path="/dashboard" />
            <Route element={<SignIn />} path="/signin" />
            <Route element={<SignUp />} path="/signup" />
          </Routes>

          {/* <AppFooter /> */}

        </section>

      </Router>
    </Provider>
  )
}
