import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './branch.reducer';
import { IBranch } from 'app/shared/model/branch.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBranchProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Branch extends React.Component<IBranchProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { branchList, match } = this.props;
    return (
      <div>
        <h2 id="branch-heading">
          <Translate contentKey="opendataApp.branch.home.title">Branches</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="opendataApp.branch.home.createLabel">Create new Branch</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {branchList && branchList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <Translate contentKey="global.field.id">ID</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.name">Name</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.code">Code</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.type">Type</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.latitude">Latitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.longitude">Longitude</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.additionalInfo">Additional Info</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.address">Address</Translate>
                  </th>
                  <th>
                    <Translate contentKey="opendataApp.branch.company">Company</Translate>
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {branchList.map((branch, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${branch.id}`} color="link" size="sm">
                        {branch.id}
                      </Button>
                    </td>
                    <td>{branch.name}</td>
                    <td>{branch.code}</td>
                    <td>{branch.type}</td>
                    <td>{branch.latitude}</td>
                    <td>{branch.longitude}</td>
                    <td>{branch.additionalInfo}</td>
                    <td>{branch.address ? <Link to={`address/${branch.address.id}`}>{branch.address.id}</Link> : ''}</td>
                    <td>{branch.company ? <Link to={`company/${branch.company.id}`}>{branch.company.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${branch.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${branch.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${branch.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="opendataApp.branch.home.notFound">No Branches found</Translate>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ branch }: IRootState) => ({
  branchList: branch.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Branch);
