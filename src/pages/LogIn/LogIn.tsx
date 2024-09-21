import {FormikHelpers, useFormik} from 'formik';
import {useState, MouseEvent, FC} from 'react'
import {LogInForm, LogInContainer} from './LogIn.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import * as yup from 'yup';
import {useDispatch} from "react-redux";
import {logInToAccount} from "../../redux/auth/operations";
import {AppDispatch} from "../../redux/store";

interface IValues {
    email:string,
    password:string,
}
const initialValues: IValues = {
    email: '',
    password: ''
}

const validationSchema = yup.object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(7).max(24).required('Password is required')
})

const LogIn:FC = () => {
    const dispatch: AppDispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values:IValues, {resetForm}:FormikHelpers<IValues>) => {
            dispatch(logInToAccount(values))

            resetForm()
        }
    })

    return <LogInContainer>
        <LogInForm onSubmit={formik.handleSubmit}>
            <TextField id="email"
                       name="email"
                       label="Email"
                       value={formik.values.email}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       error={formik.touched.email && Boolean(formik.errors.email)}
                       helperText={formik.touched.email && formik.errors.email}/>
            <FormControl variant="outlined" error={formik.touched.password && Boolean(formik.errors.password)}
            >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <FormHelperText>{formik.errors.password}</FormHelperText>
                )}
            </FormControl >
            <Button type='submit' sx={{
                color: 'white',
                backgroundColor: '#1976d2'
            }}>Log In</Button>
        </LogInForm>
    </LogInContainer>
}

export default LogIn;