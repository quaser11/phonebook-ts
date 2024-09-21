import Navigation from './Navigation/Navigation.tsx';
import {Routes, Route} from "react-router-dom";
import HomePage from '../pages/HomePage/HomePage.tsx'
import SignUp from '../pages/SignUp/SignUp.tsx'
import LogIn from '../pages/LogIn/LogIn.tsx'
import ContactPage from '../pages/ContactPage/ContactPage.tsx'
import PrivateRoute from './PrivateRoute/PrivateRoute.js'
import PublicRoute from './PublicRoute/PublicRoute.js'
import {useDispatch, useSelector} from "react-redux";
import {fetchCurrentUser} from "../redux/auth/operations.js";
import {FC, useEffect} from 'react'
import {selectRefreshing} from "../redux/auth/selectors.js";
import toast, {Toaster} from 'react-hot-toast';
import {AppDispatch} from "../redux/store";

const App:FC = function() {
    const dispatch: AppDispatch = useDispatch();
    const refreshing:boolean = useSelector(selectRefreshing);

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [dispatch])

    return (
        <>
            {!refreshing && <Routes>
                <Route path="/" element={<Navigation/>}>
                    <Route index path="/" element={<PublicRoute><HomePage/></PublicRoute>}/>
                    <Route path='/contacts' element={<PrivateRoute><ContactPage/></PrivateRoute>}/>
                    <Route index path="/login" element={<PublicRoute restricted><LogIn/></PublicRoute>}/>
                    <Route path="/register" element={<PublicRoute restricted><SignUp/></PublicRoute>}/>
                </Route>
            </Routes>}
            <Toaster/>
        </>
    )
}

export default App
