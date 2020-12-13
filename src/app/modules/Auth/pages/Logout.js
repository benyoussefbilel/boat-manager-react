import React, {useEffect} from "react";
import {connect,useSelector, shallowEqual} from "react-redux";
import {Redirect} from "react-router-dom";
import {LayoutSplashScreen} from "../../../../_metronic/layout";
import * as auth from "../_redux/authRedux";
import {logout} from "../_redux/authCrud";
 

function Logout (props)  {

  
    const user = useSelector((state) => state.auth.user, shallowEqual);
    useEffect(() => {}, [user]);
   // this.props.logout();
    setTimeout(() => {
      logout()
        .then(() => {
          props.logout();
        })
        .catch((e) => {
        });
    }, 1000);
  
   const { hasAuthToken } = props;
  return (
    
     hasAuthToken ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />
  );
}

export default connect(
  ({ auth }) => ({ hasAuthToken: Boolean(auth.authToken) }),
  auth.actions
)(Logout);
