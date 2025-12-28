if (!global.queueMicrotask) {
  global.queueMicrotask = (cb) => Promise.resolve().then(cb);
}
