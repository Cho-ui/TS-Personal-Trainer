import React, { useEffect, useState } from "react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { ISession } from "../interfaces/Interfaces";
import { IActivity } from "../interfaces/Interfaces";



export default function ActivitySchedule() {
    const [sessions, setSessions] = useState<ISession["sessionArray"]>([{}]);

    // default tz set to GMT with
    const moment = require('moment-timezone');
    moment.tz.setDefault("Europe/London");

    useEffect(() => {
        fetchAndFormatActivities();
    }, []);

    const fetchAndFormatActivities = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/gettrainings');
            const data = await response.json();    
    
            let activities: ISession["session"][] = 
            data.map((activity: IActivity["activityWithCustomer"]) => 
            ({title: `${activity.activity} / ${activity.customer.firstname} ${activity.customer.lastname}`, 
            start: activity.date,
            end: '',
            duration: activity.duration, 
            allDay: false}));

            const amendDates = () => {
                activities.forEach(session =>
                    { if (session.end === '') {
                    const end = moment(session.start); 
                    end.add(session.duration, 'minutes');
                    const endIso = moment(end).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
                    session.end = endIso;}
                })};

            amendDates();
            setSessions(activities);
        }
        catch(error) {
            console.error(error);
        }
    };

    /* On clicking an event, the user gets an alert with the event info.
    Could be replaced with a tooltip or similar if developed further */
    const eventInfo = (info: EventClickArg) => {
        const start = moment(info.event.start).format('HH:mm');
        const end = moment(info.event.end).format('HH:mm');
        const title = String(info.event.title);
        alert(`${start} - ${end} ${title}`);
    }

    return (
        <div style={{ marginTop: 10, marginLeft: 10, width: '95%'}}>
            <FullCalendar 
            plugins={[timeGridPlugin,  dayGridPlugin, momentTimezonePlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,dayGridDay',
              }}
            events={sessions}
            eventClick={eventInfo}
            timeZone='Europe/London'
            height={600}
            allDaySlot={false}
            titleFormat={{month: 'short', day: 'numeric', weekday: 'short', omitCommas: true}}
            dayHeaderFormat={{month: 'short', day: 'numeric', weekday: 'short'}}
            />
        </div>
    )

}