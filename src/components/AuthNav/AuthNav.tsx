import Button from "@mui/material/Button";
import {Link} from './AuthNav.ts'
import {FC} from "react";

const AuthNav:FC = () => {
    return <>
        <Button sx={{my: 2, color: 'white'}}>
            <Link to='/register'>Register</Link>
        </Button>
        <Button sx={{my: 2, color: 'white'}}>
            <Link to='login'>Log in</Link>
        </Button>
    </>
}

export default AuthNav;