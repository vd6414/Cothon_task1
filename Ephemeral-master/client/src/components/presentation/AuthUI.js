import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';


function Auth(props) {

  const prodConfig = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
	databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
  }

  firebase.initializeApp(prodConfig);

  // FirebaseUI config.
  const uiConfig = {
	signInSuccessUrl: '/auth',
	signInOptions: [
	  // Leave the lines as is for the providers you want to offer your users.
	  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	  firebase.auth.FacebookAuthProvider.PROVIDER_ID,
	  firebase.auth.TwitterAuthProvider.PROVIDER_ID,
	  firebase.auth.GithubAuthProvider.PROVIDER_ID,
	  firebase.auth.EmailAuthProvider.PROVIDER_ID,
	  firebase.auth.PhoneAuthProvider.PROVIDER_ID,
	  firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
	],
	// tosUrl and privacyPolicyUrl accept either url string or a callback
	// function.
	// Terms of service url/callback.
	//tosUrl: '<your-tos-url>',
	// Privacy policy url/callback.
	/*
	privacyPolicyUrl: function() {
	  window.location.assign('<your-privacy-policy-url>');
	}
	*/
  };

  // Initialize the FirebaseUI Widget using Firebase.
  const ui = new firebaseui.auth.AuthUI(firebase.auth());
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);	

  return (
	 <div className='auth-container'>
	   <div id='firebaseui-auth-container'>
	   </div>
    </div>
  )
}

export default Auth;
