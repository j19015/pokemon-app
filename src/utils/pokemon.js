export const getAllPokemon = (url) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

export const getPokemon = (url) =>
  new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((error) => reject(error));
  });
