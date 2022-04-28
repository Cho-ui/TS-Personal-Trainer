import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ICellRendererParams } from 'ag-grid-community';
import { IActivity } from '../interfaces/Interfaces';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



export default function Activities() {
    const [activities, setActivities] = useState<IActivity["activityArray"]>([]);

    // moment and moment-timezone import, default tz set to GMT
    const moment = require('moment-timezone');
    moment.tz.setDefault("Europe/London");

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
    
    const columns = [
    {field: 'customer.firstname', headerName: 'First Name', sortable: true, filter: true},
    {field: 'customer.lastname', headerName: 'Last Name', sortable: true, filter: true},
    {field: 'activity', headerName: 'Activity', sortable: true, filter: true},
    {field: 'duration', headerName: 'Duration (minutes)', sortable: true, filter: true},
    {field: 'date', headerName: 'Date', sortable: true, filter: true,
    cellRenderer: (params: ICellRendererParams) => moment(params.value).format("DD.MM.YYYY HH:mm a")}];

    return (
        <div>
            <div className="ag-theme-alpine" 
            style={{ marginTop: 10, height: 500, width: '95%'}}>
                <AgGridReact 
                rowData={activities} 
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                rowSelection="single"
                suppressCellFocus={true}
                />
            </div>
        </div>
    )
}