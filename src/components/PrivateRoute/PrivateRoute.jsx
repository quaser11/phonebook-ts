import {selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {Navigate ,Route} from "react-router-dom";
import {useSelector} from "react-redux";

const PrivateRoute = ({children}) => {
    const loggedIn = useSelector(selectIsLoggedIn)

    return loggedIn ? children : <Navigate to='/login' />;
}

export default PrivateRoute;