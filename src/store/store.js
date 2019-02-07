import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from './reducers/rootReducer'
import { watcherSaga } from './sagas/rootSaga'

const sagaMiddleware = createSagaMiddleware()


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(watcherSaga)

export default store