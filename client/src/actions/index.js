import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  EDIT_STREAM,
  DELETE_STREAM
} from './types';
import history from '../history';
import streams from '../apis/streams';

const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

const createStream = (formValues) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  // Post a new string to our json-server including the userId
  const res = await streams.post('/streams', { ...formValues, userId });

  // Programatically navigate the user to the streams page
  history.push('/');

  dispatch({
    type: CREATE_STREAM,
    payload: res.data
  });
};

const fetchStreams = () => async (dispatch) => {
  const res = await streams.get('/streams');

  dispatch({
    type: FETCH_STREAMS,
    payload: res.data
  });
};

const fetchStream = (id) => async (dispatch) => {
  const res = await streams.get(`/streams/${id}`);

  dispatch({
    type: FETCH_STREAM,
    payload: res.data
  });
};

const editStream = (id, updatedFormValues) => async (dispatch) => {
  const res = await streams.patch(`/streams/${id}`, updatedFormValues);

  dispatch({
    type: EDIT_STREAM,
    payload: res.data
  });

  // Programatically navigate the user to the streams page
  history.push('/');
};

const deleteStream = (id) => async (dispatch) => {
  await streams.delete(`/streams/${id}`);

  dispatch({
    type: DELETE_STREAM,
    payload: id
  });
  history.push('/');
};

export { signIn, signOut, createStream, fetchStreams, fetchStream, editStream, deleteStream };
