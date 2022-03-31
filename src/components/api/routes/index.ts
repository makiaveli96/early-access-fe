import request from '../router';

enum Routes {
  CREATE_ACCESS='/ea/create-access',
  VERIFY_SESSION="/ea/verify-session",
  HAS_LOGGED_IN="/ea/has-logged-in",
  WHITE_LIST="/ea/white-list",
  SEND_VERIFICATION_CODE="/ea/send-verification-code",
  VERIFY_CODE ='/ea/verify-code',
  SAVE_ACCOUNT_DETAIILS="/ea/save-account-details",
  SEND_INVITES="/ea/send-invites",
  DELETE_PASSWORD='/ea/delete-password'
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
  firstName: string,
  lastName: string,
  dob: Date,
  address: string,
  country: string,
  state: string,
  postalCode: string,
  amount: string,
  paymentMethod: string,
  purchaseType: string
){
  const token = localStorage.getItem('_EA_TOKEN');
  let body = {
    firstName,
    lastName,
    dob,
    address,
    country,
    state,
    postalCode,
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

export async function saveAcccountDetails(
  fullname: string,
  username: string,
  address: string,
  country: string,
  state: string,
  postalCode: string
) {
  const token = localStorage.getItem('_EA_TOKEN');
  let body ={ fullname, username, address, country, state, postalCode };
  return await request(Routes.SAVE_ACCOUNT_DETAIILS, { token, body }, 'POST')
}

export async function sendInvites(sender: string, invitees: Array<[{name: string, email: string}]>){
  const token = localStorage.getItem('_EA_TOKEN');
  let body = { sender, invitees };
  return await request(Routes.SEND_INVITES, { token, body }, 'POST')
}

export async function deletePassToken(){
  const token = localStorage.getItem('_EA_TOKEN');
  return await request(Routes.DELETE_PASSWORD, { token }, 'DELETE')
}