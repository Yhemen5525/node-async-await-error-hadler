/** @format */

//asyn error handler
const awaitHandler = (promise) => {
  return promise
    .then((result) => ({
      ok: true,
      result,
    }))
    .catch((error) =>
      Promise.resolve({
        ok: false,
        error,
      })
    );
};

module.exports = awaitHandler;
