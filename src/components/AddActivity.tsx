import React, {useState} from 'react';
import { Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons"
import AddActivityFields from './AddActivityFields';
import { IActivity } from '../interfaces/Interfaces';
import { ICellRendererParams } from 'ag-grid-community';


type Props = {
    customer: ICellRendererParams
    activities: string[]
    fetchActivityTypes: () => Promise<void>
}

export default function AddActivity(props: Props) {
    const [visible, setVisible] = useState<boolean>(false);
    const [newActivity, setNewActivity] = useState<IActivity["activity"]>({});

    // posts an activity and updates the available activity list
    const addActivity = async (activity: IActivity["activity"]) => {
        try {
            const settings = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(activity)
            }
            const response = await fetch('https://customerrest.herokuapp.com/api/trainings', settings);
            if (response.ok) {
                props.fetchActivityTypes();
                message.success('Activity added!');
            }
        }
        catch(error) {
            console.error(error)
        }
    };

    // form handling
    const showForm = () => {
        setVisible(true);
        setNewActivity({...newActivity, customer: props.customer.value});
    };

    const handleSave = () => {
        addActivity(newActivity);
        setVisible(false);
        clearActivity();        
    };

    const handleCancel = () => {
        setVisible(false);
        clearActivity();
    };

    // clearing the activity state object
    const clearActivity = () => {
        setNewActivity({
        date: '',
        activity: '',
        duration: undefined,
        customer: ''
        })
    };
    
    return (
        <div>
            <PlusOutlined style={{color: "#135200"}} onClick={showForm} />
            <Modal
            title={'Add training activity for ' + props.customer.data.firstname + ' ' 
            + props.customer.data.lastname}
            visible={visible}
            onOk={handleSave}
            okText="Save"
            onCancel={handleCancel}>
            <AddActivityFields activities={props.activities} newActivity={newActivity} 
            setNewActivity={setNewActivity} />
        </Modal>

        </div>
    )
}