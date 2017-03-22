

export function checkAuth(immediate, callback) {
  window.gapi.auth.authorize({
    'client_id': '1018029921808-gr8uu4k8m6aup9h0un2t7d5cv6vm749n.apps.googleusercontent.com',
    'scope': 'https://www.googleapis.com/auth/spreadsheets.readonly',
    'immediate': immediate,
    'apiKey': 'AIzaSyDVvtSK4fZ6htviqyvwUsMAQ-MYbPkgCEk',
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
      spreadsheetId: '1tA60Gczx8N2451Ul9_0nPfoMTggHa6k8JWoJQdoJvOI',
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
