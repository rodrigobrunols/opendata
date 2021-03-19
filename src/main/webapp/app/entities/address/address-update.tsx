import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAddressUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAddressUpdateState {
  isNew: boolean;
}

export class AddressUpdate extends React.Component<IAddressUpdateProps, IAddressUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { addressEntity } = this.props;
      const entity = {
        ...addressEntity,
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
    this.props.history.push('/entity/address');
  };

  render() {
    const { addressEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="opendataApp.address.home.createOrEditLabel">
              <Translate contentKey="opendataApp.address.home.createOrEditLabel">Create or edit a Address</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : addressEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="address-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="address-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="addressLabel" for="address-address">
                    <Translate contentKey="opendataApp.address.address">Address</Translate>
                  </Label>
                  <AvField id="address-address" type="text" name="address" />
                </AvGroup>
                <AvGroup>
                  <Label id="districtNameLabel" for="address-districtName">
                    <Translate contentKey="opendataApp.address.districtName">District Name</Translate>
                  </Label>
                  <AvField id="address-districtName" type="text" name="districtName" />
                </AvGroup>
                <AvGroup>
                  <Label id="townNameLabel" for="address-townName">
                    <Translate contentKey="opendataApp.address.townName">Town Name</Translate>
                  </Label>
                  <AvField id="address-townName" type="text" name="townName" />
                </AvGroup>
                <AvGroup>
                  <Label id="countrySubDivisionLabel" for="address-countrySubDivision">
                    <Translate contentKey="opendataApp.address.countrySubDivision">Country Sub Division</Translate>
                  </Label>
                  <AvField id="address-countrySubDivision" type="text" name="countrySubDivision" />
                </AvGroup>
                <AvGroup>
                  <Label id="postCodeLabel" for="address-postCode">
                    <Translate contentKey="opendataApp.address.postCode">Post Code</Translate>
                  </Label>
                  <AvField id="address-postCode" type="string" className="form-control" name="postCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="additionalInfoLabel" for="address-additionalInfo">
                    <Translate contentKey="opendataApp.address.additionalInfo">Additional Info</Translate>
                  </Label>
                  <AvField id="address-additionalInfo" type="text" name="additionalInfo" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/address" replace color="info">
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
  addressEntity: storeState.address.entity,
  loading: storeState.address.loading,
  updating: storeState.address.updating,
  updateSuccess: storeState.address.updateSuccess
});

const mapDispatchToProps = {
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
)(AddressUpdate);
