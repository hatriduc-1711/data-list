import { FilterData } from '../../models/dataTable';

export const deleteData = (id: string) => {
    return {
        type: 'deleteData',
        payload: id,
    };
};

export const filterData = (filter: FilterData) => {
    return {
        type: 'filterData',
        payload: filter,
    };
};
