import Button from "@mui/material/Button";
import {Link} from './AuthNav.js'

const AuthNav = () => {
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