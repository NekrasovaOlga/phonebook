import * as elem from './createElement.js';
import { removeStorage } from './serviceStorage.js';

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

const delRow = (list) => {
  list.addEventListener('click', (e) => {
    if (e.target.closest('.del-icon')) {
      e.target.closest('.contact').remove();
      removeStorage(e.target.closest('.contact').lastChild.lastChild);
    }
  });
};
const formControl = (form, list, closeModal) => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formObj = new FormData(e.target);
    const newContact = Object.fromEntries(formObj);
    elem.createContact(newContact);
    elem.createContactPage(newContact, list);

    form.reset();
    closeModal();
  });
};

export { deleteControl, hoverRow, delRow, formControl, modalControl };
