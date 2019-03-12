import * as actionTypes from './actionTypes';

export const getInputData = (inputData, inputsCount, inputQuestions, inputTypes) => {
  return {
    type: actionTypes.GET_INPUT_DATA,
    inputData: inputData,
    inputsCount: inputsCount,
    inputQuestions: inputQuestions,
    inputTypes: inputTypes
  }
}

export const getSubInputData = (subInputsCount, parentData) => {
  return {
    type: actionTypes.GET_SUB_INPUT_DATA,
    subInputsCount: subInputsCount,
    parentData: parentData
  }
}

export const putInputData = (inputsCount) => {
  return {
    type: actionTypes.GET_INPUT_DATA,
    inputsCount: inputsCount
  }
}

export const deleteInputData = (inputIndex) => {
  return {
    type: actionTypes.DELETE_INPUT_DATA,
    inputIndex: inputIndex
  }
}

export const getDB = (inputData, inputIndex, inputValues, level) => {
  return dispatch => {
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let request = window.indexedDB.open('TempDatabaseK', 1);
    let database;
    let transaction;
    let store;
    let index;

    request.onupgradeneeded = (e) => {
      let database = request.result;
      let store = database.createObjectStore('CountStore', {
        keyPath: 'cID'
      });
      let index = store.createIndex('countText', 'countText', { unique: false })
    };

    request.onerror = (e) => console.log("indexedDB error: " + e.target.errorCode);

    request.onsuccess = (e) => {
      database = request.result;
      transaction = database.transaction('CountStore', 'readwrite');
      store = transaction.objectStore('CountStore');
      index = store.index('countText');

      database.onerror = (e) => console.log("error: " + e.target.errorCode);

      let query = store.getAll();
      let keys = [];
      let values = [];
      let questions = [];
      let types = [];
      let subInputs = 0;

      query.onsuccess = () => {
        console.log(query.result)
        for (let key in query.result) {
          if (query.result.hasOwnProperty(key)) {
            values.push(query.result[key].cID)
            keys.push(key)
            questions.push(query.result[key].question)
            types.push(query.result[key].type)
            subInputs = query.result[key].subInputs
          }
        }
        if (inputValues) {
          store.put(inputValues)
          dispatch(getInputData(inputValues));
        }
        if (inputData) {
          store.put({ cID: Date.now(), question: '', type: 'radio', subInputs: [] });
          dispatch(putInputData(keys.length + 1))
          dispatch(getInputData([keys.length]));
        }
        if (inputIndex) {
          store.delete(inputIndex)
          dispatch(deleteInputData(inputIndex))
          dispatch(getInputData(keys.length - 1));
        }
        dispatch(getInputData(query.result, keys.length, questions, types));
      }

      transaction.oncomplete = () => {
        database.close();
      }
    }


  }
}