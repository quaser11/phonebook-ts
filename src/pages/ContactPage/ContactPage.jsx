import Container from "@mui/material/Container";
import ContactsForm from '../../components/ContactsForm/ContactsForm.jsx'
import ContactsList from '../../components/ContactsList/ContactsList.jsx'
import Filter from '../../components/Filter/Filter.jsx'
import {Menu} from './ContactPage.js'
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
const ContactPage = () => {
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

export default ContactPage;