const queryCatcher =
  (fn, origin) =>
  // fn /*primera funcion q recibe el try catch */,
  // origin /*origin es donde aparece el string con el q nombramos a la funcion  */
  async (...args) => {
    try {
      const result = await fn(...args);

      return {
        ok: true,
        data: result && result.rows ? result.rows : result,
      };
    } catch (error) {
      console.error(`> [${origin}]: `, error.message);

      return {
        ok: false,
      };
    }
  };

module.exports = {
  queryCatcher,
};
