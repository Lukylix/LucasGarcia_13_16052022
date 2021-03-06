import apiEndpoints from "./apiEndpoints";
import { setAlert } from "../alert";

import { setToken } from "../redux/tokenSlice";
import { setUser, setUserNames } from "../redux/userSlice";
import { setAccounts } from "../redux/accountsSlice";
import { setTransactions, updateTransaction as actionUpdateTransaction } from "../redux/transactionsSlice";
import { setCategories } from "../redux/categoriesSlice";

const formatErrorMessage = (message) => message.replace(/^Error: /g, "");

const classicErrorHandler = (error, dispatch, logout) => {
  if (error?.status === 400) return dispatch(setAlert(formatErrorMessage(error.message), "warning"));
  if (error?.status === 401) {
    dispatch(setAlert("Session expired.", "warning"));
    logout();
    return;
  }
  if (error?.status === 500) return dispatch(setAlert("Internal server error.", "danger"));
  return dispatch(setAlert("Something went wrong.", "warning"));
};

const login = (email, password) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.login(email, password);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body?.token) {
      localStorage.setItem("token", data.body.token);
      dispatch(setToken(data.body.token));
      navigate("/profile");
    }
  })();
  return { data, error };
};

const getUserProfile = (token) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.getUserProfile(token);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setUser(data.body));
  })();
  return { data, error };
};

const updateUserProfile = (token, firstName, lastName) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.updateUserProfile(token, firstName, lastName);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setUserNames({ firstName: data.body.firstName, lastName: data.body.lastName }));
  })();
  return { data, error };
};

const getAccounts = (token) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.getAccounts(token);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setAccounts(data.body));
  })();
  return { data, error };
};

const getTransactions = (token, accountId, queryPage) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.getTransactions(token, accountId, queryPage);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setTransactions(data.body));
  })();
  return { data, error };
};

const updateTransaction = (token, accountId, transationId, update) => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.updateTransaction(token, accountId, transationId, update);
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(actionUpdateTransaction(data.body));
  })();
  return { data, error };
};

const getCategories = () => async (dispatch, navigate, logout) => {
  const { data, error } = await apiEndpoints.getCategories();
  (() => {
    if (error) return classicErrorHandler(error, dispatch, logout);
    if (data?.body) dispatch(setCategories(data.body));
  })();
  return { data, error };
};
export { login, getUserProfile, updateUserProfile, getAccounts, getTransactions, updateTransaction, getCategories };
