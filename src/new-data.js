const soil_ph = {
  b_lekka: {
    "<4.0": 3,
    "4.0-4.5": 2,
    "4.6-5.0": 1,
    "5.1-5.5": 0,
    "<5.5": 0,
  },
  lekka: {
    "<4.5": 3.5,
    "4.5-5.0": 2.5,
    "5.1-5.5": 1.5,
    "5.6-6.0": 0,
    "<6.0": 0,
  },
  srednia: {
    "<5.0": 4.5,
    "5.0-5.5": 3,
    "5.6-6.0": 1.7,
    "6.1-6.5": 1,
    "<6.5": 0,
  },
  ciezka: {
    "<5.5": 6,
    "5.5-6.0": 3,
    "6.1-6.5": 2,
    "6.6-7.0": 1,
    "<7.0": 0,
  },
  b_ciezka: {
    "<5.5": 6,
    "5.5-6.0": 3,
    "6.1-6.5": 2,
    "6.6-7.0": 1,
    "<7.0": 0,
  },
};
const soil_type = {
  b_lekka: {
    konieczne: 3,
    potrzebne: 2,
    wskazane: 1,
    ograniczone: 0,
    zbedne: 0,
  },
  lekka: {
    konieczne: 3.5,
    potrzebne: 2.5,
    wskazane: 1.5,
    ograniczone: 0,
    zbedne: 0,
  },
  srednia: {
    konieczne: 4.5,
    potrzebne: 3,
    wskazane: 1.7,
    ograniczone: 1,
    zbedne: 0,
  },
  ciezka: {
    konieczne: 6,
    potrzebne: 3,
    wskazane: 2,
    ograniczone: 1,
    zbedne: 0,
  },
  b_ciezka: {
    konieczne: 6,
    potrzebne: 3,
    wskazane: 2,
    ograniczone: 1,
    zbedne: 0,
  },
};
