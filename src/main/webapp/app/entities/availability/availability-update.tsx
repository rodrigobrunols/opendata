import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBranch } from 'app/shared/model/branch.model';
import { getEntities as getBranches } from 'app/entities/branch/branch.reducer';
import { getEntity, updateEntity, createEntity, reset } from './availability.reducer';
import { IAvailability } from 'app/shared/model/availability.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAvailabilityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAvailabilityUpdateState {
  isNew: boolean;
  branchId: string;
}

export class AvailabilityUpdate extends React.Component<IAvailabilityUpdateProps, IAvailabilityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      branchId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getBranches();
  }

  saveEntity = (event, errors, values) => {
    values.openingTime = convertDateTimeToServer(values.openingTime);
    values.closingTime = convertDateTimeToServer(values.closingTime);

    if (errors.length === 0) {
      const { availabilityEntity } = this.props;
      const entity = {
        ...availabilityEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/availability');
  };

  render() {
    const { availabilityEntity, branches, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="opendataApp.availability.home.createOrEditLabel">
              <Translate contentKey="opendataApp.availability.home.createOrEditLabel">Create or edit a Availability</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : availabilityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="availability-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="availability-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="weekdayLabel" for="availability-weekday">
                    <Translate contentKey="opendataApp.availability.weekday">Weekday</Translate>
                  </Label>
                  <AvField id="availability-weekday" type="text" name="weekday" />
                </AvGroup>
                <AvGroup>
                  <Label id="openingTimeLabel" for="availability-openingTime">
                    <Translate contentKey="opendataApp.availability.openingTime">Opening Time</Translate>
                  </Label>
                  <AvInput
                    id="availability-openingTime"
                    type="datetime-local"
                    className="form-control"
                    name="openingTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.availabilityEntity.openingTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="closingTimeLabel" for="availability-closingTime">
                    <Translate contentKey="opendataApp.availability.closingTime">Closing Time</Translate>
                  </Label>
                  <AvInput
                    id="availability-closingTime"
                    type="datetime-local"
                    className="form-control"
                    name="closingTime"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.availabilityEntity.closingTime)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="availability-branch">
                    <Translate contentKey="opendataApp.availability.branch">Branch</Translate>
                  </Label>
                  <AvInput id="availability-branch" type="select" className="form-control" name="branch.id">
                    <option value="" key="0" />
                    {branches
                      ? branches.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/availability" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  branches: storeState.branch.entities,
  availabilityEntity: storeState.availability.entity,
  loading: storeState.availability.loading,
  updating: storeState.availability.updating,
  updateSuccess: storeState.availability.updateSuccess
});

const mapDispatchToProps = {
  getBranches,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailabilityUpdate);
