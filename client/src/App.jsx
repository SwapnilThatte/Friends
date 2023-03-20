import './App.css'
import { Login } from './pages/login/Login'
import { Register } from './pages/register/Register'
import { Home } from './pages/home/Home'
import { Profile } from './pages/profile/Profile'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { isAuthenticated } from './cookieManager'
import { Update } from './pages/update/Update'
import { NewPost } from './pages/newPost/NewPost'
import { Search } from './pages/searchPage/Search'
import { FriendProfile } from './pages/FriendProfile/FriendProfile'
import { ComingSoon } from './pages/comingSoon/ComingSoon'
import { About } from './pages/About/About'

function App() {
   
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route
                            index
                            element={isAuthenticated() ? <Home /> : <Login />}
                        />
                        <Route
                            path='about'
                            element={<About/>}
                        />
                        <Route
                            path="login"
                            element={isAuthenticated() ? <Home /> : <Login />}
                        />
                        <Route
                            path="exploreprofile/:id"
                            element={
                                isAuthenticated() ? (
                                    <FriendProfile />
                                ) : (
                                    <Login />
                                )
                            }
                        />
                        <Route
                            path="profile"
                            element={
                                !isAuthenticated() ? <Login /> : <Profile />
                            }
                        />
                        <Route
                            path="home"
                            element={!isAuthenticated() ? <Login /> : <Home />}
                        />
                        <Route
                            path="update"
                            element={
                                !isAuthenticated() ? <Login /> : <Update />
                            }
                        />
                        <Route
                            path="newpost"
                            element={
                                !isAuthenticated() ? <Login /> : <NewPost />
                            }
                        />
                        <Route
                            path="search"
                            element={
                                !isAuthenticated() ? <Login /> : <Search />
                            }
                        />
                        <Route
                            path="register"
                            element={
                                isAuthenticated() ? <Home /> : <Register />
                            }
                        />
                        <Route
                            path="chat"
                            element={
                                isAuthenticated() ? (
                                    <ComingSoon />
                                ) : (
                                    <Register />
                                )
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>

            {/* <Login/> */}

            {/* <Profile/> */}
            {/* <Home/> */}
            {/* <Register/> */}
            {/* <Login/> */}
        </>
    );
}

export default App
