import React, {useState} from 'react';
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import { ICellRendererParams } from 'ag-grid-community';

type Props = {
    fetchCustomers: () => Promise<void>
    customerParams: ICellRendererParams
}

export default function DeleteCustomer(props: Props) {
    const [visible, setVisible] = useState<boolean>(false);

    const deleteCustomer = async (url: string) => {
        try {
            const settings = {method: 'DELETE'}
            const response = await fetch(url, settings)
            if (response.ok) {
                props.fetchCustomers();
                message.success('Customer deleted!')   
            } else message.error('Could not delete customer!')
        }
        catch(error) {
            console.error(error)
        }
    };

    // confirmation popup and delete confirmation handling

    const showConfirm = () => {
        setVisible(true);
    };

    const handleDelete = () => {
        deleteCustomer(props.customerParams.value)
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return (
        <div>
            <DeleteFilled style={{color: "#f5222d"}} onClick={showConfirm} />
            <Popconfirm title="Do you wish to delete this customer?" okText="Delete"
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel} />
        </div>
    )
};

