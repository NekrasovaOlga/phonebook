import { getStorage, setStorage } from './serviceStorage.js';
const createContact = (contact) => {
  const newContact = getStorage();
  newContact.push(contact);
  setStorage(newContact);
};
// Создание контейнера
const createContain = () => {
  const container = document.createElement('div');
  container.classList.add('container');
  return container;
};
//  Создание header
const createHeader = () => {
  const header = document.createElement('header');
  header.classList.add('header');

  const headerContain = createContain();
  header.append(headerContain);
  header.headerContain = headerContain;

  return header;
};
// Создание подвала
const createFooter = (title) => {
  const footer = document.createElement('footer');
  footer.classList.add('footer');
  footer.textContent = `Все права защищены! © ${title}`;

  return footer;
};
//  Создание заголовка
const createLogo = (title) => {
  const logo = document.createElement('h1');
  logo.classList.add('logo');
  logo.textContent = `Телефонный справочник, ${title}`;

  return logo;
};
// Кнопки
const createGroupButton = (params) => {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('btn-wrapper');
  const buttons = params.map(({ className, type, text }) => {
    const button = document.createElement('button');
    button.className = className;
    button.textContent = text;
    button.type = type;

    return button;
  });
  buttonWrapper.append(...buttons);
  return {
    buttonWrapper,
    buttons,
  };
};
// Таблица
const createTable = () => {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped');

  const thead = document.createElement('thead');

  thead.insertAdjacentHTML('beforeend', `
    <tr>
    <th class='delete'>Удалить</th>
    <th class='edit'></th>
    <th class='sortName'>Имя</th>
    <th class='sortSurname'>Фамилия</th>
    <th>Телефон</th>

    </tr>`);

  const tbody = document.createElement('tbody');

  table.append(thead, tbody);
  table.tbody = tbody;

  return table;
};

//  Создание формы
const createForm = () => {
  const overlay = document.createElement('div');
  overlay.classList.add('form-overlay');

  const form = document.createElement('form');
  form.classList.add('form');

  form.insertAdjacentHTML('beforeend', `
    <button class='close' type='button'></button>
    <h2 class='form-title'>Добавить контакт</h2>
  <div class='form-group'>
  <label for='name' class='form-label'>Имя:</label>
  <input class='form-input' type='text' name='name' id='name' required>
  </div>
  <div class='form-group'>
  <label for='surname' class='form-label'>Фамилия:</label>
  <input class='form-input' type='text' name='surname' id='surname' required>
  </div>
  <div class='form-group'>
  <label for='phone' class='form-label'>Телефон:</label>
  <input class='form-input' type='text' name='phone' id='phone' required>
  </div>
    `);

  const buttonGroup = createGroupButton([
    {
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    },
  ]);

  form.append(...buttonGroup.buttons);

  overlay.append(form);
  return {
    overlay,
    form,
  };
};
// Создание основного контента
const createMain = () => {
  const main = document.createElement('main');
  const mainContainer = createContain();

  main.append(mainContainer);

  main.mainContainer = mainContainer;

  return main;
};

//  Создание строк
const createRow = ({ name: FirstName, surname, phone }) => {
  const tr = document.createElement('tr');
  tr.classList.add('contact');

  const tdDel = document.createElement('td');
  tdDel.classList.add('delete');
  const buttonDel = document.createElement('button');
  buttonDel.classList.add('del-icon');
  tdDel.append(buttonDel);

  const tdEdit = document.createElement('td');
  tdEdit.classList.add('edit-btn');
  const buttonEdit = document.createElement('button');
  buttonEdit.innerHTML = ` <i class='fa-solid fa-pen-to-square'></i>`;
  tdEdit.append(buttonEdit);

  const tdName = document.createElement('td');
  tdName.classList.add('table-name');
  tdName.textContent = FirstName;
  const tdSurname = document.createElement('td');
  tdSurname.textContent = surname;
  tdSurname.classList.add('table-surname');
  const tdPhone = document.createElement('td');
  const phoneLink = document.createElement('a');
  phoneLink.classList.add('table-phone');
  phoneLink.href = `tel:${phone}`;
  phoneLink.textContent = phone;
  tdPhone.append(phoneLink);
  tr.phoneLink = phoneLink;
  tr.tdEdit = tdEdit;
  tr.append(tdDel, tdEdit, tdName, tdSurname, tdPhone);
  return tr;
};

const createContactPage = (contact, list) => {
  list.append(createRow(contact));
};
export {
  createContact,
  createContain,
  createHeader,
  createFooter,
  createLogo,
  createGroupButton,
  createTable,
  createForm,
  createMain,
  createRow,
  createContactPage,
};
