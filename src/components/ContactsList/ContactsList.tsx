import {useSelector, useDispatch} from 'react-redux'
import {selectIsLoading, selectVisibleContacts} from "../../redux/contacts/selectors";
import {Avatar, List} from 'antd';
import Button from '@mui/material/Button';
import {removeContact} from '../../redux/contacts/operations'
import ContactsForm from "../ContactsForm/ContactsForm.tsx";
import toast, {Toaster} from 'react-hot-toast';
import {FC} from "react";
import {IContact} from "../../utils/types";
import {AppDispatch} from "../../redux/store";

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

const ContactsList: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const loading = useSelector(selectIsLoading)

    const data = useSelector(selectVisibleContacts)

    const handleDeleteClick = (id: string, name: string) => {
        toast.success(`Contact ${name} has been deleted`);
        dispatch(removeContact(id))
    }
    return <>
        <List
        itemLayout="horizontal"
        dataSource={data}
        locale={{emptyText: 'No Contact'}}
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