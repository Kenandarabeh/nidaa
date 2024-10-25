export class EventEmitter {
  constructor() {
    this.listeners = [];
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      let idx = this.listeners.indexOf(callback);
      if (idx >= 0) this.listeners.splice(idx, 1);
    };
  }

  fire(event) {
    for (let cb of this.listeners) {
      try {
        cb(event);
      } catch {
        // Ignore errors in individual listeners
      }
    }
  }
}
