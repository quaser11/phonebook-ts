import TextField from "@mui/material/TextField";
import {setFilter} from "../../redux/filters/slice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store.ts";
import {ChangeEvent} from "react";


const Filter = () => {
    const dispatch:AppDispatch = useDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setFilter(e.target.value));
    }

    return <TextField id="standard-basic" label="Search" variant="standard" sx={{width: '300px'}}
                      onChange={handleChange}/>
}

export default Filter