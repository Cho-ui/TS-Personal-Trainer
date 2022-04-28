import React, {useState} from 'react';
import { Modal, Button } from 'antd';
import { ICustomer } from '../interfaces/Interfaces';
import AddCustomerFields from './AddCustomerFields';

type Props = {
    fetchCustomers: () => Promise<void>
}

export default function AddCustomer(props: Props) {
    const [customer, setCustomer] = useState<ICustomer["customer"]>({});
    const [visible, setVisible] = useState<boolean>(false);

    const addCustomer = async (customer: ICustomer["customer"]) => {
        try {
            const settings = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(customer)
            }
            const response = await fetch('https://customerrest.herokuapp.com/api/customers', settings)
            console.log(response);
            props.fetchCustomers();
        }
        catch(error) {
            console.error(error)
        }
    } 

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({...customer, [e.target.name]: e.target.value})
    };

    const clearCustomer = () => {
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
            });   
    };

    const showForm = () => {
        setVisible(true);
    };

    const handleSave = () => {
        addCustomer(customer);
        setVisible(false);
        clearCustomer();
    };
   
    const handleCancel = () => {
        setVisible(false);
        clearCustomer();
    }; 

    return (
        <div>
            <Button type="primary" onClick={showForm}>
                Add Customer
                </Button>
                <Modal
                title="Add Customer"
                visible={visible}
                onOk={handleSave}
                okText="Save"
                onCancel={handleCancel}>
                <AddCustomerFields customer={customer} 
                setCustomer={setCustomer} inputChanged={inputChanged} />
            </Modal>
        </div>
    )
}