import * as actionTypes from "./actionTypes";
import axios from "../../axios";

export const fetchContributionsSuccess = (userContributions) => {
  return {
    type: actionTypes.FETCH_CONTRIBUTIONS_SUCCESS,
    contributions: userContributions,
  };
};

export const fetchContributionsFail = (error) => {
  return {
    type: actionTypes.FETCH_CONTRIBUTIONS_FAIL,
    error: error,
  };
};

export const fetchContributionsStart = () => {
  return {
    type: actionTypes.FETCH_CONTRIBUTIONS_START,
  };
};

export const fetchContributionsFromServer = (userId) => {
  return (dispatch) => {
    dispatch(fetchContributionsStart());
    let querybody = `?orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/items.json" + querybody)
      .then((res) => {
        const fetchedContributions = [];
        for (let item in res.data) {
          fetchedContributions.push({
            ...res.data[item],
            id: item,
          });
        }
        dispatch(fetchContributionsSuccess(fetchedContributions));
      })
      .catch((error) => {
        dispatch(fetchContributionsFail(error));
      });
  };
};
