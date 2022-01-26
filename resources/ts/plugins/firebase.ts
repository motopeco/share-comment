import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import firebaseConfig from '../../../firebaseConfig.json'

const config: FirebaseOptions = {
  apiKey: firebaseConfig.apiKey,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  storageBucket: firebaseConfig.storageBucket,
  messagingSenderId: firebaseConfig.messagingSenderId,
  appId: firebaseConfig.appId,
  measurementId: firebaseConfig.measurementId,
}

const app = initializeApp(config)
const analytics = getAnalytics(app)

export default { app, analytics }
