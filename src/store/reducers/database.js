import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  inputData: null,
  inputsCount: null
}

const getInputData = (state, action) => {
  return updateObject(state, {
    inputsCount: action.inputsCount,
    inputData: action.inputData
  })
}

const putInputData = (state, action) => {
  return updateObject(state, { inputsCount: action.inputsCount })
}

const deleteInputData = (state, action) => {
  return updateObject(state, { inputsCount: action.inputsCount })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INPUT_DATA:
      return getInputData(state, action)
    case actionTypes.PUT_INPUT_DATA:
      return putInputData(state, action)
    case actionTypes.DELETE_INPUT_DATA:
      return deleteInputData(state, action)
    default: return state;
  }
}

export default reducer;