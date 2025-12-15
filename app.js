
// Utility function to select DOM elements
const $ = (sel) => document.querySelector(sel);

// DOM elements
const logArea = $('#logs');
const results = $('#results');

// Function to append log messages to the log area
const appendLog = (msg) => {
  const p = document.createElement('div');
  p.textContent = `${new Date().toLocaleTimeString()} — ${msg}`;
  logArea.prepend(p);
};

// Function to render the list of items in the results area
const renderList = (items) => {
  results.innerHTML = '';
  items.forEach((it) => {
    const d = document.createElement('div');
    d.className = 'item';
    d.textContent = `#${it.id} - ${it.name} (valor: ${it.value})`;
    results.appendChild(d);
  });
};

const handleLoad = async () => {
  appendLog('Iniciando carregamento de itens...');
  try {
    const items = await window.services.fetchItems();
    renderList(items);
    appendLog('Lista carregada com sucesso');
  } catch (err) {
    appendLog('Erro ao carregar itens: ' + err.message);
  }
};

// Handler for searching item by ID
const handleSearch = async () => {
  const id = $('#searchId').value.trim();
  if (!id) {
    appendLog('Informe um ID válido');
    return;
  }
  appendLog(`Pesquisando item ${id}...`);
  try {
    if (!window.services) throw new Error('Services não carregado');
    const item = await window.services.fetchItemById(id);
    renderList([item]);
    appendLog('Pesquisa concluída com sucesso');
  } catch (err) {
    appendLog('Erro na pesquisa: ' + err.message);
  }
};

// Handler for chained action: fetch item and related info
const handleChain = async () => {
  const id = $('#searchId').value.trim() || '1';
  appendLog(`Iniciando sequência encadeada para id=${id}`);
  try {
    if (!window.services) throw new Error('Services não carregado');
    const item = await window.services.fetchItemById(id);
    appendLog(`Item encontrado: ${item.name}`);
    const related = await window.services.fetchRelatedInfo(item.id);
    appendLog(`Info relacionada: ${related.extra}`);
    renderList([item]);
  } catch (err) {
    appendLog('Erro na cadeia: ' + err.message);
  }
};

// Handler for clearing logs and results
const handleClear = () => {
  logArea.innerHTML = '';
  results.innerHTML = '';
};

$('#btnLoad').addEventListener('click', () => handleLoad());
$('#btnSearch').addEventListener('click', () => handleSearch());
$('#btnChain').addEventListener('click', () => handleChain());
$('#btnClear').addEventListener('click', () => handleClear());

appendLog('Dashboard pronto — use os botões acima para testar.');
