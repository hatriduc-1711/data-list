export interface Data {
    id: string;
    status: string;
    date: string;
    client: string;
    currency: string;
    total: string;
    invoice: string;
}

export interface FilterData {
    status: string;
    client: string;
    from: string;
    to: string;
}

export interface ActionData {
    type: string;
    payload: string | FilterData;
}

export interface StateDataTable {
    filter: FilterData;
    data: Data[];
}
