import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './availability.reducer';
import { IAvailability } from 'app/shared/model/availability.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvailabilityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Availability extends React.Component<IAvailabilityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { availabilityList, match } = this.props;
    return (
      <div>
        <h2 id="availability-heading">
          <Translate contentKey="opendataApp.availability.home.title">Availabilities</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="opendataApp.availability.home.createLabel">Create new Availability</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {availabilityList && availabilityList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.availability.weekday">Weekday</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.availability.openingTime">Opening Time</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.availability.closingTime">Closing Time</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.availability.branch">Branch</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {availabilityList.map((availability, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${availability.id}`} color="link" size="sm">
                        {availability.id}
                      </Button>
                    </td>
                    <td>{availability.weekday}</td>
                    <td>
                      <TextFormat type="date" value={availability.openingTime} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={availability.closingTime} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{availability.branch ? <Link to={`branch/${availability.branch.id}`}>{availability.branch.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${availability.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${availability.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${availability.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="opendataApp.availability.home.notFound">No Availabilities found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ availability }: IRootState) => ({
  availabilityList: availability.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Availability);
