import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../firebase-key.json' with { type: 'json' };

const app = initializeApp({
    credential: cert(serviceAccount)
});

export const dbFirestore = getFirestore(app);