import {
  createHeader,
  createFooter,
  createLogo,
  createGroupButton,
  createTable,
  createForm,
  createMain,
  createRow,
} from './createElement.js';

//  Создание таблицы с контактами
export const renderContacts = (list, data) => {
  const allRow = data.map(createRow);
  list.append(...allRow);
  return allRow;
};

// Вызов функции
export const renderPhoneBook = (app, title) => {
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
