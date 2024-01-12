function fetchData() {
  return fetch('https://bigonion.cn');
}
function main() {
  let _data;
  _data = fetchData();
  console.log('页面GET到的内容\n:', _data.toString().substring(0, 200));
}
function changedFetchEnv(func) {
  const cache = [];
  let i = 0;
  const _fetch = window.fetch;
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled') {
        return cache[i].data;
      }
      else if (cache[i].status === 'rejected') {
        throw cache[i].err;
      }
    }
    const result = {
      status: 'pending',
      data: null,
      err: null,
    };
    cache[i++] = result;

    const _promise = _fetch(...args)
      .then((res) => res.text())
      .then(
        (res) => {
          result.status = 'fulfilled';
          result.data = res;
        },
        (err) => {
          result.status = 'rejected';
          result.err = err;
        });
    throw _promise;
  };

  try {
    func();
  } catch (err) {
    if (err instanceof Promise) {
      i = 0;
      err.then(func, func);
    }
  }
}
changedFetchEnv(main);
