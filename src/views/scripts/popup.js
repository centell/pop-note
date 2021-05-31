/* eslint no-undef:0 */

const eventListeners = () => {
  document.addEventListener('click', e => {
    if (e.target.id === 'optionButton') {
      e.preventDefault();
      browser.runtime.openOptionsPage();
    }
    if (e.target.id === 'addNoteButton') {
      e.preventDefault();
      updateNote(0);
    }
  });
  document.addEventListener('change', e => {
    e.preventDefault();
    if (e.target.id === 'note') {
      // browser.storage.sync.get('note').then(previousNote => {
      //   updateNote(previousNote, e.dataset.index);
      // });
    }
  });
};

const initialize = () => {
  // clear elements
  document.querySelector('#noteList').innerHTML = '';
  // create elements
  const init = (options) => {
    let note = [{
      content: '# Note\nHello, Note!',
    }];
    if (options.note) note = options.note;
    document.querySelector('#noteCount').innerText = note.length;

    for (let i = 0, l = note.length; i < l; i += 1) {
      const li = createLi(note[i].content);
      document.querySelector('#noteList').appendChild(li);
    }
  };
  const onError = (err) => {
    console.log(`Error: ${err}`);
  };
  browser.storage.sync.get('note').then(init, onError);
  browser.storage.sync.get('rows').then(obj => {
    document.querySelector('#note').setAttribute('rows', obj.rows || 5);
  }, onError);
  browser.storage.sync.get('cols').then(obj => {
    document.querySelector('#note').setAttribute('cols', obj.cols || 33);
  }, onError);
};

const updateNote = (targetIndex) => {
  browser.storage.sync.get('note').then((previousNote) => {
    const newNote = previousNote.note;
    if (targetIndex === 0) {
      newNote.push({
        content: '',
      });
    }

    browser.storage.sync.set({
      note: newNote,
    });
  });
  initialize();
};

const createLi = (content) => {
  const li = document.createElement('li');
  // eslint-disable-next-line prefer-destructuring
  li.innerText = content.split('\n')[0];
  return li;
};

document.addEventListener('DOMContentLoaded', async () => {
  eventListeners();
  initialize();
});
