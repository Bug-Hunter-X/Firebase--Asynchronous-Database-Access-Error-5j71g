Instead of directly accessing the database reference, use methods like `onAuthStateChanged` to handle the asynchronous initialization. Here's an example using async/await:

```javascript
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue } from "firebase/database";

const firebaseConfig = {
  // ... your Firebase config
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const readData = async () => {
  try {
    const snapshot = await get(ref(db, 'yourPath'));
    const data = snapshot.val();
    console.log(data);
  } catch (error) {
    console.error("Error reading data:", error);
  }
};

readData();
```

Alternatively, use `.on` methods for real-time updates:

```javascript
const dataRef = ref(db, 'yourPath');
onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
}, {onlyOnce: true});
```
This solution ensures data access happens only after the database is initialized, preventing errors.