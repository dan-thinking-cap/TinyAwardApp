import axios from 'axios';
import {endpoints} from '../../services/constants';

export const loginUser = async (request: any): Promise<any> => {
  try {
    const result = await axios.post(endpoints.userlogin, request);
    return {response: result?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getNotificationCount = async (): Promise<any> => {
  try {
    const result = await axios.get(endpoints.getnotification);
    return {response: result?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getIssuerList = async (): Promise<any> => {
  try {
    const response = await axios.get(endpoints.getListIssuers);
    return {response: response, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getAwardList = async (request: any): Promise<any> => {
  const {search, order, sortBy, issuers, alignments, badgeType, page} = request;
  try {
    const response = await axios.get(
      endpoints.getSearchList(
        search,
        order,
        sortBy,
        issuers,
        alignments,
        badgeType,
        page,
      ),
    );
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getUserDetails = async (request: any): Promise<any> => {
  const {badge, user} = request;
  try {
    const response = await axios.get(endpoints.getDetails(badge, user));
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const updateTaskStatus = async (request: any): Promise<any> => {
  const {userID, task, type, badge} = request;
  const form = new FormData();
  form.append('OP', 'CompleteTask');
  form.append('User', userID);
  form.append('Task', task);
  form.append('Type', type);
  form.append('Badge', badge);
  try {
    const response = await axios.post(endpoints.updateTaskStatus, form, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};
export const updateBakeStatus = async (request: any): Promise<any> => {
  const {userID, badge} = request;
  try {
    const response = await axios.get(
      endpoints.getSuccessDetails(userID, badge),
    );
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getTaskStatus = async (request: any): Promise<any> => {
  const {UserId, BadgeID} = request;
  try {
    const response = await axios.get(
      endpoints.getCompletedTask(UserId, BadgeID),
    );
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};

export const getALLBadges = async (request: any): Promise<any> => {
  const {host, email} = request;
  try {
    const response = await axios.get(
      endpoints.getListAvailableBadges(host, email),
    );
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};
export const getUserIdByEmail = async (email: string): Promise<any> => {
  try {
    const response = await axios.get(endpoints.getUserId(email));
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};
export const getInfoData = async (badge: string): Promise<any> => {
  try {
    const response = await axios.get(endpoints.getInfoDetails(badge));
    return {response: response?.data, error: null};
  } catch (error) {
    return {response: [], error: error};
  }
};
