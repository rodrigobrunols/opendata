import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './address.reducer';
import { IAddress } from 'app/shared/model/address.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AddressDetail extends React.Component<IAddressDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { addressEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="opendataApp.address.detail.title">Address</Translate> [<b>{addressEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="address">
                <Translate contentKey="opendataApp.address.address">Address</Translate>
              </span>
            </dt>
            <dd>{addressEntity.address}</dd>
            <dt>
              <span id="districtName">
                <Translate contentKey="opendataApp.address.districtName">District Name</Translate>
              </span>
            </dt>
            <dd>{addressEntity.districtName}</dd>
            <dt>
              <span id="townName">
                <Translate contentKey="opendataApp.address.townName">Town Name</Translate>
              </span>
            </dt>
            <dd>{addressEntity.townName}</dd>
            <dt>
              <span id="countrySubDivision">
                <Translate contentKey="opendataApp.address.countrySubDivision">Country Sub Division</Translate>
              </span>
            </dt>
            <dd>{addressEntity.countrySubDivision}</dd>
            <dt>
              <span id="postCode">
                <Translate contentKey="opendataApp.address.postCode">Post Code</Translate>
              </span>
            </dt>
            <dd>{addressEntity.postCode}</dd>
            <dt>
              <span id="additionalInfo">
                <Translate contentKey="opendataApp.address.additionalInfo">Additional Info</Translate>
              </span>
            </dt>
            <dd>{addressEntity.additionalInfo}</dd>
          </dl>
          <Button tag={Link} to="/entity/address" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/address/${addressEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ address }: IRootState) => ({
  addressEntity: address.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressDetail);
