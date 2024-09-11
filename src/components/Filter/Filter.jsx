import TextField from "@mui/material/TextField";
import {setFilter} from "../../redux/filters/slice.js";
import {useDispatch} from "react-redux";


const Filter = () => {
    const dispatch = useDispatch();

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value));
    }

    return <TextField id="standard-basic" label="Search" variant="standard" sx={{width: '300px'}}
                      onChange={handleChange}/>
}

export default Filter