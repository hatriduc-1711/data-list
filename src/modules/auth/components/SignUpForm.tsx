import React, { useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as Yup from 'yup';

import { ISignUpParams, ILocationParams, IStateParams } from '../../../models/auth';
import { AppState } from '../../../redux/reducer';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';

interface Props {
    onSignUp(values: ISignUpParams): void;
    loading: boolean;
    errorMessage: string;
}

const SignUpSchema = Yup.object().shape({
    email: Yup.string().email('emailInvalid').required('emailRequire'),
    password: Yup.string().min(4, 'minPasswordInvalid').required('passwordRequire'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'matchPasswordInvalid')
        .required('passwordRequire'),
    name: Yup.string().required('nameRequire'),
    gender: Yup.string().required('genderRequire'),
    region: Yup.string().required('regionRequire'),
    state: Yup.string().required('stateRequire'),
});

function SignUpForm({ onSignUp, loading, errorMessage }: Props) {
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [locations, setLocations] = useState<Array<ILocationParams>>([]);
    const [state, setState] = useState<Array<IStateParams>>([]);

    const initialValues: ISignUpParams = {
        email: '',
        password: '',
        repeatPassword: '',
        name: '',
        gender: '',
        region: '',
        state: '',
    };

    const getState = async () => {
        const json = await dispatch(fetchThunk(API_PATHS.getState, 'get'));
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setState(json.data);
        }
    };

    const getLocations = async () => {
        const json = await dispatch(fetchThunk(API_PATHS.getLocation, 'get'));
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
            setLocations(json.data);
        }
    };

    const handleOnChange = () => {
        getState();
    };

    useLayoutEffect(() => {
        getLocations();
    }, []);

    return (
        <>
            {!!errorMessage && (
                <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                    {errorMessage}
                </div>
            )}
            <Formik
                initialValues={initialValues}
                validationSchema={SignUpSchema}
                onSubmit={(values) => {
                    onSignUp(values);
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className="col-md-12">
                            <label htmlFor="email" className="form-label">
                                <FormattedMessage id="email" />
                            </label>
                            <Field type="email" id="email" name="email" />
                            {errors.email && touched.email ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.email} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="password" className="form-label">
                                <FormattedMessage id="password" />
                            </label>
                            <Field type="password" id="password" name="password" />
                            {errors.password && touched.password ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.password} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="repeatPassword" className="form-label">
                                <FormattedMessage id="repeatPassword" />
                            </label>
                            <Field type="password" id="repeatPassword" name="repeatPassword" />
                            {errors.repeatPassword && touched.repeatPassword ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.repeatPassword} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">
                                <FormattedMessage id="name" />
                            </label>
                            <Field type="text" id="name" name="name" />
                            {errors.name && touched.name ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.name} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="gender" className="form-label">
                                <FormattedMessage id="gender" />
                            </label>
                            <Field id="gender" name="gender" as="select">
                                <option>--select an option--</option>
                                <option value="0">nam</option>
                                <option value="1">nữ</option>
                            </Field>
                            {errors.gender && touched.gender ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.gender} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="region" className="form-label">
                                <FormattedMessage id="region" />
                            </label>
                            <Field id="region" name="region" as="select" onChange={handleOnChange}>
                                <option>--select an option--</option>
                                {locations.map((region) => {
                                    <option value={region.name} key={region.name}>
                                        {region.name}
                                    </option>;
                                })}
                            </Field>
                            {errors.region && touched.region ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.region} />
                                </small>
                            ) : null}
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="state" className="form-label">
                                <FormattedMessage id="state" />
                            </label>
                            <Field id="state" name="state" as="select">
                                <option>--select an option--</option>
                                {state.map((state) => {
                                    <option value={state.name} key={state.name}>
                                        {state.name}
                                    </option>;
                                })}
                            </Field>
                            {errors.state && touched.state ? (
                                <small className="text-danger">
                                    <FormattedMessage id={errors.state} />
                                </small>
                            ) : null}
                        </div>
                        <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
                            <div className="col-md-auto">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                    style={{
                                        minWidth: '160px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    disabled={loading}
                                >
                                    {loading && (
                                        <div
                                            className="spinner-border spinner-border-sm text-light mr-2"
                                            role="status"
                                        />
                                    )}
                                    <FormattedMessage id="register" />
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <Link
                to={ROUTES.login}
                style={{
                    textDecoration: 'none',
                    color: '#F47321',
                    fontSize: '20px',
                }}
            >
                Đăng nhập
            </Link>
        </>
    );
}

export default SignUpForm;
