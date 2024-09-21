import {selectIsLoggedIn} from "../../redux/auth/selectors.ts";
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {FC} from "react";

const PrivateRoute:FC<{children: React.ReactElement}> = ({children}) => {
    const loggedIn = useSelector(selectIsLoggedIn)

    return loggedIn ? children : <Navigate to='/login' />;
}

export default PrivateRoute;