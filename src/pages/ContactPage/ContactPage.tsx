import Container from "@mui/material/Container";
import ContactsForm from "../../components/ContactsForm/ContactsForm.tsx";
import ContactsList from '../../components/ContactsList/ContactsList.js'
import Filter from '../../components/Filter/Filter.js'
import {Menu} from './ContactPage'
import {useDispatch} from 'react-redux'
import {fetchContacts} from '../../redux/contacts/operations'
import {useEffect} from "react";
import {AppDispatch} from "../../redux/store";

const ContainerStyles = {
    m: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '30px'
}
const ContactPage = () => {
    const dispatch: AppDispatch = useDispatch()

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