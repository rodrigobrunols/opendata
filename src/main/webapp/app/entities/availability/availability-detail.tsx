import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './availability.reducer';
import { IAvailability } from 'app/shared/model/availability.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAvailabilityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AvailabilityDetail extends React.Component<IAvailabilityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { availabilityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="opendataApp.availability.detail.title">Availability</Translate> [<b>{availabilityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="weekday">
                <Translate contentKey="opendataApp.availability.weekday">Weekday</Translate>
              </span>
            </dt>
            <dd>{availabilityEntity.weekday}</dd>
            <dt>
              <span id="openingTime">
                <Translate contentKey="opendataApp.availability.openingTime">Opening Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={availabilityEntity.openingTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="closingTime">
                <Translate contentKey="opendataApp.availability.closingTime">Closing Time</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={availabilityEntity.closingTime} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="opendataApp.availability.branch">Branch</Translate>
            </dt>
            <dd>{availabilityEntity.branch ? availabilityEntity.branch.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/availability" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/availability/${availabilityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ availability }: IRootState) => ({
  availabilityEntity: availability.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilityDetail);
