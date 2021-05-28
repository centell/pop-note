/* eslint no-unused-vars:0 */
/* eslint no-undef:0 */
/* eslint no-unused-expressions:0 */
const defaultParams = {
  note: '',
};

const saveOptions = (e) => {
  e.preventDefault();
  browser.storage.sync.set({
    note: document.querySelector('#note').value,
  });
};

const restoreOptions = () => {
  const setCurrentOptions = (result) => {
    document.querySelector('#note').value = result.note || defaultParams.note;
  };

  const onError = (err) => {
    console.log(`Error: ${err}`);
  };

  const getNote = browser.storage.sync.get('note');
  getNote.then(setCurrentOptions, onError);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
