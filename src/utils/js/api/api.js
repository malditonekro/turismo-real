import DebugUtil from '../debug/debug';

const log = DebugUtil.log.bind(DebugUtil, 'Api Web Services Call />');

const wsPaths = {
  CITIES: 'https://api-turismo-duoc.herokuapp.com/api/ciudades',
  APARTMENT: 'https://api-turismo-duoc.herokuapp.com/api/departamentos',
  COMUNA_BY_CITY: 'https://api-turismo-duoc.herokuapp.com/api/comunaByCiudad?ciudad='
};


const fetchCities = async () => {
  return await fetch(wsPaths.CITIES)
  .then(response => response.json())
  .then(response => {
    log('fetchCities response', response);      
    return response.sort((a,b) => a.idCiudad - b.idCiudad)
  }).catch(err => {
    log("fetchCities Error />",err);
    return [];
  });
};

const fetchComunaByCity = async (city = 1) => {
  const url = `${wsPaths.COMUNA_BY_CITY}${city}`;
  return await fetch(url)
  .then(response => response.json())
  .then(response => {
    log('fetchComunaByCity response', response);      
    return response;
  }).catch(err => {
    log("fetchComunaByCity Error />",err);
    return [];
  });
};

const fetchApartment = async (filters, maxResults) => {
  return await fetch(wsPaths.APARTMENT)
  .then(response => response.json())
  .then(response => {
    log('fetchApartment response', response);
    let apartments = response.sort((a,b) => a.idCiudad - b.idCiudad);
    if (filters) {
      if (filters.destiny) {
        apartments = response.filter((a) => a.idUbicacion == filters.destiny);
      }
    }
    if (maxResults) {
      apartments = apartments.slice(0, maxResults);
    }
    return apartments;
  }).catch(err => {
    log("fetchApartment Error />",err);
    return [];
  });
};

export default {
  fetchCities,
  fetchApartment,
  fetchComunaByCity
}
