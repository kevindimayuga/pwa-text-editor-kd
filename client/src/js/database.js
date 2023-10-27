import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // This will log an error if the method is not implemented
  console.log('put to database');
  // Create a variable that will open the database
  const jateDb = await openDB('jate', 1);
  // Create a variable that will create a transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // Create a variable that will open the object store
  const store = tx.objectStore('jate');
  // Create a variable that will add the content to the object store
  // const request = store.add({ content: content });
  const request = store.put({ id: 1, value: content });
  // Create a variable that will get the result of the request and console log it
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('get to database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  // We are using the getAll() method to get all the data in the database
  // const request = store.getAll();
  const request = store.get(1);
  // This will get the result of the request and console log it
  const result = await request;
  // console.log('result.value', result);
  if (result) {
    console.log('Database has been retrieved', result.value);
  }
  else {
    console.log('Database is not retrieved');
  }
  // This will get the value from the result object
  return result?.value;
};

initdb();
