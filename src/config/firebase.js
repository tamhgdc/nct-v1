import { initializeApp } from 'firebase/app'
import { FIREBASE_CONFIG } from 'share/constants'

import {
	getAuth,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'

const app = initializeApp(FIREBASE_CONFIG)
const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

const storage = getStorage(app)

const db = getFirestore(app)

export { auth, googleProvider, facebookProvider, db, storage }