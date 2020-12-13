import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { ModalProgressBar, } from "../../../../../_metronic/_partials/controls";
import * as auth from "../../../Auth";
import * as boats from "../../_redux/BoatsRedux";
import {getboatById} from "../../_redux/BoatsCrud";


function BoatPage(props) {
    // Fields
    const [loading, setloading] = useState(false);
    const dispatch = useDispatch();
     const user = useSelector((state) => state.auth.user, shallowEqual);
    const boats = useSelector((state) => state.boats, shallowEqual);
    const [boat, setBoat] = useState();
    const boatId= props.match.params.id;
    useEffect(
      () => {
        setTimeout(() => {
            getboatById(boatId)
           .then((data) => {
             setloading(false);
             //dispatch(props.getboats(data.data));
             setBoat(data.data);
           })
           .catch((error) => {
             setloading(false);
          });
        }, 1000);
    }, [user]);
   console.log('boat',boat);
    
    return (
      <div>
       {loading && <ModalProgressBar />}
      {!!boat  &&  <h2>{boat.nom}</h2> }
       
      </div>
    );
  }
  
  export default connect(null,boats.actions)(BoatPage);
  