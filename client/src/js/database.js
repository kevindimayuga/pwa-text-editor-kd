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
  console.error('putDb not implemented');
  // Create a variable that will open the database
  const jateDb = await openDB('jate', 1);
  // Create a variable that will create a transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // Create a variable that will open the object store
  const store = tx.objectStore('jate');
  // Create a variable that will add the content to the object store
  const request = store.add({ content: content });
  // Create a variable that will get the result of the request and console log it
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
