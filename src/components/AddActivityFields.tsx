import React, { useState, useEffect } from 'react';
import {DatePicker, TimePicker, Input, Select, InputNumber, Button} from "antd";
import { IActivity } from '../interfaces/Interfaces';
import moment from 'moment';


type Props = {
    activities: string[]
    newActivity: IActivity["activity"]
    setNewActivity: React.Dispatch<React.SetStateAction<IActivity["activity"]>>
}

export default function AddActivityFields(props: Props) {
    const [isNew, setIsNew] = useState<boolean>(false);
    const [ddValue, setDDValue] = useState<string | undefined>();
    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    // moment and moment-timezone import, default tz set to GMT
    const moment = require('moment-timezone');
    moment.tz.setDefault("Europe/London");

    const { Option } = Select;

    /* if either time or date are changed, and the other field is not empty,
    the fields are concatenated into an iso string format derivative 
    used by the back end */

    useEffect(() => {
        if (date && date.length > 0 && time && time.length > 0) {
            const isoDate = date + time;
            props.setNewActivity({...props.newActivity, date: isoDate});
        }
    }, [date, time]) 

    useEffect(() => {
        if (props.newActivity.activity && props.newActivity.activity.length > 0) {
            setIsNew(true)
        } else {
            setIsNew(false)
        }
    }, [props.newActivity]);


    // the activity text inputfield is monitored here
    const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setNewActivity({ ...props.newActivity, [e.target.name]: e.target.value })
    };

    // the dropdown menu is monitored here
    const dropdownChanged = (value: string) => {
        props.setNewActivity({ ...props.newActivity, activity: value })
        setDDValue(value);
    };

    const clearActivity = () => {
        props.setNewActivity({ ...props.newActivity, activity: '' })
        setDDValue(undefined);
    };

    // datepicker date value save
    const dateChanged = (value: moment.Moment | null) => {
        if (value) setDate(value.format('YYYY-MM-DD'));
    }

    // timepicker time value save
    const timeChanged = (value: moment.Moment | null) => {
        if (value) setTime(value.format('[T]HH:mm:ss.SSSZ'));
    }

    // duration field is monitored here
    const durationChanged = (value: number) => {
        props.setNewActivity({...props.newActivity, duration: value})
    }

    return (
        <div>
            <div style={{ marginTop: 5, marginBottom: 5 }}>Select date and time:</div>
            <Input.Group compact>
            <DatePicker style={{width: '50%'}} format='DD-MM-YYYY' onChange={(value) => dateChanged(value)} />
            <TimePicker style={{width: '50%'}} format='HH:mm' onChange={(value) => timeChanged(value)} 
            showNow={false} />
            </Input.Group>
            <div style={{ marginTop: 5, marginBottom: 5 }}>Select a training activity, or input a new one:</div>
            <Input.Group compact>
                <Select value={ddValue} placeholder="Select an activity" disabled={isNew}
                    onChange={(value) => dropdownChanged(value)}>
                    {props.activities.map((activity, i) => {
                        return (
                            <Option value={activity} key={i} name="activity">{activity}</Option>
                        )
                    })}
                </Select>
                <Input placeholder="Input a new activity" style={{ width: '40%', marginLeft: 10 }}
                    name="activity" value={props.newActivity.activity} onChange={inputChanged}
                ></Input>
                <Button onClick={clearActivity}>Clear</Button>
            </Input.Group>
            <div style={{ marginTop: 5, marginBottom: 5 }}>Select duration(min):</div>
            <InputNumber placeholder="0" type="number" onChange={(value) => durationChanged(value)}
            min={15} max={180} step={15} />
        </div>
    )

};