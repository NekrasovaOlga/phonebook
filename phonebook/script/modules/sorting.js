import sortContacts from './sort.js';

const sorting = (sortName, sortSurname) => {
  sortName.addEventListener('click', (e) => {
    sortContacts(2);
  });

  sortSurname.addEventListener('click', (e) => {
    sortContacts(3);
  });
};

export default sorting;
