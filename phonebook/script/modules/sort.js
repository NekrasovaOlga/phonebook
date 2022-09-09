const sortContacts = (number) => {
  const table = document.querySelector('.table');
  const sortedRows = Array.from(table.rows)
    .slice(1)
    .sort((rowA, rowB) =>
      rowA.cells[number].innerHTML > rowB.cells[number].innerHTML ? 1 : -1
      );

  table.tBodies[0].append(...sortedRows);
  localStorage.setItem('sort', number);
};

export default sortContacts;
