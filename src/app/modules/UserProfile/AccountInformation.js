/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import * as auth from "../Auth";
import {updateUser,logoutAll,logoutAllletme,getUserByToken} from "../Auth/_redux/authCrud";
import{setStorage} from "../../../_metronic/_helpers/LocalStorageHelpers";

function AccountInformation(props) {
  // Fields

  
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const userstorage = useSelector((state) => { return state.auth.user }, shallowEqual);
  
  const [user,setuser]=useState(userstorage);
  
  useEffect(() => {
    setTimeout(() => {
    getUserByToken()
      .then((data) => {
         setuser(data.data);
         console.log(user)
         setloading(false);
      })
      .catch((e) => {
        console.log(e)
      });
   }, 1000); 
  },[]);
  
 
  // Methods
  const saveUser = (values, setStatus, setSubmitting) => {
     const updatedvalues ={
      firstname: values.firstname,
      email: values.email,
      language: values.language,
      timeZone: values.timeZone
    };
    setloading(true);
    const updatedUser = Object.assign(user,updatedvalues);
    // user for update preparation
      dispatch(props.setUser(updatedUser)) ;
      setTimeout(() => {
      
      setSubmitting(false);
      // Do request to your server for user update, we just imitate user update there, For example:
      updateUser(updatedvalues)
       .then((data) => {
        dispatch(props.setUser(updatedUser)) ;
         setloading(false);
       })
       .catch((error) => {
         setloading(false);
         setSubmitting(false);
         setStatus(error);
      });
    }, 1000);
  };
  
  //logoutall letme
  const  handlelogoutallletme = ()=>{
    setTimeout(() => {
      setloading(true);
      logoutAllletme()
       .then(() => {
       })
       .catch(() => {

      });
    }, 1000);
  }
 
  //logoutall
  const handlelogoutall = ()=>{
    setTimeout(() => {
      logoutAll()
       .then(() => {
        props.logout();
       })
       .catch(() => {

      });
    }, 1000);
  }

  // UI Helpers
  const initialValues = {
    firstname: user.firstname,
    email: user.email,
    language: user.language,
    timeZone: user.timeZone,
  };
  const Schema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    email: Yup.string()
      .email("Wrong email format")
      .required("Email is required"),
    language: Yup.string(),
    timeZone: Yup.string(),
  });
  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };
  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    },
    onReset: (values, { resetForm }) => {
      resetForm();
    },
  });

  return (
    <form className="card card-custom" onSubmit={formik.handleSubmit}>
      {loading && <ModalProgressBar />}

      {/* begin::Header */}
      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            Account Information
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            Change your account settings
          </span>
        </div>
        <div className="card-toolbar">
          <button
            type="submit"
            className="btn btn-success mr-2"
            disabled={
              formik.isSubmitting || (formik.touched && !formik.isValid)
            }
          >
            Save Changes
            {formik.isSubmitting}
          </button>
          <Link
            to="/user-profile/profile-overview"
            className="btn btn-secondary"
          >
            Cancel
          </Link>
        </div>
      </div>
      {/* end::Header */}
      {/* begin::Form */}
      <div className="form">
        <div className="card-body">
          {/* begin::Heading */}
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">Account:</h5>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">firstname</label>
            <div className="col-lg-9 col-xl-6">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "firstname"
                  )}`}
                  name="firstname"
                  {...formik.getFieldProps("firstname")}
                />
                {formik.touched.firstname && formik.errors.firstname ? (
                  <div className="invalid-feedback">
                    {formik.errors.firstname}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Email Address
            </label>
            <div className="col-lg-9 col-xl-6">
              <div className="input-group input-group-lg input-group-solid">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-at"></i>
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Email"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
              <span className="form-text text-muted">
                Email will not be publicly displayed.{` `}
                <a href="#" className="font-weight-bold">
                  Learn more
                </a>
                .
              </span>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">Language</label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control form-control-lg form-control-solid"
                name="language"
                {...formik.getFieldProps("language")}
              >
                <option>Select Language...</option>
                <option value="id">Bahasa Indonesia - Indonesian</option>
                <option value="msa">Bahasa Melayu - Malay</option>
                <option value="ca">Català - Catalan</option>
                <option value="cs">Čeština - Czech</option>
                <option value="da">Dansk - Danish</option>
                <option value="de">Deutsch - German</option>
                <option value="en">English</option>
                <option value="en-gb">English UK - British English</option>
                <option value="es">Español - Spanish</option>
                <option value="eu">Euskara - Basque (beta)</option>
                <option value="fil">Filipino</option>
                <option value="fr">Français - French</option>
                <option value="pt">Português - Portuguese</option>
                <option value="ro">Română - Romanian</option>
                <option value="ru">Русский - Russian</option>
                <option value="sr">Српски - Serbian</option>
                <option value="uk">Українська мова - Ukrainian</option>
              </select>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Time Zone
            </label>
            <div className="col-lg-9 col-xl-6">
              <select
                className="form-control form-control-lg form-control-solid"
                name="timeZone"
                {...formik.getFieldProps("timeZone")}
              >
                <option value="International Date Line West">
                  (GMT-11:00) International Date Line West
                </option>
                <option value="Midway Island">(GMT-11:00) Midway Island</option>

                <option value="Central America">
                  (GMT-06:00) Central America
                </option>
                <option value="Central Time (US &amp; Canada)">
                  (GMT-05:00) Central Time (US &amp; Canada)
                </option>
                <option value="Eastern Time (US &amp; Canada)">
                  (GMT-04:00) Eastern Time (US &amp; Canada)
                </option>
                <option value="Indiana (East)">
                  (GMT-04:00) Indiana (East)
                </option>

                <option value="Georgetown">(GMT-04:00) Georgetown</option>

                <option value="Buenos Aires">(GMT-03:00) Buenos Aires</option>
                <option value="Newfoundland">(GMT-02:30) Newfoundland</option>
                <option value="Mid-Atlantic">(GMT-02:00) Mid-Atlantic</option>
                <option value="Cape Verde Is.">
                  (GMT-01:00) Cape Verde Is.
                </option>
                <option value="UTC">(GMT) UTC</option>
                <option value="Dublin">(GMT+01:00) Dublin</option>
                <option value="Edinburgh">(GMT+01:00) Edinburgh</option>
                <option value="London">(GMT+01:00) London</option>
                <option value="Prague">(GMT+02:00) Prague</option>
                <option value="Helsinki">(GMT+03:00) Helsinki</option>
                <option value="Abu Dhabi">(GMT+04:00) Abu Dhabi</option>
                <option value="Tehran">(GMT+04:30) Tehran</option>
                <option value="Islamabad">(GMT+05:00) Islamabad</option>
                <option value="Karachi">(GMT+05:00) Karachi</option>
                <option value="Tashkent">(GMT+05:00) Tashkent</option>
                <option value="Kathmandu">(GMT+05:45) Kathmandu</option>
                <option value="Astana">(GMT+06:00) Astana</option>
              </select>
            </div>
          </div>
          
          {/* begin::Form Group */}
          <div className="separator separator-dashed my-5"></div>
          {/* begin::Form Group */}
          <div className="row">
            <label className="col-xl-3"></label>
            <div className="col-lg-9 col-xl-6">
              <h5 className="font-weight-bold mb-6">Security:</h5>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              log out all other devices
            </label>
            <div className="col-lg-9 col-xl-6">
              <button
                type="button"
                className="btn btn-light-primary font-weight-bold btn-sm"
                onClick={handlelogoutallletme}
              >
                Logout other devices.
              </button>
              <p className="form-text text-muted pt-2">
                this will deconnect all other loged in devices,and let this device connected.
              </p>
            </div>
          </div>
          {/* begin::Form Group */}
          <div className="form-group row">
            <label className="col-xl-3 col-lg-3 col-form-label">
              Logout all devices.
            </label>
            <div className="col-lg-9 col-xl-6">
              
              <p className="form-text text-muted py-2">
                All opened sessions will be closed including this one
              </p>
              <button
                type="button"
                className="btn btn-light-danger font-weight-bold btn-sm"
                onClick={handlelogoutall}
              >
                Logout all devices ?
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end::Form */}
    </form>
  );
}
export default connect(null, auth.actions)(AccountInformation);
