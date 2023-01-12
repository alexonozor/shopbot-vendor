export interface Auth {
  additionalData: string;
  attemptsExceeded: string;
  clientId: string;
  encryptedPassword: string;
  remainingAttempts: string;
  responseCode: string;
  responseDescription: string;
  token: string;
  user: User;
  userLocked: string;
  username: string;
  
  // admin: boolean;
}


export interface User {
  created: string;
  id: string;
  updated: string;
  notificationToken: string;
  online: boolean;
  customerDetails: CustomerDetails;
  userType: String;
}

export interface CustomerDetails {
  created: string;
  id: string;
  updated: string;
  firstName: string;
  lastName: string;
  gender: string;
  contactDetail: ContactDetail
}

export interface ContactDetail {
  created: string;
  id: string;
  updated: string;
  email: string;
  mobileNumber: string;
}
