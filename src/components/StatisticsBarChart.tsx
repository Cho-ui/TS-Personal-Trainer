import React, {useState, useEffect} from 'react';
import { groupBy, sumBy } from "lodash";
import { BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { IActivity } from '../interfaces/Interfaces';
import { IStats } from '../interfaces/Interfaces';

type Props = {
    activities: IActivity["activityStatsArray"]
}

export default function StatisticsBarChart(props: Props) {
    const [stats, setStats] = useState<IStats["statObjArray"]>([]);

    /* observes the activity state array, groups the activities, sums each one's total duration,
     sets these into the stats array. Clears the stats array on each pass to maintain unique objects */
     useEffect(() => {
        const groupedActivities = groupBy(props.activities, 'activity');
        setStats([]);
        for (const activity in groupedActivities) {
            const totalTime = sumBy(groupedActivities[activity], 'duration');
            setStats(stats => [...stats, {activity: activity, performed: totalTime}])
        }
    }, [props.activities]);

    return(
        <div>
            <BarChart width={900} height={400} data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity"/>
                <YAxis label={{ value: 'Total (min)', 
                angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="performed" fill="#8884d8"/>
            </BarChart>
        </div>
    )
}