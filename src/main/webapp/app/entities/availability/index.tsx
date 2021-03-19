import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Availability from './availability';
import AvailabilityDetail from './availability-detail';
import AvailabilityUpdate from './availability-update';
import AvailabilityDeleteDialog from './availability-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AvailabilityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AvailabilityUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AvailabilityDetail} />
      <ErrorBoundaryRoute path={match.url} component={Availability} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AvailabilityDeleteDialog} />
  </>
);

export default Routes;
