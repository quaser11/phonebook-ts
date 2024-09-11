import Container from "@mui/material/Container";
import ContactsForm from '../ContactsForm/ContactsForm.jsx'
import ContactsList from '../ContactsList/ContactsList.jsx'
import Filter from '../Filter/Filter.jsx'
import {Menu} from './Contacts.js'
import {useDispatch} from 'react-redux'
import {fetchContacts} from '../../redux/contacts/operations.js'
import {useEffect} from "react";

const ContainerStyles = {
    m: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '30px'
}
const Contacts = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    return <Container sx={ContainerStyles}>
        <Menu>
            <ContactsForm action='create contact'/>
            <Filter/>
        </Menu>
        <ContactsList/>
    </Container>
}

export default Contacts;