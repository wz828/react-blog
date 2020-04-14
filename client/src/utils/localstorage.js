const storage = window.localStorage;

function get(key, defaultValue) {
  if (!storage) {
    alert('浏览器不支持localstorage');
    return defaultValue;
  } else {
    try {
      let value = localStorage[key];
      if (!value || value === ' ' || value === 'undefined' || value === 'null') {
        value = '';
      }
      return JSON.parse(value);
    } catch (e) {
      return defaultValue;
    }
  }
}

function set(key, value) {
  if (storage) {
    localStorage[key] = JSON.stringify(value);
  }
}

function remove(key) {
  if (storage) {
    localStorage.removeItem(key);
  }
}

function clear() {
  if (storage) {
    localStorage.clear();
  }
}

export default {
  get,
  set,
  remove,
  clear,
};
