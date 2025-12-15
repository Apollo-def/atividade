
const s = require('./services.js');

(async () => {
  console.log('== Iniciando testes de services ==');

  console.log('\n1) Teste fetchItems');
  const items = await s.fetchItems();
  console.log('-> itens retornados:', items.length);

  console.log('\n2) Teste fetchItemById (existente)');
  try {
    const it = await s.fetchItemById(1);
    console.log('-> encontrado:', it.name);
  } catch (e) { console.error('-> erro inesperado:', e.message); }

  console.log('\n3) Teste fetchItemById (inexistente)');
  try {
    await s.fetchItemById(999);
    console.error('-> esperado erro, mas foi sucesso');
  } catch (e) { console.log('-> erro esperado:', e.message); }

  console.log('\n4) Teste fetchRelatedInfo');
  try {
    const rel = await s.fetchRelatedInfo(2);
    console.log('-> related extra:', rel.extra);
  } catch (e) { console.error('-> erro:', e.message); }

  console.log('\n== Testes concluídos ==');
  process.exit(0);
})();
