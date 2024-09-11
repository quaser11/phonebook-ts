import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {Form} from './ContactsForm.js'
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import {useDispatch, useSelector} from "react-redux";
import {addContact, editContact} from '../../redux/contacts/operations.js'
import {selectIsLoading} from "../../redux/contacts/selectors.js";
import {useEffect} from "react";
import toast, {Toaster} from 'react-hot-toast';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ContactsForm = ({action, contactId, contact}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const Loading = useSelector(selectIsLoading)

    const onSubmit = (e, id = null) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (data.name === '' || data.number === '') {
            return
        }

        if (action === 'create contact') {
            dispatch(addContact(data))
            return toast.success(`Contact ${data.name} has been added successfully.`)
        } else if (action === 'edit') {
            dispatch(editContact({
                id,
                body: data
            }))
            toast.success(`Contact ${data.name} has been updated successfully.`)
        }

        e.target.reset()
    }

    useEffect(() => {
        if (!Loading) {
            handleClose()
        }

    }, [Loading])
    return (
        <>
            <Box>
                <Button onClick={handleOpen}
                        sx={action === 'create contact' ? {bgcolor: '#1976d2', color: 'white'} : null}>{action}</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Form onSubmit={(e) => onSubmit(e, contactId)}>
                            <TextField name='name' label="Name" variant="standard"
                                       defaultValue={action === 'edit' ? contact.name : null}/>
                            <TextField name='number' label="Number" variant="standard"
                                       defaultValue={action === 'edit' ? contact.number : null}/>
                            <Button sx={{bgcolor: '#1976d2', color: 'white'}} type='submit'
                                    disabled={Loading}>{Loading ?
                                <CircularProgress sx={{color: 'white'}} size='24px'/> : action}</Button>
                        </Form>
                    </Box>
                </Modal>
            </Box>
            <Toaster/>
        </>
    );
}

export default ContactsForm;