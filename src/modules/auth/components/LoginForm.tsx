import React from 'react';
import { useFormik, FormikErrors } from 'formik';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { ILoginParams } from '../../../models/auth';
import { ROUTES } from '../../../configs/routes';
// import { validateLogin, validLogin } from '../utils';
// import { values } from 'lodash';

interface Props {
    onLogin(values: ILoginParams): void;
    loading: boolean;
    errorMessage: string;
}

interface Error {
    email: string;
    password: string;
}

const validate = (values: ILoginParams) => {
    // const errors: Error = {
    //     email: '',
    //     password: '',
    // };

    const errors: FormikErrors<Error> = {};

    if (!values.email) {
        errors.email = 'emailRequire';
    } else if (
        !/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            values.email,
        )
    ) {
        errors.email = 'emailInvalid';
    }

    if (!values.password) {
        errors.password = 'passwordRequire';
    } else if (values.password.length < 4) {
        errors.password = 'minPasswordInvalid';
    }

    return errors;
};

const LoginForm = (props: Props) => {
    const { onLogin, loading, errorMessage } = props;

    // const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
    // const [validate, setValidate] = React.useState<ILoginValidation>();

    const initialValues: ILoginParams = {
        email: '',
        password: '',
        rememberMe: false,
    };

    const formik = useFormik({
        initialValues: initialValues,
        validate,
        onSubmit: (values) => {
            onLogin(values);
        },
    });

    // const onSubmit = React.useCallback(() => {
    //     const validate = validateLogin(formValues);

    //     setValidate(validate);

    //     if (!validLogin(validate)) {
    //         return;
    //     }

    //     onLogin(formValues);
    // }, [formValues, onLogin]);

    return (
        <form
            style={{ maxWidth: '560px', width: '100%' }}
            noValidate
            onSubmit={formik.handleSubmit}
            // onSubmit={(e) => {
            //     e.preventDefault();
            //     onSubmit();
            // }}
            className="row g-3 needs-validation"
        >
            {!!errorMessage && (
                <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
                    {errorMessage}
                </div>
            )}
            <div className="col-md-12">
                <label htmlFor="email" className="form-label">
                    <FormattedMessage id="email" />
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    // value={formValues.email}
                    // onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />

                {/* {!!validate?.email && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.email} />
                    </small>
                )} */}
                {!!formik.errors.email && (
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.email} />
                    </small>
                )}
            </div>

            <div className="col-md-12">
                <label htmlFor="password" className="form-label">
                    <FormattedMessage id="password" />
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    // value={formValues.password}
                    // onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />

                {!!formik.errors.password && (
                    <small className="text-danger">
                        <FormattedMessage id={formik.errors.password} />
                    </small>
                )}
                {/* {!!validate?.password && (
                    <small className="text-danger">
                        <FormattedMessage id={validate?.password} />
                    </small>
                )} */}
            </div>

            <div className="col-12">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        value=""
                        name="rememberMe"
                        onChange={formik.handleChange}
                        checked={formik.values.rememberMe}
                        // checked={formValues.rememberMe}
                        // onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                        <FormattedMessage id="rememberMe" />
                    </label>
                </div>
            </div>

            <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
                <div className="col-md-auto">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
                        <FormattedMessage id="login" />
                    </button>
                </div>
            </div>

            <Link
                to={ROUTES.register}
                style={{
                    textDecoration: 'none',
                    color: '#F47321',
                    fontSize: '20px',
                }}
            >
                Đăng Ký
            </Link>
        </form>
    );
};

export default LoginForm;
