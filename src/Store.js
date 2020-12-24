const excludeKeys = ['canIUseLaunchApp', 'isIpx', 'platform', 'deviceInfo'];

class Store {
  constructor() {
    this.store = {
    };
  }

  get(key) {
    return this.store[key];
  }

  set({ key, data, lasting }) {
    this.store[key] = data;
    if (lasting && !excludeKeys.includes(key)) {
      excludeKeys.push(key);
    }
  }

  clear() {
    const { store } = this;
    const keys = Object.keys(store);

    if (keys.length) {
      keys.forEach((key) => {
        if (!excludeKeys.includes(key)) {
          delete store[key];
        }
      });
    }
  }
}

export default new Store();
