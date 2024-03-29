/* Validation related  constants starts */
/** @constant
 *  @type {string}
 *  @default
*/
module.exports.INVALID_PARAMETER = 'Please send me correct parameter';
module.exports.EMAIL_NOT_FOUND = 'Email can\'t be empty';
module.exports.INVALID_EMAIL_FOUND = 'Email is invalid';
module.exports.EMAIL_NOT_AVAILABLE = 'This email is taken';
module.exports.EMAIL_IS_AVAILABLE = 'This email is available';
module.exports.USERNAME_NOT_FOUND = 'Username can\'t be empty';
module.exports.NAME_NOT_FOUND = 'Name can\'t be empty';
module.exports.STANDARD_NOT_FOUND = 'Standard can\'t be empty';
module.exports.PERCENTAGE_NOT_FOUND = 'Percentage can\'t be empty';
module.exports.PASSING_YEAR_NOT_FOUND = 'Passing year can\'t be empty';
module.exports.WRONG_PASSWORD = 'The entered password is wrong';
module.exports.PASSWORD_NOT_FOUND = 'password can\'t be empty';
module.exports.INVALID_CREDENTIALS = 'Invalid credentials, Please try again';
module.exports.LOGIN_SUCESS = 'LoggedIn scessfully';
module.exports.LOGIN_FAILED = 'Login failed, try again';
module.exports.REGISTRATION_SUCESS = 'Registered sucessfully';
module.exports.UPDATE_SUCESS = 'Updated sucessfully';
module.exports.DELETION_SUCESS = 'Deleted sucessfully';
module.exports.AD_SLOT_ID_MISSING = 'No ad refrence found, try again';
module.exports.AD_LINK_MISSING = 'Link for the for ad is missing';
module.exports.AD_CONTENT_MISSING = 'Ad Content is missing';
module.exports.AD_BID_AMOUNT_MISSING = 'Ad bid amount is missing';
module.exports.AD_BID_ADDED = 'Your bidding is done on this slot';
module.exports.AD_USERID_SLOTID_NEW_BID_MISSING = 'User Id or the Slot ID is missing, Bid can\'t be added';
module.exports.AD_USERID_SLOTID_DEACTIVATE_BID_MISSING = 'User Id or the Slot ID is missing, Bid can\'t be added';
/* Validation related  constants ends */


/* Route related constants starts */
/** @constant
 *  @type {string}
 *  @default
*/
module.exports.ROUTE_NOT_FOUND = `You are at wrong place. Shhoooo...`;
module.exports.SERVER_ERROR_MESSAGE = `Something bad happend. It's not you, it's me.`;
module.exports.SERVER_NOT_RESPONDING_MESSAGE = `It's not you it's me, am working on it`;


/* HTTP status code and Status Text constants starts */
/** @constant
 *  @type {number}
 *  @default
*/
module.exports.SERVER_REQUEST_ERROR_HTTP_CODE = 412;
module.exports.SERVER_NOT_ALLOWED_HTTP_CODE = 503;
module.exports.SERVER_OK_HTTP_CODE = 200;
module.exports.SERVER_NOT_FOUND_HTTP_CODE = 404;
module.exports.SERVER_INTERNAL_ERROR_HTTP_CODE = 500;
module.exports.SERVER_UNAUTHORIZE_HTTP_CODE = 401;
module.exports.SERVER_NOT_ACCEPTABLE_HTTP_CODE = 406;

/** @constant
 *  @type {string}
 *  @default
*/
module.exports.SERVER_REQUEST_ERROR_HTTP_TEXT = 'precondition failed';
module.exports.SERVER_OK_HTTP_TEXT = 'success';
module.exports.SERVER_NOT_FOUND_HTTP_TEXT = 'not found';
module.exports.SERVER_INTERNAL_ERROR_HTTP_TEXT = 'internal server error';
module.exports.SERVER_UNAUTHORIZE_HTTP_TEXT = 'unauthorized';
module.exports.SERVER_NOT_ACCEPTABLE_HTTP_TEXT = 'not acceptable';


/* Application related constants starts */
/** @constant
 *  @type {string}
 *  @default
*/

module.exports.MONGODB_QUESTION_COLLECTION_NAME ='questions';
module.exports.MONGODB_FEEDBACK_COLLECTION_NAME ='feedback';
module.exports.MONGODB_USER_COLLECTION_NAME ='user';
module.exports.MONGODB_STUDENT_COLLECTION_NAME ='student';

/* JWT related constants starts */
/** @constant
 *  @type {string}
 *  @default
*/

module.exports.JWT_KEY = 'my_secret_key';
module.exports.JWT_EXPIRY_SECONDS = 30000; 