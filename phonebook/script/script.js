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
    <th class='edit'></th>
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
    overlay.classList.add('form-overlay');

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
    tdDel.append(buttonDel);

    const tdEdit = document.createElement('td');
    tdEdit.classList.add('edit-btn');
    const buttonEdit = document.createElement('button');
    buttonEdit.innerHTML = ` <i class="fa-solid fa-pen-to-square"></i>`;
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

  //  Создание таблицы с контактами
  const renderContacts = (list, data) => {
    const allRow = data.map(createRow);

    list.append(...allRow);

    return allRow;
  };


  // Вызов функции
  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const titleLogo = createLogo(title);
    const footer = createFooter(title);
    const main = createMain();
    const buttonGroup = createGroupButton([
      {
        className: 'btn btn-primary mr-3 js-add',
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
      titleLogo,
      btnAdd: buttonGroup.buttons[0],
      formOverlay: form.overlay,
    };
  };
  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const init = (elemApp, title) => {
    const app = document.querySelector(elemApp);
    const phoneBook = renderPhoneBook(app, title);
    const {list, titleLogo, btnAdd, formOverlay} = phoneBook;
    const allRow = renderContacts(list, data);

    hoverRow(allRow, titleLogo);
    btnAdd.addEventListener('click', () => {
      formOverlay.classList.add('is-visible');
    });
    formOverlay.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('form') || target.className === 'close') {
        formOverlay.classList.remove('is-visible');
      }
    });
  };
  window.phoneBookInit = init;
}
