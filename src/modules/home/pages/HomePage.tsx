import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FcCalendar } from 'react-icons/fc';
import { IoIosArrowDown } from 'react-icons/io';
import { RiDeleteBin3Line } from 'react-icons/ri';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
// @ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import '../../../scss/tableDataList.scss';
import { Data, FilterData } from '../../../models/dataTable';
import { dataRemainingSelector, filterSelector } from '../../../redux/dataTable/dataTableSelector';
import { AppState } from '../../../redux/reducer';
import { deleteData, filterData } from '../../../redux/dataTable/dataTableActions';

const HomePage = () => {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const dataSelect = useSelector(dataRemainingSelector);
    const filterSelect = useSelector(filterSelector);

    const [dateFrom, setDateFrom] = useState<string>('');
    const [dateTo, setDateTo] = useState<string>('');
    const [startDateFrom, setStartDateFrom] = useState<Date>(new Date());
    const [startDateTo, setStartDateTo] = useState<Date>(new Date());
    const [showDatePickerFrom, setShowDatePickerFrom] = useState<boolean>(false);
    const [showDatePickerTo, setShowDatePickerTo] = useState<boolean>(false);
    const [showDetailData, setShowDetailData] = useState<boolean>(false);
    const [idDataDetail, setIdDataDetail] = useState<string>('');
    const [filter, setFilter] = useState<FilterData>(filterSelect);

    const dataDetail = dataSelect.find((data) => data.id === idDataDetail);

    const handleApply = () => {
        dispatch(filterData(filter));
    };

    const handleClear = () => {
        setFilter({
            status: '',
            client: '',
            from: '',
            to: '',
        });
        dispatch(filterData(filter));
    };

    const handleOpenDataDetail = (id: string) => {
        setIdDataDetail(id);
        setShowDetailData(true);
    };

    const handleDelete = (id: string) => {
        const isDelete = window.confirm('Are you sure you want to delete !!!');
        if (isDelete) {
            dispatch(deleteData(id));
        }
    };

    const handleUpdate = () => {
        setShowDetailData(false);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                <div className="wrapper-table">
                    <div className="heading">
                        <h2 className="title">Payroll Transactions List</h2>
                        <select className="select-export">
                            <option>Export CSV</option>
                        </select>
                    </div>
                    <div className="filter-bar">
                        <select
                            className="status-select options-filter"
                            value={filter.status}
                            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                        >
                            <option>Status</option>
                            <option value="Processing">Processing</option>
                            <option value="Pending">Pending</option>
                            <option value="Fulfilled">Fulfilled</option>
                            <option value="Received">Received</option>
                        </select>
                        <select
                            className="options-filter"
                            value={filter.client}
                            onChange={(e) => setFilter({ ...filter, client: e.target.value })}
                        >
                            <option>Client</option>
                            <option value="Duc">Duc</option>
                            <option value="Trung">Trung</option>
                            <option value="Hieu">Hieu</option>
                            <option value="Hoang">Hoang</option>
                        </select>
                        <div className="wrapper-filter-date">
                            <div
                                className="date-from options-filter"
                                onClick={() => setShowDatePickerFrom(!showDatePickerFrom)}
                            >
                                <span>{dateFrom || 'From'}</span>
                                <FcCalendar />
                            </div>
                            {showDatePickerFrom && (
                                <div className="date-picker">
                                    <DatePicker
                                        selected={startDateFrom}
                                        onSelect={() =>
                                            setDateFrom(
                                                `${startDateFrom.getDate()}/${
                                                    startDateFrom.getMonth() + 1
                                                }/${startDateFrom.getFullYear()}`,
                                            )
                                        }
                                        onChange={(date: Date) => setStartDateFrom(date)}
                                        inline
                                    />
                                </div>
                            )}
                        </div>
                        <div className="wrapper-filter-date">
                            <div
                                className="date-to options-filter"
                                onClick={() => setShowDatePickerTo(!showDatePickerTo)}
                            >
                                <span>{dateTo || 'To'}</span>
                                <FcCalendar />
                            </div>
                            {showDatePickerTo && (
                                <div className="date-picker">
                                    <DatePicker
                                        selected={startDateTo}
                                        onSelect={() =>
                                            setDateTo(
                                                `${startDateTo.getDate()}/${
                                                    startDateTo.getMonth() + 1
                                                }/${startDateTo.getFullYear()}`,
                                            )
                                        }
                                        onChange={(date: Date) => setStartDateTo(date)}
                                        inline
                                    />
                                </div>
                            )}
                        </div>
                        <div className="options-filter">
                            <span>Invoice #</span>
                        </div>
                        <button className="button-apply" onClick={handleApply}>
                            Apply
                        </button>
                        <button className="button-clear" onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                    <ul className="table-data-list">
                        <li className="header-table">
                            <span className="column">Status</span>
                            <span className="column2">Date</span>
                            <span className="column3">Client</span>
                            <span className="column4">Currency</span>
                            <span className="column5">Total</span>
                            <span className="column6">Invoice #</span>
                            <span className="space"></span>
                        </li>
                        <div className="body-table">
                            {dataSelect.map((data: Data) => {
                                return (
                                    <li className="data-item" key={data.id}>
                                        <span className={`column ${data.status}`}>{data.status}</span>
                                        <span className="column2">{data.date}</span>
                                        <span className="column3">{data.client}</span>
                                        <span className="column4">{data.currency}</span>
                                        <span className="column5">{data.total}</span>
                                        <span className="column6">{data.invoice}</span>
                                        <div className="column7">
                                            <button
                                                className="button-view-detail"
                                                onClick={() => handleOpenDataDetail(data.id)}
                                            >
                                                View Details <IoIosArrowDown />
                                            </button>
                                            <button className="button-delete" onClick={() => handleDelete(data.id)}>
                                                <RiDeleteBin3Line />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </ul>
                </div>
            </div>
            {showDetailData && (
                <div className="background-modal">
                    <div className="wrapper-modal-detail">
                        <div className="detail-data">
                            <span className="name">Status:</span>
                            <span className={`data ${dataDetail?.status}`}>{dataDetail?.status}</span>
                        </div>
                        <div className="detail-data">
                            <span className="name">Date:</span>
                            <span className="data">{dataDetail?.date}</span>
                        </div>
                        <div className="detail-data">
                            <span className="name">Client:</span>
                            <span className="data">{dataDetail?.client}</span>
                        </div>
                        <div className="detail-data">
                            <span className="name">Currency:</span>
                            <span className="data">{dataDetail?.currency}</span>
                        </div>
                        <div className="detail-data">
                            <span className="name">Total:</span>
                            <span className="data">{dataDetail?.total}</span>
                        </div>
                        <div className="detail-data">
                            <span className="name">Invoice:</span>
                            <span className="data">{dataDetail?.invoice}</span>
                        </div>
                        <div className="button-container">
                            <button className="button-update" onClick={handleUpdate}>
                                Update
                            </button>
                            <button className="button-cancel" onClick={() => setShowDetailData(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HomePage;
