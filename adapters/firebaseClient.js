import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: 'AIzaSyBdIVi_VUkGmxsTGel-v4UA23kt58ZBncE',
		authDomain: 'drumtab-club.firebaseapp.com',
		projectId: 'drumtab-club',
		storageBucket: 'drumtab-club.appspot.com',
		messagingSenderId: '838406673348',
		appId: '1:838406673348:web:d8ad35ad355c03d221ca91',
		measurementId: 'G-2GXXSRVD69',
	});
}

const analytics = firebase.analytics;
const storage = firebase.storage();

export { firebase, analytics, storage };
