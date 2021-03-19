import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBranchDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BranchDetail extends React.Component<IBranchDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { branchEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="opendataApp.branch.detail.title">Branch</Translate> [<b>{branchEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="opendataApp.branch.name">Name</Translate>
              </span>
              <UncontrolledTooltip target="name">
                <Translate contentKey="opendataApp.branch.help.name" />
              </UncontrolledTooltip>
            </dt>
            <dd>{branchEntity.name}</dd>
            <dt>
              <span id="code">
                <Translate contentKey="opendataApp.branch.code">Code</Translate>
              </span>
            </dt>
            <dd>{branchEntity.code}</dd>
            <dt>
              <span id="type">
                <Translate contentKey="opendataApp.branch.type">Type</Translate>
              </span>
            </dt>
            <dd>{branchEntity.type}</dd>
            <dt>
              <span id="latitude">
                <Translate contentKey="opendataApp.branch.latitude">Latitude</Translate>
              </span>
            </dt>
            <dd>{branchEntity.latitude}</dd>
            <dt>
              <span id="longitude">
                <Translate contentKey="opendataApp.branch.longitude">Longitude</Translate>
              </span>
            </dt>
            <dd>{branchEntity.longitude}</dd>
            <dt>
              <span id="additionalInfo">
                <Translate contentKey="opendataApp.branch.additionalInfo">Additional Info</Translate>
              </span>
            </dt>
            <dd>{branchEntity.additionalInfo}</dd>
            <dt>
              <Translate contentKey="opendataApp.branch.address">Address</Translate>
            </dt>
            <dd>{branchEntity.address ? branchEntity.address.id : ''}</dd>
            <dt>
              <Translate contentKey="opendataApp.branch.company">Company</Translate>
            </dt>
            <dd>{branchEntity.company ? branchEntity.company.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/branch" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/branch/${branchEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ branch }: IRootState) => ({
  branchEntity: branch.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchDetail);
