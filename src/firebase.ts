import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCZvWPwO_40wZLgJ9sO06Zz-8HqrmwocBA',
  authDomain: 'sashe-posmotret.firebaseapp.com',
  projectId: 'sashe-posmotret',
  storageBucket: 'sashe-posmotret.firebasestorage.app',
  messagingSenderId: '260378335710',
  appId: '1:260378335710:web:d2ac963b46d84e1a43e54f',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
