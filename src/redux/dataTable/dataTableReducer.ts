import { ActionData, StateDataTable } from '../../models/dataTable';

const initState = {
    filter: {
        status: '',
        client: '',
        from: '',
        to: '',
    },
    data: [
        {
            id: '1',
            status: 'Processing',
            date: '17/11/2002',
            client: 'Duc',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '2',
            status: 'Pending',
            date: '17/11/2002',
            client: 'Trung',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '3',
            status: 'Fulfilled',
            date: '17/11/2002',
            client: 'Hieu',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '4',
            status: 'Received',
            date: '17/11/2002',
            client: 'Hoang',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '5',
            status: 'Received',
            date: '17/11/2002',
            client: 'Duc',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '6',
            status: 'Received',
            date: '17/11/2002',
            client: 'Duc',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '7',
            status: 'Received',
            date: '17/11/2002',
            client: 'Duc',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
        {
            id: '8',
            status: 'Received',
            date: '17/11/2002',
            client: 'Duc',
            currency: 'USD',
            total: '2,300.00',
            invoice: 'deb129bb-d675-4a60-95e4-884ddbf38d13',
        },
    ],
};

const dataTableReducer = (state: StateDataTable = initState, action: ActionData) => {
    switch (action.type) {
        case 'deleteData':
            return {
                ...state,
                data: state.data.filter((data) => data.id !== action.payload),
            };
        case 'filterData':
            return {
                ...state,
                // filter: action.payload,
            };
        default:
            return state;
    }
};

export default dataTableReducer;
