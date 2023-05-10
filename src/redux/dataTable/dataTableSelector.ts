import { createSelector } from 'reselect';
import { RootState } from '../configureStore';

const dataSelector = (state: RootState) => state.dataTable.data;
export const filterSelector = (state: RootState) => state.dataTable.filter;

export const dataRemainingSelector = createSelector(dataSelector, filterSelector, (data, filter) => {
    return data.filter((dataItem) => {
        if (filter.status !== '') {
            if (filter.client !== '') {
                return dataItem && dataItem.status.includes(filter.status) && dataItem.client.includes(filter.client);
            }

            return dataItem && dataItem.status.includes(filter.status);
        }

        return dataItem;
    });
});
