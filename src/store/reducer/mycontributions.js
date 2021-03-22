import * as actionTypes from "../actions/actionTypes";
import { updateState } from "./utility";

const initialState = {
  contributions: [],
  loading: false,
};

const fetchContributionsStart = (state) => {
  return updateState(state, { loading: true });
};

const fetchContributionsSuccess = (state, action) => {
  return updateState(state, {
    contributions: action.contributions,
    loading: false,
  });
};

const fetchContributionsFail = (state) => {
  return updateState(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CONTRIBUTIONS_START:
      return fetchContributionsStart(state);
    case actionTypes.FETCH_CONTRIBUTIONS_SUCCESS:
      return fetchContributionsSuccess(state, action);
    case actionTypes.FETCH_CONTRIBUTIONS_FAIL:
      return fetchContributionsFail(state);
    default:
      return state;
  }
};

export default reducer;
