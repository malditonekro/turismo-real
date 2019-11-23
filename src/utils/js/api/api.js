import DebugUtil from '../debug/debug';

const log = DebugUtil.log.bind(DebugUtil, 'Api Web Services Call />');

const wsPaths = {
  CITIES: 'https://api-turismo-duoc.herokuapp.com/api/ciudades',
  APARTMENT: 'https://api-turismo-duoc.herokuapp.com/api/departamentos',
  COMUNA_BY_CITY: 'https://api-turismo-duoc.herokuapp.com/api/comunaByCiudad?ciudad=',
  SIGN_IN: 'https://api-turismo-duoc.herokuapp.com/api/login',
  SIGN_UP: 'https://api-turismo-duoc.herokuapp.com/api/usuario'
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

const signIn = async (body) => {
  return await fetch(
      wsPaths.SIGN_IN,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }),
        body: JSON.stringify(body)
      }
    ).then(response => response.json()
    ).then(data => {
      log('signIn', data);
      if (data && data.length > 0) {
        if(data[0].usuario) {          
          sessionStorage.setItem('auth', JSON.stringify(data[0]));
          return 1; // Login successfull
        } else {
          return 2; // Error while login
        }
      } else {
        return 2; // Error while login
      }

    }).catch((error) => {
      log('signIn', error);
      return 3; // server error
    });
}

const signUp = async (body) => {
  return await fetch(
      wsPaths.SIGN_UP,
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        }),
        body: JSON.stringify(body)
      }
    ).then(response => response.json()
    ).then(data => {
      log('signUp', data);
      if(data && data.mensaje && data.mensaje.toLowerCase() == 'creado') {
        return 1;
      }

    }).catch((error) => {
      log('signUp', error);
      return 3;
    });
}

export default {
  fetchCities,
  fetchApartment,
  fetchComunaByCity,
  signIn,
  signUp
}
