'use strict';

{
  const getStorage = () => {
    return (localStorage.getItem('phone')) ? JSON.parse(localStorage.getItem('phone')) : [];
  };

  const setStorage = (data) => {
    localStorage.setItem('phone', JSON.stringify(data));
  };

  const createContact = contact => {
    const newContact = getStorage();
    newContact.push(contact);
    setStorage(newContact);
  };

  const removeStorage = contact => {
    const allContact = getStorage();
    const deletContact = allContact.filter(item => item.phone !== contact.textContent);
    setStorage(deletContact);
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
  const createRow = ({name: FirstName, surname, phone}) => {
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

  //  Создание таблицы с контактами
  const renderContacts = (list, data) => {
    const allRow = data.map(createRow);
    list.append(...allRow);
    return allRow;
  };
  const sortContacts = (number) => {
    const table = document.querySelector('.table');
    const sortedRows = Array.from(table.rows)
        .slice(1)
        .sort((rowA, rowB) =>
          (rowA.cells[number].innerHTML > rowB.cells[number].innerHTML ? 1 : -1));

    table.tBodies[0].append(...sortedRows);
    localStorage.setItem('sort', number);
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
    const {form, overlay} = createForm();
    header.headerContain.append(titleLogo);
    main.mainContainer.append(buttonGroup.buttonWrapper, table);

    app.append(header, main, overlay, footer);
    return {
      list: table.tbody,
      titleLogo,
      btnAdd: buttonGroup.buttons[0],
      btnRemove: buttonGroup.buttons[1],
      formOverlay: overlay,
      form,
    };
  };
  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      formOverlay.classList.add('is-visible');
    };

    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);
    formOverlay.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.closest('form') || target.className === 'close') {
        closeModal();
      }
    });

    return {
      closeModal,
    };
  };

  const deleteControl = (btnRemove) => {
    btnRemove.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach((del) => {
        del.classList.toggle('is-visible');
      });
    });
  };

  const sorting = (sortName, sortSurname) => {
    sortName.addEventListener('click', (e) => {
      sortContacts(2);
    });

    sortSurname.addEventListener('click', (e) => {
      sortContacts(3);
    });
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach((contact) => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink.textContent;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };
  const createContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const delRow = (list) => {
    list.addEventListener('click', (e) => {
      if (e.target.closest('.del-icon')) {
        e.target.closest('.contact').remove();
        removeStorage(e.target.closest('.contact').lastChild.lastChild);
      }
    });
  };
  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const formObj = new FormData(e.target);
      const newContact = Object.fromEntries(formObj);
      createContact(newContact);
      createContactPage(newContact, list);

      form.reset();
      closeModal();
    });
  };

  const init = (elemApp, title) => {
    const app = document.querySelector(elemApp);
    const {list,
      titleLogo,
      btnAdd,
      formOverlay,
      form,
      btnRemove} = renderPhoneBook(app, title);
    const data = getStorage();
    const allRow = renderContacts(list, data);
    const sortName = document.querySelector('.sortName');
    const sortSurname = document.querySelector('.sortSurname');
    const {closeModal} = modalControl(btnAdd, formOverlay);

    const sortLocal = localStorage.getItem('sort');
    if (sortLocal !== null) {
      sortContacts(sortLocal);
    }

    hoverRow(allRow, titleLogo);
    deleteControl(btnRemove);
    delRow(list);
    sorting(sortName, sortSurname);
    formControl(form, list, closeModal);
  };
  window.phoneBookInit = init;
}
