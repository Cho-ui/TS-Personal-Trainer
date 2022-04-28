import React, {useState} from 'react';
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

type Props = {
    activityid: number
    fetchActivities: () => Promise<void> 
}

export default function DeleteTraining(props: Props) {
    const [visible, setVisible] = useState<boolean>(false);

    const deleteActivity = async(id: number) => {
        try {
            const settings = {method: 'DELETE'};
            const response = await fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, settings);
            if (response.ok) {
                props.fetchActivities();
                message.success('Activity deleted!');
            }
            else message.error('Could not delete activity!');
        } 
        catch(error) {
            console.error(error)
        }
    };

    const showConfirm = () => {
        setVisible(true);
    };

    const handleDelete = () => {
        deleteActivity(props.activityid);
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return(
        <div>
            <DeleteFilled style={{color: "#f5222d"}} onClick={showConfirm} />
            <Popconfirm title="Do you wish to delete this activity?" okText="Delete"
            visible={visible}
            onConfirm={handleDelete}
            onCancel={handleCancel}>
            </Popconfirm>
        </div>
    )
};