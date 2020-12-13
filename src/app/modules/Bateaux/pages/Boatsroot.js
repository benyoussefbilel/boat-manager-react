import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../../../../_metronic/layout";
import BoatsList from "./BoatsList";
import BoatPage from "./Boat/BoatPage";
export default function Boatsroots() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from eCommerce root URL to /Bateaux */
          <Redirect
            exact={true}
            from="/Bateaux"
            to="/Bateaux/list"
          />
        }
        <ContentRoute path="/Bateaux/list" component={BoatsList} exact={true}/>

        <ContentRoute
          path="/Bateaux/list/:id" component={BoatPage} exact={true}/>

        
      </Switch>
    </Suspense>
  );
}
