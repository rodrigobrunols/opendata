import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAvailability, defaultValue } from 'app/shared/model/availability.model';

export const ACTION_TYPES = {
  FETCH_AVAILABILITY_LIST: 'availability/FETCH_AVAILABILITY_LIST',
  FETCH_AVAILABILITY: 'availability/FETCH_AVAILABILITY',
  CREATE_AVAILABILITY: 'availability/CREATE_AVAILABILITY',
  UPDATE_AVAILABILITY: 'availability/UPDATE_AVAILABILITY',
  DELETE_AVAILABILITY: 'availability/DELETE_AVAILABILITY',
  RESET: 'availability/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAvailability>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AvailabilityState = Readonly<typeof initialState>;

// Reducer

export default (state: AvailabilityState = initialState, action): AvailabilityState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AVAILABILITY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AVAILABILITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AVAILABILITY):
    case REQUEST(ACTION_TYPES.UPDATE_AVAILABILITY):
    case REQUEST(ACTION_TYPES.DELETE_AVAILABILITY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AVAILABILITY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AVAILABILITY):
    case FAILURE(ACTION_TYPES.CREATE_AVAILABILITY):
    case FAILURE(ACTION_TYPES.UPDATE_AVAILABILITY):
    case FAILURE(ACTION_TYPES.DELETE_AVAILABILITY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVAILABILITY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AVAILABILITY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AVAILABILITY):
    case SUCCESS(ACTION_TYPES.UPDATE_AVAILABILITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AVAILABILITY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/availabilities';

// Actions

export const getEntities: ICrudGetAllAction<IAvailability> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AVAILABILITY_LIST,
  payload: axios.get<IAvailability>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAvailability> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AVAILABILITY,
    payload: axios.get<IAvailability>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAvailability> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AVAILABILITY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAvailability> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AVAILABILITY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAvailability> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AVAILABILITY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
