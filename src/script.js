import {getStorage} from './script/serviceStorage.js';

import * as control from './script/control.js';

import {renderContacts, renderPhoneBook} from './script/renderElement.js';

import sortContacts from './script/sort.js';
import sorting from './script/sorting.js';

import './scss/index.scss';
import './index.html';

const init = (elemApp, title) => {
  const app = document.querySelector(elemApp);
  const {list, titleLogo, btnAdd, formOverlay, form, btnRemove} =
    renderPhoneBook(app, title);
  const data = getStorage();
  const allRow = renderContacts(list, data);
  const sortName = document.querySelector('.sortName');
  const sortSurname = document.querySelector('.sortSurname');
  const {closeModal} = control.modalControl(btnAdd, formOverlay);

  const sortLocal = localStorage.getItem('sort');
  if (sortLocal !== null) {
    sortContacts(sortLocal);
  }

  control.hoverRow(allRow, titleLogo);
  control.deleteControl(btnRemove);
  control.delRow(list);
  sorting(sortName, sortSurname);
  control.formControl(form, list, closeModal);
};

init('#app', 'Ольга');
