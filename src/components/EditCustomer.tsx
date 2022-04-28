import React, {useState} from "react";
import { Modal } from 'antd';
import { ToolOutlined } from "@ant-design/icons";
import { ICustomer } from "../interfaces/Interfaces";
import { ICellRendererParams } from "ag-grid-community";
import EditCustomerFields from "./EditCustomerFields";

type Props = {
    customerParams: ICellRendererParams
    fetchCustomers: () => Promise<void>
}

export default function EditCustomer(props: Props) {
    const [customer, setCustomer] = useState<ICustomer["customer"]>({});
    const [visible, setVisible] = useState<boolean>(false);

    const editCustomer = async (url: string, updatedCustomer: ICustomer["customer"]) => {
        try {
            const settings = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(updatedCustomer)
            }
            const response = await fetch(url, settings)
            console.log(response);
            props.fetchCustomers();
        }
        catch(error) {
            console.error(error)
        }
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

    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({...customer, [e.target.name]: e.target.value})
    };

    
    // form pre-fill and handling
    const showForm = () => {
        setCustomer({
        firstname: props.customerParams.data.firstname,
        lastname: props.customerParams.data.lastname,
        streetaddress: props.customerParams.data.streetaddress,
        postcode: props.customerParams.data.postcode,
        city: props.customerParams.data.city,
        email: props.customerParams.data.email,
        phone: props.customerParams.data.phone
        })
        setVisible(true);
    };

    // Saving a customer to db, closing the form and clearing the customer state
    const handleSave = () => {
        editCustomer(props.customerParams.value, customer);
        setVisible(false);
        clearCustomer();
    };
    
    // closing the form and clearing the customer state
    const handleCancel = () => {
        setVisible(false);
        clearCustomer();
    };

    return(
        <div>
            <ToolOutlined style={{color: "#597ef7"}} onClick={showForm} />
                <Modal
                title="Edit Customer Info"
                visible={visible}
                onOk={handleSave}
                okText="Save"
                onCancel={handleCancel}>
                <EditCustomerFields customer={customer} 
                setCustomer={setCustomer} inputChanged={inputChanged} />
            </Modal>
        </div>
    )
}