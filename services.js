
const _fakeData = [
  { id: 1, name: 'Item Alpha', value: 10 },
  { id: 2, name: 'Item Beta', value: 20 },
  { id: 3, name: 'Item Gamma', value: 30 }
];

const _randomDelay = () => Math.floor(Math.random() * 1200) + 300;

// Async function to fetch all items with simulated delay
const fetchItems = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([..._fakeData]), _randomDelay());
  });
};

// Function to fetch a specific item by ID, rejects if not found
const fetchItemById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = _fakeData.find((x) => x.id === Number(id));
      if (found) resolve(found);
      else reject(new Error('Item não encontrado'));
    }, _randomDelay());
  });
};

// Async function to fetch related info for an item, depends on fetchItemById
const fetchRelatedInfo = async (id) => {
  const item = await fetchItemById(id);
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: item.id, extra: `${item.name} - detalhe` }), _randomDelay());
  });
};

if (typeof window !== 'undefined') {
  window.services = {
    fetchItems,
    fetchItemById,
    fetchRelatedInfo
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    fetchItems,
    fetchItemById,
    fetchRelatedInfo
  };
}
