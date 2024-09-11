import {useSelector, useDispatch} from 'react-redux'
import {selectIsLoading, selectVisibleContacts} from "../../redux/contacts/selectors.js";
import {Avatar, List} from 'antd';
import Button from '@mui/material/Button';
import {removeContact} from '../../redux/contacts/operations.js'
import ContactsForm from "../ContactsForm/ContactsForm.jsx";
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

const ContactsList = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectIsLoading)

    const data = useSelector(selectVisibleContacts)

    const handleDeleteClick = (id, name) => {
        toast.success(`Contact ${name} has been deleted`);
        dispatch(removeContact(id))
    }
    return <>
        <List
        itemLayout="horizontal"
        dataSource={data}
        locale={{emptyText: 'No ContactPage'}}
        loading={loading}
        renderItem={(item, index) => (
            <List.Item
                actions={[<Button onClick={() => handleDeleteClick(item.id, item.name)}
                                  disabled={loading}>Delete</Button>,
                    <ContactsForm action='edit' contactId={item.id}
                                  contact={{name: item.name, number: item.number}}/>]}>
                <List.Item.Meta
                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/>}
                    title={<span>{item.name}</span>}
                    description={<a href={`tel:${item.number}`}
                                    style={{textDecoration: 'none', color: '#1976d2'}}>{item.number}</a>}
                />

            </List.Item>
        )}
    />
        <Toaster/>
    </>
}

export default ContactsList;