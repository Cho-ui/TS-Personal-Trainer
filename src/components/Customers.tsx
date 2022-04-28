import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ICustomer } from '../interfaces/Interfaces';
import { Space } from 'antd';
import { ICellRendererParams } from 'ag-grid-community';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteCustomer from './DeleteCustomer';
import AddActivity from './AddActivity';
import { IActivity } from '../interfaces/Interfaces';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


export default function Customers() {
    const [customers, setCustomers] = useState<ICustomer["customerArray"]>([]);
    const [activityTypes, setActivityTypes] = useState<string[]>([]);


    useEffect(() => {
        fetchCustomers();
        fetchActivityTypes();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/api/customers');
            const data = await response.json();
            setCustomers(data.content);
        }
        catch(error) {
            console.error(error);
        }
    };

    const fetchActivityTypes = async () => {
        try {
            const response = await fetch('https://customerrest.herokuapp.com/api/trainings');
            const data = await response.json();
            const allActivities: string[] = data.content.map(
                (session: IActivity["activityWithoutCustomer"]) => session.activity);
            const filteredActivities = [...new Set(allActivities)];
            setActivityTypes(filteredActivities);
        }
        catch(error) {
            console.error(error);
        }
    };

    const columns = [
        {field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 120},
        {field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 120},
        {field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 120},
        {field: 'email', headerName: 'Email', sortable: true, filter: true},
        {field: 'phone', headerName: 'Telephone', sortable: true, filter: true, width: 120},
        {field: 'city', headerName: 'City', sortable: true, filter: true, width: 120},
        {field: 'links.0.href', headerName: '', sortable: false, filter: true, width: 50,
        cellRenderer: (params: ICellRendererParams) => <AddActivity customer={params} 
        activities={activityTypes} fetchActivityTypes={fetchActivityTypes} />},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 50,
        cellRenderer: (params: ICellRendererParams) => <EditCustomer customerParams={params} fetchCustomers={fetchCustomers} />},
        {field: 'links.0.href', headerName: '', sortable: false, filter: false, width: 50,
        cellRenderer: (params: ICellRendererParams) => <DeleteCustomer customerParams={params} fetchCustomers={fetchCustomers} />}
    ];

    return (
        <div>
            <div className="ag-theme-alpine" 
            style={{ marginTop: 10, height: 500, width: '95%'}}>
                <Space style={{ marginBottom: 10 }}>
                    <AddCustomer fetchCustomers={fetchCustomers} />
                </Space>
                <AgGridReact
                    rowData={customers}
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