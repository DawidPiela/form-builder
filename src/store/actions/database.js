import * as actionTypes from './actionTypes';

export const getInputData = (inputsCount) => {
  return {
    type: actionTypes.GET_INPUT_DATA,
    inputsCount: inputsCount
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

export const getDB = (inputData, inputIndex) => {
  return dispatch => {
    // window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    let request = window.indexedDB.open('TempDatabaseH', 1);
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

      query.onsuccess = () => {
        for (let key in query.result) {
          if (query.result.hasOwnProperty(key)) {
            values.push(query.result[key].cID)
            keys.push(key)
          }
        }
        dispatch(getInputData(keys.length));
        let counter = Number(values[values.length - 1]) || 0;
        if (inputData) {
          counter += 1;
          store.put({ cID: counter });
          dispatch(putInputData(keys.length + 1))
        }
        if (inputIndex) {
          store.delete(values[inputIndex - 1])
          dispatch(deleteInputData(values[inputIndex - 1]))
          dispatch(getInputData(keys.length - 1));
        }
      }

      transaction.oncomplete = () => {
        database.close();
      }
    }


  }
}