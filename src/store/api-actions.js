import {loadQuestions, requireAuthorization, redirectToRoute} from "./action";
import {AuthorizationStatus, HttpCode} from "../const";
import {AppRoute, APIRoute} from "../const";

export const fetchQuestionList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.QUESTIONS)
    .then(({data}) => dispatch(loadQuestions(data)))
    .catch((err) => {
      return err;
    })
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then((response) => {
      if (response.status === HttpCode.UNAUTHORIZED) {
        return response;
      } else {
        return dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      }
    })
    .catch((err) => {
      return err;
    })
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.RESULT)))
    .catch((err) => {
      return err;
    })
);
