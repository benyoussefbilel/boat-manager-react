import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, shallowEqual, connect, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
 import img  from './yacht2.jpg'
const useStyles = makeStyles({
  card: {
    maxWidth:'40em',
  },
  media: {
    height: '20em',
  },
});



function BoatCarte  ({_id,nom,pavillion,status,port_attache}){
  const classes = useStyles();
  return(
    <div>
    <Link to={`/Bateaux/list/${_id}`}>
    <Card className={classes.card}>
    
          <Typography gutterBottom variant="h4" component="h2" color="primary" >
           Nom : {nom}
          </Typography>
          
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title="boat"
        />
        <CardContent>
          <Typography variant="h5" color="error" component="p" >
            Status: {status} 
          </Typography>
          <Typography variant="h5"  component="p" >
            Port d'attache : {port_attache}
          </Typography>
          
        </CardContent>
      </CardActionArea>
     
    </Card>
    </Link>
  </div>
  )
}

export default  BoatCarte;
