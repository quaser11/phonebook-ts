import {selectIsLoggedIn} from "../../redux/auth/selectors.js";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const PublicRoute = ({children, restricted = false}) => {
    const loggedIn = useSelector(selectIsLoggedIn);
    const shouldRedirect = loggedIn && restricted

    return shouldRedirect ? <Navigate to='/contacts'/> : children;
}

export default PublicRoute;