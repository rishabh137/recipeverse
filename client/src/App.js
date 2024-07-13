import { Suspense, createContext, useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Loader from "./common/Loader"
import { routes } from "./routes/routes"
import RecipeOverview from "./components/RecipeOverview"

export const UserContext = createContext()
const App = () => {
    const [authUser, setAuthUser] = useState(null)

    const getAuthUser = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users/user", {
                credentials: 'include'
            });
            const data = await res.json();

            if (res.ok) {
                setAuthUser(data.username);
            } else {
                setAuthUser(null)
            }

        } catch (error) {
            setAuthUser(null)
            throw new Error(error)
        }
    }
    useEffect(() => {
        getAuthUser()
    }, [])
    return (
        <UserContext.Provider value={{ authUser, setAuthUser }}>
            <Suspense fallback={<Loader />} >
                <Routes>
                    <Route exact path={routes.signup.path} element={!authUser ? <routes.signup.element /> : <Navigate to={routes.home.path} />} />
                    <Route exact path={routes.login.path} element={!authUser ? <routes.login.element /> : <Navigate to={routes.home.path} />} />
                    <Route exact path={routes.main.path} element={authUser ? <Navigate to={routes.home.path} /> : <Navigate to={routes.login.path} />} />
                    <Route exact path={routes.main.path} element={authUser ? <routes.main.element /> : <Navigate to={routes.login.path} />} >
                        <Route exact path={routes.home.path} element={authUser ? <routes.home.element /> : <Navigate to={routes.login.path} />} />
                        <Route exact path={`${routes.home.path}/:id`} element={authUser ? <RecipeOverview /> : <Navigate to={routes.login.path} />} />
                        <Route exact path={routes.addrecipe.path} element={authUser ? <routes.addrecipe.element /> : <Navigate to={routes.login.path} />} />
                        <Route exact path={routes.myrecipe.path} element={authUser ? <routes.myrecipe.element /> : <Navigate to={routes.login.path} />} />
                    </Route>
                    <Route exact path={routes.invalid.path} element={<Navigate to={`${routes.main.path}`} />} />
                </Routes>
            </Suspense>
        </UserContext.Provider>
    )
}

export default App