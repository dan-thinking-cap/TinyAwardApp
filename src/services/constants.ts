// import {BASE_URL} from '@env';

export const TIMEOUT = 30000;

// export const BASE_URL = 'https://192.168.0.50/tinyreward';
//  export const BASE_URL = 'https://tinyaward.com';
   export const BASE_URL = 'https://stable.tinyaward.com';

export const endpoints = {
  userlogin: `${BASE_URL}/TinyReward.ashx`,
  getnotification: `${BASE_URL}/Endorsement.ashx?OP=GetTotalNotificationsCount`,
  getUnlockedBadages: `${BASE_URL}/TinyReward.ashx?OP=GetUserUnlockedBadge`,
  getSearchList: (
    search: string,
    order: string,
    sortBy: string,
    issuers: string[],
    alignments: string[],
    badgeType: string[],
    page: number,
  ) =>
    `${BASE_URL}/TinyReward.ashx?OP=SearchPublicOpenBadgesAvailable&tag=&key=${encodeURIComponent(
      search,
    )}&order=${encodeURIComponent(order)}&sorting=${encodeURIComponent(
      sortBy,
    )}&issuers=${encodeURIComponent(
      JSON.stringify(issuers),
    )}&alignments=${encodeURIComponent(
      JSON.stringify(alignments),
    )}&badgeType=${encodeURIComponent(
      JSON.stringify(badgeType),
    )}&ownership=&publicy=${encodeURIComponent(
      JSON.stringify(['all']),
    )}&Page=${page}`,
  getListIssuers: `${BASE_URL}/TinyReward.ashx?OP=GetFilterValue&pageName=discover`,
  getDetails: (badge: string, user: string) =>
    `${BASE_URL}/Handlers/Extension.ashx?OP=GetBadge&badge=${badge}&User=${user}`,
  updateTaskStatus: `${BASE_URL}/Handlers/Extension.ashx`,
  getListAvailableBadges: (host: string, email: string) =>
    `${BASE_URL}/Handlers/Extension.ashx?op=ListAvailableBadges&host=${host}&email=${encodeURIComponent(
      email,
    )}`,
  getCompletedTask: (UserId: string, BadgeID: string) =>
    `${BASE_URL}/Handlers/Extension.ashx?OP=GetCompletedTasks&User=${UserId}&BadgeID=${BadgeID}`,
  getUserId: (email: string) =>
    `${BASE_URL}/handlers/Extension.ashx?OP=CheckUser&Email=${encodeURIComponent(
      email,
    )}`,
  getInfoDetails: (Badge: string) =>
    `${BASE_URL}/TinyReward.ashx?OP=GetPublicBadgeDetailModal&BadgeID=${Badge}`,
  getSuccessDetails: (userID: string, badge: string) =>
    `${BASE_URL}/TinyReward.ashx?OP=BakeBadge&UserID=${userID}&BadgeID=${badge}`,
};
export const responseCodes = {
  badRequest: 400,
  created: 201,
  forbidden: 403,
  noContent: 204,
  notFound: 404,
  ok: 200,
  serverError: 500,
  unauthorized: 401,
};
