import request from '../router';

enum Routes {
  CONFIRM_ACCOUNT = '/ea/confirm-account',
  CONFIRM_EMAIL_TOKEN = '/ea/confirm-email-token',
  CREATE_PASSWORD = '/ea/create-password',
  SIGN_IN='/ea/sign-in',
  CREATE_ACCESS='/ea/create-access',
  VERIFY_SESSION="/ea/verify-session",
  HAS_LOGGED_IN="/ea/has-logged-in",
  WHITE_LIST="/ea/white-list",
  SEND_VERIFICATION_CODE="/ea/send-verification-code",
  VERIFY_CODE ='/ea/verify-code',
  SAVE_ACCOUNT_DETAIILS="/ea/save-account-details",
  SEND_INVITES="/ea/send-invites",
  DELETE_PASSWORD='/ea/delete-password',
  UPLOAD_PROFILE_IMAGE="/ea/update-profile-image",
  GET_REFERRALS = '/ea/get-referrals',
  SEND_EMAIL ='/ea/send-email',
  GET_TWEETS="/ea/get-latest-tweets",
  GET_USER_ACTIVITY='/ea/get-user-activity',
  RESET_PASS='/ea/reset-password'
}

export async function ConfirmAccount(email: string, accountType: string ){
  let body = { email, type: accountType };
  return await request(Routes.CONFIRM_ACCOUNT, { body }, 'POST')
}

export async function ConfirmEmailToken(token: string, type: string){
  let body = { token };
  return await request(`${Routes.CONFIRM_EMAIL_TOKEN}?type=${type}`, { body }, 'POST');
}

export async function CreatePassword(email: string, type: string, password: string, token: string){
  let body = { email, type, password, token };
  return await request(Routes.CREATE_PASSWORD, { body }, 'PATCH');
}

export async function SignIn(email: string, type: string, password: string){
  const body = { email, type, password };
  return await request(Routes.SIGN_IN, { body }, 'POST');
}

export async function createAccess(email: string, type: string, action: string, password?: string) {
  const body = { email, type, action, password };
  return await request(Routes.CREATE_ACCESS, { body }, 'POST');
}

export async function VerifySession(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.VERIFY_SESSION, { token }, 'GET')
}

export async function hasLoggedIn(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.HAS_LOGGED_IN, { token }, 'POST')
}

export async function WhitelistAccount(
  amount: string,
  paymentMethod: string,
  purchaseType: string
){
  const token = localStorage.getItem('_EA_TOKEN');
  let body = {
    amount,
    paymentMethod,
    purchaseType
  }
  return await request(Routes.WHITE_LIST, { token, body }, 'POST')
}

export async function sendVerificationCode( phone: string ){
  let body = { phone }
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.SEND_VERIFICATION_CODE, { token, body }, 'POST')
}

export async function verifyCode( code: string ){
  let body = { code }
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.VERIFY_CODE, { token, body }, 'POST')
}

export async function saveAcccountDetails(body: object) {
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.SAVE_ACCOUNT_DETAIILS, { token, body }, 'POST')
}

export async function sendInvites(sender: string, invitees: Array<any>, isReferralSent: boolean, referralID: string, senderName: string){
  const token = localStorage.getItem('_EA_TOKEN');
  let body = { sender, invitees, isReferralSent, referralID, senderName };
  return await request(Routes.SEND_INVITES, { token, body }, 'POST')
}

export async function deletePassToken(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.DELETE_PASSWORD, { token }, 'DELETE')
}

export async function uploadProfileImage(image: string){
  const token = localStorage.getItem('_EA_TOKEN');
  let body = { image };
  return await request(Routes.UPLOAD_PROFILE_IMAGE, { token, body }, 'PATCH')
}

export async function getReferrals(email: string){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(`${Routes.GET_REFERRALS}?email=${email}`, { token }, 'GET');
}

export async function sendEmail(from: string, subject, message: string){
  const token = localStorage.getItem('_EA_TOKEN');
  const body = { from, subject,message }
  return await request(Routes.SEND_EMAIL, { token, body }, 'POST')
}

export async function getTweets(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.GET_TWEETS, { token }, 'GET')
}

export async function getUserActivity(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.GET_USER_ACTIVITY, { token }, 'GET')
}

export async function resetPassword(email: string){
  const body = { email }
  return await request(Routes.RESET_PASS, { body }, 'POST')
}