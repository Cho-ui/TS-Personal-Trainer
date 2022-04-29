import React, { useEffect, useState } from "react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import { ISession } from "../interfaces/Interfaces";
import { IActivity } from "../interfaces/Interfaces";



export default function ActivitySchedule() {
    const [sessions, setSessions] = useState<ISession["sessionArray"]>([{}]);
    const [formattedS, setFormattedS] = useState<ISession["sessionArray"]>([{}]);

    // default tz set to GMT with
    const moment = require('moment-timezone');
    moment.tz.setDefault("Europe/London");

    useEffect(() => {
        fetchSessions();
    }, []);

    function fetchSessions() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => data.map((activity: IActivity["activityWithCustomer"])  => 
            setSessions(sessions => [...sessions, {title: 
            `${activity.activity} / ${activity.customer.firstname} ${activity.customer.lastname}`, 
            start: activity.date,
            end: '',
            duration: activity.duration, 
            allDay: false}])
            ))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        sessions.forEach(session =>
            { if (session.end === '') {
            const end = moment(session.start); 
            end.add(session.duration, 'minutes');
            const endIso = moment(end).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
            session.end = endIso;}
        });
    }, [sessions]);

    /* trigger a final re-render by copying training object array to the state array
    used by the calendar, ensuring that each end value is saved before the calendar is rendered.
    Without this, the final object in the training array will get its end-value, but
    the calendar will render without it. 
    */
    useEffect(() => {
        setFormattedS(sessions);
    }, [sessions]);

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
            events={formattedS}
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