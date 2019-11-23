import DebugUtil from '../debug/debug';

const log = DebugUtil.log.bind(DebugUtil, 'Api Web Services Call />');

const wsPaths = {
  CITIES: 'https://api-turismo-duoc.herokuapp.com/api/ciudades',
  APARTMENTS: 'https://api-turismo-duoc.herokuapp.com/api/departamentos',
  COMUNA_BY_CITY: 'https://api-turismo-duoc.herokuapp.com/api/comunaByCiudad?ciudad=',
  SIGN_IN: 'https://api-turismo-duoc.herokuapp.com/api/login',
  SIGN_UP: 'https://api-turismo-duoc.herokuapp.com/api/usuario',
  APARTMENT: 'https://api-turismo-duoc.herokuapp.com/api/departamento?departamento=',
  CITY_SINGLE: 'https://api-turismo-duoc.herokuapp.com/api/ciudad?ciudad=',
  BOOK_PLACE: 'https://api-turismo-duoc.herokuapp.com/api/Reserva',
  RESERVAS: 'https://api-turismo-duoc.herokuapp.com/api/reservas'
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
  return await fetch(wsPaths.APARTMENTS)
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

const fetchReservasByUser = async (userId) => {
  return await fetch(wsPaths.RESERVAS)
  .then(response => response.json())
  .then(response => {
    log('fetchReservasByUser response', response);
    let reservas = response;
    if (userId) {
      reservas = response.filter((a) => a.cantidadDias == userId);
    }
    return reservas;
  }).catch(err => {
    log("fetchReservasByUser Error />",err);
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

const bookPlace = async (body) => {
  return await fetch(
      wsPaths.BOOK_PLACE,
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
      log('bookPlace', data);
      if(data && data.mensaje && data.mensaje.toLowerCase() == 'creado') {
        return 1;
      }
      return 1;

    }).catch((error) => {
      log('bookPlace', error);
      return 3;
    });
}

const fetchApartmentSingle = async (id = 1) => {
  const url = `${wsPaths.APARTMENT}${id}`;
  return await fetch(url)
  .then(response => response.json())
  .then(response => {
    log('fetchApartmentSingle response', response);
    if(response && response.length > 0) {
      return response[0];
    }
    return {};
  }).catch(err => {
    log("fetchApartmentSingle Error />",err);
    return {};
  });
};

const fetchCitySingle = async (id = 1) => {
  const url = `${wsPaths.CITY_SINGLE}${id}`;
  return await fetch(url)
  .then(response => response.json())
  .then(response => {
    log('fetchCitySingle response', response);
    if(response && response.length > 0) {
      return response[0];
    }
    return {};
  }).catch(err => {
    log("fetchCitySingle Error />",err);
    return {};
  });
};

export default {
  bookPlace,
  fetchCities,
  fetchApartment,
  fetchApartmentSingle,
  fetchCitySingle,
  fetchComunaByCity,
  fetchReservasByUser,
  signIn,
  signUp
}
