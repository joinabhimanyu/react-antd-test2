/* eslint-disable react/prop-types */
import { Route, Switch, Redirect , Router} from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { createBrowserHistory } from 'history';
import Page from './Page';
import StudentsListView from './StudentsList/StudentsListView';
import Counter from './EmployeeList/EmployeeListView';

export const history = createBrowserHistory();

const StudentsListViewPage = () => (
    <Page
        ContentComponent={StudentsListView}
    />
);
const CounterPage = () => (
    <Page
        ContentComponent={Counter}
    />
);

const ApplicationRoutes = () => (
    <>
        <Router history={history}>
            <Switch>
                <Route path="/StudentsListView" component={StudentsListViewPage} />
                <Route path="/EmployeeListView" component={CounterPage} />
                <Route exact path="/">
                    <Redirect to="/EmployeeListView" />
                </Route>
            </Switch>
        </Router>
        {/* <ConnectedRouter history={history}> */}

        {/* <Switch>
        <HyperSecureRoute exact path="/" component={Dashboard} />
        <HyperSecureRoute path="/EtfMapManager" 
          component={() => (
            <Authorizer permission="CAN_ACCESS_835MAP_MANAGER">
              <EtfRoutes />
            </Authorizer>
          )}
        />
        <SecureRoute path="/change-password" exact component={ChangePassword} />
        <SecureRoute path="/choose-context" exact component={ChoseContext} />
        <Route path="/login" exact component={Login} />
        <Route path="/forgot" exact component={ForgotPassword} />
        <Route path="/unauthorized" component={AccessDeniedPage} />
        <Route
          path="*"
          render={(props) => props.location.pathname !== '/sso' && <NotFound />}
        />
      </Switch> */}
        {/* </ConnectedRouter> */}
    </>
);

// Make some routes private if using auth-management
// const PrivateRouteIfAuth = integrations.ciam ? PrivateRoute : Route;

// const CIAMRoute = ({ component: Component, ...props }) => (
//   <Route
//     {...props}
//     render={(innerProps) =>
//       integrations.ciam ? <Component {...innerProps} /> : <Redirect to="/404" />
//     }
//   />
// );

export default React.memo(ApplicationRoutes);