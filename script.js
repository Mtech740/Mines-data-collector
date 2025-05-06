document.getElementById('loggerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const rawInput = document.getElementById('board').value.trim();
  const lines = rawInput.split('\n').map(line => line.split(','));

  if (lines.length !== 5 || lines.some(row => row.length !== 5)) {
    document.getElementById('message').textContent = 'Error: Must be a 5x5 grid.';
    return;
  }

  const board = lines.map(row => row.map(cell => cell.toUpperCase() === 'M' ? 1 : 0));

  fetch('data.json')
    .then(res => res.json())
    .then(data => {
      data.push(board);
      return fetch('data.json', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    })
    .then(() => {
      document.getElementById('message').textContent = 'Board saved!';
      document.getElementById('board').value = '';
    })
    .catch(() => {
      document.getElementById('message').textContent = 'Error saving data.';
    });
});
