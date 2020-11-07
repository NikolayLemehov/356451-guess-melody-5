import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {createAPI} from "./services/api";
import App from './components/app/app';
import {rootReducer} from "./store/reducers/root-reducer";
import {requireAuthorization} from "./store/action";
import {fetchQuestionList, checkAuth} from "./store/api-actions";
import {AuthorizationStatus, HttpCode} from "./const";
import {redirect} from "./store/middlewares/redirect";
import swal from "sweetalert";

const api = createAPI(
    () => store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api)),
        applyMiddleware(redirect)
    )
);

const getErrorsString = (...responses) => responses.reduce((acc, it) => {
  if (it.type || it.status === HttpCode.UNAUTHORIZED) {
    return `${acc}`;
  } else {
    return acc ? `${acc}; ${it}` : `${it}`;
  }
}, ``);

Promise.all([
  store.dispatch(fetchQuestionList()),
  store.dispatch(checkAuth()),
])
  .then((response) => {
    const errorString = getErrorsString(...response);
    if (!errorString) {
      ReactDOM.render(
          <Provider store={store}>
            <App />
          </Provider>,
          document.querySelector(`#root`)
      );
    } else {
      swal(`Error`, `${errorString}`, `error`);
    }
  })
  .catch((err) => {
    swal(`Error`, err, `error`);
  });

