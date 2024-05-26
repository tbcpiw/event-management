// Client ID and API key from the Developer Console
const CLIENT_ID = '753146846486-7q8rlu7n4ene0p7qlp17gksb9fa34g4d.apps.googleusercontent.com';
const API_KEY = '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';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// Initializes the API client library and sets up sign-in state listeners.
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }, function(error) {
    console.error(JSON.stringify(error, null, 2));
  });
}

// Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    console.log('Signed in');
  } else {
    console.log('Not signed in');
  }
}

// Sign in the user upon button click.
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

// Add an event to the user's Google Calendar
function addEventToCalendar(eventTitle, eventDate, eventLocation) {
  const event = {
    'summary': eventTitle,
    'location': eventLocation,
    'start': {
      'dateTime': eventDate,
      'timeZone': 'Asia/Almaty'
    },
    'end': {
      'dateTime': eventDate,
      'timeZone': 'Asia/Almaty'
    }
  };

  gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  }).then(function(response) {
    console.log('Event created: ' + response.htmlLink);
    alert('Event added to Google Calendar');
  });
}
