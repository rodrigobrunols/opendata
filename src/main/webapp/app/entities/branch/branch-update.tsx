import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAddress } from 'app/shared/model/address.model';
import { getEntities as getAddresses } from 'app/entities/address/address.reducer';
import { ICompany } from 'app/shared/model/company.model';
import { getEntities as getCompanies } from 'app/entities/company/company.reducer';
import { getEntity, updateEntity, createEntity, reset } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBranchUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBranchUpdateState {
  isNew: boolean;
  addressId: string;
  companyId: string;
}

export class BranchUpdate extends React.Component<IBranchUpdateProps, IBranchUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      addressId: '0',
      companyId: '0',
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

    this.props.getAddresses();
    this.props.getCompanies();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { branchEntity } = this.props;
      const entity = {
        ...branchEntity,
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
    this.props.history.push('/entity/branch');
  };

  render() {
    const { branchEntity, addresses, companies, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="opendataApp.branch.home.createOrEditLabel">
              <Translate contentKey="opendataApp.branch.home.createOrEditLabel">Create or edit a Branch</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : branchEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="branch-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="branch-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="branch-name">
                    <Translate contentKey="opendataApp.branch.name">Name</Translate>
                  </Label>
                  <AvField id="branch-name" type="text" name="name" />
                  <UncontrolledTooltip target="nameLabel">
                    <Translate contentKey="opendataApp.branch.help.name" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="codeLabel" for="branch-code">
                    <Translate contentKey="opendataApp.branch.code">Code</Translate>
                  </Label>
                  <AvField id="branch-code" type="string" className="form-control" name="code" />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel" for="branch-type">
                    <Translate contentKey="opendataApp.branch.type">Type</Translate>
                  </Label>
                  <AvField id="branch-type" type="text" name="type" />
                </AvGroup>
                <AvGroup>
                  <Label id="latitudeLabel" for="branch-latitude">
                    <Translate contentKey="opendataApp.branch.latitude">Latitude</Translate>
                  </Label>
                  <AvField id="branch-latitude" type="string" className="form-control" name="latitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="longitudeLabel" for="branch-longitude">
                    <Translate contentKey="opendataApp.branch.longitude">Longitude</Translate>
                  </Label>
                  <AvField id="branch-longitude" type="string" className="form-control" name="longitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="additionalInfoLabel" for="branch-additionalInfo">
                    <Translate contentKey="opendataApp.branch.additionalInfo">Additional Info</Translate>
                  </Label>
                  <AvField id="branch-additionalInfo" type="text" name="additionalInfo" />
                </AvGroup>
                <AvGroup>
                  <Label for="branch-address">
                    <Translate contentKey="opendataApp.branch.address">Address</Translate>
                  </Label>
                  <AvInput id="branch-address" type="select" className="form-control" name="address.id">
                    <option value="" key="0" />
                    {addresses
                      ? addresses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="branch-company">
                    <Translate contentKey="opendataApp.branch.company">Company</Translate>
                  </Label>
                  <AvInput id="branch-company" type="select" className="form-control" name="company.id">
                    <option value="" key="0" />
                    {companies
                      ? companies.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/branch" replace color="info">
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
  addresses: storeState.address.entities,
  companies: storeState.company.entities,
  branchEntity: storeState.branch.entity,
  loading: storeState.branch.loading,
  updating: storeState.branch.updating,
  updateSuccess: storeState.branch.updateSuccess
});

const mapDispatchToProps = {
  getAddresses,
  getCompanies,
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
)(BranchUpdate);
