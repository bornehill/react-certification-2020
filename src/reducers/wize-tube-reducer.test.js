import wizeTubeReducer from './wize-tube-reducer';
import { GET_VIDEOS_SUCCESS } from '../actions/wize-request';

describe('Test wize reducer', () => {
  it('Should change state', () => {
    const state = {};
    const action = { type: GET_VIDEOS_SUCCESS, payload: { items: [{ id: 1 }] } };

    const result = wizeTubeReducer(state, action);
    expect(result.videos.items.length).toBe(1);
  });

  it('Should not change state', () => {
    const state = {};
    const action = { type: 'Other', payload: { items: [{ id: 1 }] } };

    const result = wizeTubeReducer(state, action);
    expect(result.items).toBeUndefined();
  });
});
