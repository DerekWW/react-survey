import config from './config'

export function checkAuth(immediate, callback) {
  window.gapi.auth.authorize({
    'client_id': config.clientId,
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
    'immediate': immediate,
    'apiKey': config.apiKey,
  }, callback);
}

/**
 * Load the quotes from the spreadsheet
 * Embellish them with user own likes
 */
export function load(callback) {
  let data = '';

  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: config.spreadsheetId,
      range: 'Form Responses 1!$A$1:$YY'
    }).then((response) => {
      data = response.result.values || [];

      console.log(data);


      callback({ data });

    }, (error) => {
      console.log(error);
      callback(false, error.result.error);
    });
  });
}
