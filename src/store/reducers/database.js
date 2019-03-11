import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  inputData: null,
  inputTypes: null,
  inputQuestions: null,
  inputsCount: null,
  subInputsCount: null,
  parentData: null
}

const getInputData = (state, action) => {
  return updateObject(state, {
    inputData: action.inputData,
    inputsCount: action.inputsCount,
    inputQuestions: action.inputQuestions,
    inputTypes: action.inputTypes
  })
}

const getSubInputData = (state, action) => {
  return updateObject(state, {
    subInputsCount: action.subInputsCount,
    parentData: action.parentData
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
    case actionTypes.GET_SUB_INPUT_DATA:
      return getSubInputData(state, action)
    case actionTypes.PUT_INPUT_DATA:
      return putInputData(state, action)
    case actionTypes.DELETE_INPUT_DATA:
      return deleteInputData(state, action)
    default: return state;
  }
}

export default reducer;