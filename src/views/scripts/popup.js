/* eslint no-undef:0 */
const clickListener = () => {
  document.addEventListener('click', e => {
    if (e.target.id === 'optionButton') {
      e.preventDefault();
      browser.runtime.openOptionsPage();
    }
    if (e.target.id === 'saveButton') {
      e.preventDefault();
      browser.storage.sync.set({
        note: document.querySelector('#note').value,
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', async () => {
  clickListener();
  const onError = (err) => {
    console.log(`Error: ${err}`);
  };
  const init = (options) => {
    let note = '';
    if (options.note) note = options.note;
    document.querySelector('#note').innerText = note;
  };
  const getting = browser.storage.sync.get('note');
  getting.then(init, onError);
});
