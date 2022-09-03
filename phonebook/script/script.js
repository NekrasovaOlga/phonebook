'use strict';

const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];

{
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
  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.textContent = 'Все права защищены!';

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
    const buttons = params.map(({className, type, text}) => {
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
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Телефон</th>

    </tr>`);

    const tbody = document.createElement('tbody');

    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };
  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('from-overlay');

    const form = document.createElement('form');
    form.classList.add('form');

    form.insertAdjacentHTML('beforeend',
        `
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
    `,
    );

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

  const createRow = ({name: FirstName, surname, phone}) => {
    const tr = document.createElement('tr');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = FirstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);

    tr.append(tdDel, tdName, tdSurname, tdPhone);
    return tr;
  };

  //  Создание таблицы с контактами
  const renderContacts = (list, data) => {
    const allRow = data.map(createRow);

    list.append(...allRow);
  };


  // Вызов функции
  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const titleLogo = createLogo(title);
    const footer = createFooter();
    const main = createMain();
    const buttonGroup = createGroupButton([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const form = createForm();
    header.headerContain.append(titleLogo);
    main.mainContainer.append(buttonGroup.buttonWrapper, table);

    app.append(header, main, form.overlay, footer);

    return {
      list: table.tbody,
    };
  };

  const init = (elemApp, title) => {
    const app = document.querySelector(elemApp);
    const phoneBook = renderPhoneBook(app, title);

    const {list} = phoneBook;

    renderContacts(list, data);
  };
  window.phoneBookInit = init;
}
