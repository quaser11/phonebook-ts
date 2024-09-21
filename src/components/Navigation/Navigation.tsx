import {Outlet} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import {Link} from './Navigation.js'
import {FC, useState, MouseEvent} from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AuthNav from '../AuthNav/AuthNav.tsx'
import {useSelector, useDispatch} from 'react-redux'
import * as authSelectors from "../../redux/auth/selectors.ts";
import {logOutFromAccount} from "../../redux/auth/operations.ts";
import {AppDispatch} from "../../redux/store.ts";


const pages = ['home', 'contacts'];
const settings = ['Log Out'];

const Navigation: FC = () => {
    const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);
    const [anchorElUser, setAnchorElUser] = useState<HTMLElement | null>(null);
    const navigate = useNavigate()
    const name = useSelector(authSelectors.selectName)
    const isLogIn = useSelector(authSelectors.selectIsLoggedIn)
    const dispatch: AppDispatch = useDispatch()

    const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e: MouseEvent<HTMLElement>) => {
        setAnchorElUser(null);

        const button = e.target as HTMLElement

        if (button.nodeName === "DIV") {
            return
        }
        dispatch(logOutFromAccount());
    };

    const onLogoClick = () => {
        navigate('/')
    }
    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={onLogoClick}
                        >
                            My Contacts
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography sx={{textAlign: 'center'}}>
                                            {page}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    <Link to={page === 'home' ? '/' : '/contacts'}>{page}</Link>
                                </Button>
                            ))}
                        </Box>

                        {!isLogIn && <Box>
                            <AuthNav/>
                        </Box>}

                        {isLogIn && <Box sx={{flexGrow: 0}}>
                            <Box component='span' sx={{margin: '0 20px 0 0', cursor: 'default'}}>Welcome, {name}</Box>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt={name?.toUpperCase()} src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography sx={{textAlign: 'center'}}>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>}
                    </Toolbar>
                </Container>
            </AppBar>
            <Outlet/>
        </>
    );
}

export default Navigation