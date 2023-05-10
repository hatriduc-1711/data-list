import React from 'react';
import { useState } from 'react';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { replace } from 'connected-react-router';

import logo from '../../../logo-420-x-108.png';
import SignUpForm from '../components/SignUpForm';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { ISignUpParams } from '../../../models/auth';
import { API_PATHS } from '../../../configs/api';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ROUTES } from '../../../configs/routes';
import { getErrorMessageResponse } from '../../../utils';

function SignUpPage() {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    // const [locations, setLocations] = useState([]);

    // const getLocations = React.useCallback(async () => {
    //     setLoading(true);

    //     const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));

    //     setLoading(false);

    //     if (json?.code === RESPONSE_STATUS_SUCCESS) {
    //         // setLocations(json.data);
    //     }
    // }, []);

    // useEffect(() => {
    //     getLocations();
    // }, [getLocations]);

    const onSignUp = React.useCallback(
        async (values: ISignUpParams) => {
            setErrorMessage('');
            setLoading(true);

            const json = await dispatch(fetchThunk(API_PATHS.signUp, 'post', values));

            setLoading(false);

            if (json?.code === RESPONSE_STATUS_SUCCESS) {
                alert('Chúc mừng bạn đăng ký thành công!');
                dispatch(replace(ROUTES.login));
                return;
            }

            setErrorMessage(getErrorMessageResponse(json));
        },
        [dispatch],
    );

    return (
        <div
            className="container"
            style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <img src={logo} alt="" style={{ maxWidth: '250px', margin: '20px' }} />
            <SignUpForm onSignUp={onSignUp} loading={loading} errorMessage={errorMessage} />
        </div>
    );
}

export default SignUpPage;
