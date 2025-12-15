# Atividade de Revisão - Arrow Functions e Funções Assíncronas

## Parte 1 - Conceitos Fundamentais

### 1. Arrow Functions
1. Diferenças entre arrow functions e funções tradicionais

- Arrow functions têm sintaxe mais curta e são frequentemente usadas para funções pequenas e callbacks.
- Elas não possuem seu próprio `this` — herdam o `this` do contexto léxico onde foram definidas. Isso evita a necessidade de `bind` em muitos casos.
- Não podem ser usadas como construtoras (não têm `new`).
- Não possuem `arguments` próprio; se precisar de `arguments`, use parâmetros rest `(...args)`.

2. Reescritas usando arrow functions

- Soma de dois números:

```js
const soma = (a, b) => a + b;
```

- Verificar se um número é par:

```js
const isPar = n => n % 2 === 0;
```

- Dobro de cada elemento de um array:

```js
const dobroArray = arr => arr.map(x => x * 2);
```

3. Menu de opções (simulado)

```js
const op1 = () => console.log('Opção 1 escolhida');
const op2 = () => console.log('Opção 2 escolhida');
const sair = () => console.log('Encerrando...');

const menu = (op) => {
  const mapa = { '1': op1, '2': op2, '0': sair };
  (mapa[op] || (() => console.log('Opção inválida')))();
};

menu('1');
```

---
## Parte 2 - Funções Assíncronas e Promises

### 4. Conceitos
1. O que é uma Promise?

- Uma `Promise` é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu resultado. Ela permite encadear tratamentos com `.then()` e `.catch()` e compor operações assíncronas de forma previsível.
- Situações: chamadas de rede (fetch/AJAX), operações de arquivo, timers, db queries, etc.

2. Exemplo: then/catch -> async/await

Antes (then/catch):

```js
fetch('/dados')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

Depois (async/await):

```js
const carregar = async () => {
  try {
    const r = await fetch('/dados');
    const data = await r.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
```

3. Cenário real na indústria

- Em uma aplicação de e-commerce, chamadas para APIs de pagamento, disponibilidade de estoque e cálculo de frete são assíncronas; sem async/await ou promises, o código ficaria cheio de callbacks e difícil de manter.

### 5. Práticas com Async/Await
1. Função assíncrona que usa setTimeout para simular API

```js
const fakeApi = async () => {
  return new Promise(resolve => setTimeout(() => resolve({ ok: true, data: [1,2,3] }), 800));
};

const usarApi = async () => {
  try {
    const res = await fakeApi();
    console.log('Recebido:', res.data);
  } catch (err) {
    console.error('Erro:', err);
  }
};
```

2. Uso de try/catch já mostrado acima — trata erros lançados pela Promise.

3. Encadeamento onde uma função depende do resultado de outra

```js
const getUser = async (id) => ({ id, name: 'Usuario ' + id });
const getOrders = async (userId) => [{ id: 1, userId }];

const fluxo = async () => {
  try {
    const user = await getUser(5);
    const orders = await getOrders(user.id);
    return { user, orders };
  } catch (err) { throw err; }
};
```

---
## Parte 3 - Aplicações em Frameworks

### 6. React
1. Por que arrow functions em eventos?

- Arrow functions tornam simples passar callbacks inline com o contexto correto (`this`), especialmente em componentes funcionais e quando queremos evitar rebinding em classes.

2. Exemplo de componente React (funcional) com evento e async

```jsx
import React, { useState } from 'react';

export default function Demo(){
  const [data, setData] = useState(null);

  const handleClick = async () => {
    try {
      // Simula fetch
      const r = await new Promise(res => setTimeout(()=> res({msg:'ok'}), 500));
      setData(r);
    } catch(e){ console.error(e); }
  };

  return (
    <div>
      <button onClick={handleClick}>Carregar</button>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  );
}
```

---
## Parte 4 - Projeto Final (Desafio)

Criei na mesma pasta um mini-dashboard (index.html, app.js, services.js) que implementa:

- Botões com handlers escritos como arrow functions.
- Chamadas assíncronas simuladas em `services.js` com `setTimeout`.
- Tratamento de erros com `try/catch`.
- Encadeamento: `fetchItemById` -> `fetchRelatedInfo`.

Como usar (manual rápido):

1. Abra `index.html` no navegador.
2. Clique em "Carregar lista" para ver todos os itens.
3. Pesquise por ID (1,2,3) ou use a ação encadeada.

---
## Parte 5 - Reflexão Final

1. Como arrow functions facilitam o desenvolvimento?

- Sintaxe enxuta, menos boilerplate; facilitam escrita de callbacks e garantem contexto léxico estável para `this`.

2. Por que funções assíncronas são essenciais?

- Permitem lidar com IO e chamadas de rede sem bloquear a UI, mantendo código legível e fácil de compor.

3. Como se complementam?

- Arrow functions simplificam handlers e callbacks; async/await organiza o fluxo assíncrono. Juntas tornam o código de interfaces reativas mais direto e menos propenso a erros de contexto.

---
Entrega: os arquivos estão na pasta do projeto para abrir e testar manualmente.
