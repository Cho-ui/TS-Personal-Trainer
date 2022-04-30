import React, {useState, useEffect} from 'react';
import { IActivity } from '../interfaces/Interfaces';
import StatisticsBarChart from './StatisticsBarChart';


export default function Statistics() {
    const [activities, setActivities] = useState<IActivity["activityArray"]>([]);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/gettrainings');
            const data = await response.json();
            setActivities(data);
        }
        catch(error) {
            console.error(error);
        }
    };
      
    return(
        <div style={{marginTop: 80}}>
            <StatisticsBarChart activities={activities} />
        </div>
    )
}