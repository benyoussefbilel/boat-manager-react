import React, {Suspense, lazy} from "react";
import {Redirect, Switch,Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../_metronic/layout";
import {BuilderPage} from "./pages/BuilderPage";
import {MyPage} from "./pages/MyPage";
import {DashboardPage} from "./pages/DashboardPage";

const UserProfilepage = lazy(() =>
  import("./modules/UserProfile/UserProfilePage")
);
const Boatsroot = lazy(() =>
  import("./modules/Bateaux/pages/Boatsroot")
);
const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
     return (
      <Suspense fallback={<LayoutSplashScreen />}>
       <Switch>
         {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard"/>
         }
         <ContentRoute path="/dashboard" component={DashboardPage} />
         <ContentRoute path="/builder" component={BuilderPage} />
         <ContentRoute path="/Bateaux" component={Boatsroot} />
         <ContentRoute path="/user-profile" component={UserProfilepage} />
         <Route path="/e-commerce" component={ECommercePage} />
         <Redirect to="error/error-v1" />
       </Switch>
     </Suspense>
  );
}