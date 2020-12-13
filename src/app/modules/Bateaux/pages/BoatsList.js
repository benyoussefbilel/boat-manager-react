import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import * as auth from "../../Auth";
import * as boats from "../_redux/BoatsRedux"
import {getboats} from "../_redux/BoatsCrud";
import BoatCarte from "./BoatCarte";


function Boats(props) {
  // Fields
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user, shallowEqual);
  const boats = useSelector((state) => state.boats, shallowEqual);
  const [listBoats,setlistBoats]=useState([]);
  //const [boats,setBoats]=useState([]);
  useEffect(
    () => {
      setTimeout(() => {
        
        getboats()
         .then((data) => {
           setloading(false);
           dispatch(props.getboats(data.data));
           setlistBoats(data.data);
         })
         .catch((error) => {
           setloading(false);
        });
  }, 1000);
  ;
}, [user]);

  return (
    <div>
     {loading && <ModalProgressBar />}
     
     {listBoats.map((boat) => {
      return <BoatCarte key={boat._id} {...boat} />
     })}   
    
    
    </div>
  )
}

export default connect(null,boats.actions)(Boats);
