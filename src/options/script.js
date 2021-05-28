/* eslint no-unused-vars:0 */
/* eslint no-undef:0 */
/* eslint no-unused-expressions:0 */
const defaultParams = {
  note: '',
  rows: 5,
  cols: 33,
};

const saveOptions = (e) => {
  e.preventDefault();
  browser.storage.sync.set({
    note: document.querySelector('#note').value,
    rows: document.querySelector('#rows').value,
    cols: document.querySelector('#cols').value,
  });
};

const restoreOptions = () => {
  const setCurrentOptions = (result) => {
    document.querySelector('#note').value = result.note || defaultParams.note;
    document.querySelector('#rows').value = result.rows || defaultParams.rows;
    document.querySelector('#cols').value = result.cols || defaultParams.cols;
  };

  const onError = (err) => {
    console.log(`Error: ${err}`);
  };

  browser.storage.sync.get('note').then(setCurrentOptions, onError);
  browser.storage.sync.get('rows').then(setCurrentOptions, onError);
  browser.storage.sync.get('cols').then(setCurrentOptions, onError);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
