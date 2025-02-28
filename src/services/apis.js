const BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;
// const BASE_URL = "http://localhost:8086";
//
export const authendpoints = {
  SIGNIN_API: BASE_URL + "/api/admin/login",
  FORGET_PASSWORD_OTP: BASE_URL + "/api/admin/send-otp",
  VALID_OTP: BASE_URL + "/api/admin/verify-otp",
  RESET_PASSWORD: BASE_URL + "/api/admin/reset-password",
  CHANGE_PASSWORD: BASE_URL + "/api/admin/change-password",
  IS_AUTORIZED: BASE_URL + "/api/admin/dashboard",
};

export const vehicalendpoints = {
  ADD_VEHICLE: BASE_URL + "/api/admin/vehical-post",
  VEHICLE_lIST: BASE_URL + "/api/admin/all-vehical-list",
  UPDTAE_VEHICLE: BASE_URL + "/api/admin/vehical-update",
  DELETE_VEHICLE: BASE_URL + "/api/admin/vehical-delete",
};
export const customerendpoints = {
  CUSTOMER_LIST: BASE_URL + "/api/admin/customer-list",
  CUSTOMER_Update: BASE_URL + "/api/admin/customer-edit",
  CUSTOMER_Delete: BASE_URL + "/api/admin/customer-delete",
};
export const allinquiryendpoinds = {
  INQUIRY_LIST: BASE_URL + "/api/admin/all-inqurues",
};
export const requestendpoints = {
  REQUEST_LIST: BASE_URL + "/api/admin/all-request-quote-list",
  Accept_Quote: BASE_URL + "/api/admin/quote-accept",
  Reject_Quote: BASE_URL + "/api/admin/reject-quote",
  Send_Email_Quote: BASE_URL + "/api/admin/send-quote-price-email",
};
export const quoteendpoints = {
  QUOTE_LIST: BASE_URL + "/api/admin/quote-email-data",
};
export const shipmentendpoints = {
  ALL_SHIPMENT_DASHBOARD_LIST: BASE_URL + "/api/admin/all-quote-list",
  ALL_UTE_LIST: BASE_URL + "/api/admin/get-all-ute-list",
  SINGLE_SHIPMENT_DETAIL: BASE_URL + "/api/admin/single-shipment-detail",
  SHIPMENT_DELIVERY_DETAIL: BASE_URL + "/api/admin/shipment-delivery-detail",
  DELETE_SHIPMENT: BASE_URL + "/api/admin/shipment-delete",
  UPDATE_SHIPMENT_STOP: BASE_URL + "/api/admin/shipment-detail-update",
  SHIPMENT_DELEVERY_DETAIL: BASE_URL + "/api/admin/shipment-delivery-detail",
};

export const faqendpoints = {
  POST_FAQ: BASE_URL + "/api/admin/create-faq",
  FAQ_LIST: BASE_URL + "/api/admin/faq-list",
  DELETE_FAQ: BASE_URL + "/api/admin/delete-faq",
  EDIT_FAQ: BASE_URL + "/api/admin/update-faq",
  SINGLE_FAQ: BASE_URL + "/api/admin/single-faq-detail",
};
export const userendpoints = {
  USER_LIST: BASE_URL + "/api/admin/user-list",
  USER_Create: BASE_URL + "/api/admin/create-user",
  USER_Update: BASE_URL + "/api/admin/update-user",
  USER_Delete: BASE_URL + "/api/admin/delete-user",
};

export const promotionEmailSendApi = {
  ADMIN_EMAIL_SEND: BASE_URL + "/api/admin/admin-email-send",
};

export const reportDatas = {
  ADMIN_ReportData: BASE_URL + "/api/admin/all-shipment-reports",
};
