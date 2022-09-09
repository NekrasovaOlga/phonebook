export const getStorage = () =>
  localStorage.getItem('phone')
    ? JSON.parse(localStorage.getItem('phone'))
    : [];

export const setStorage = (data) => {
  localStorage.setItem('phone', JSON.stringify(data));
};

export const removeStorage = (contact) => {
  const allContact = getStorage();
  const deletContact = allContact.filter(
      (item) => item.phone !== contact.textContent);
  setStorage(deletContact);
};
