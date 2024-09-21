import {selectIsLoggedIn} from "../../redux/auth/selectors.ts";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {FC} from "react";

const PublicRoute: FC<{ children: React.ReactElement, restricted?: boolean }> = ({children, restricted = false}) => {
    const loggedIn = useSelector(selectIsLoggedIn);
    const shouldRedirect = loggedIn && restricted

    return shouldRedirect ? <Navigate to='/contacts'/> : children;
}

export default PublicRoute;