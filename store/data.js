import allHotels from '../assets/hotels.json'
export const state = () => ({
  hotels: allHotels,
  countries: [],
  type: [],
  stars: [],
  reviews: null,
  price: [],
  currentPageNum: 1,
  bookedHotels: []
})

export const getters = {
  getCountries (state) {
    const newArr = []
    const arr = state.hotels.hotels
    arr.forEach(function (item, i, arr) {
      newArr.push(item.country)
    })
    return newArr.filter((value, index, array) => array.indexOf(value) === index)
  },
  getHotels (state) {
    return state.hotels.hotels
  },
  getCurrentPageNum (state) {
    return state.currentPageNum
  },
  getFilteredHotels (state) {
    const newArr = state.hotels.hotels.slice() // копируем массив
    // фильтрация по количеству отзывов
    let f1 = newArr.filter((value, index, array) => value.reviews_amount >= state.reviews)
    // фильтрация по цене
    let f2 = f1.filter((value, index, array) => {
      if (state.price.length === 0) {
        return f1
      }
      return value.min_price >= state.price[0] && value.min_price <= state.price[1]
    })
    // фильтрация по количеству звезд
    let f3 = []
    if (state.stars.length === 0) {
      f3 = f2
    } else {
      state.stars.forEach((item) => {
        f3 = f3.concat(f2.filter((value, index, array) => {
          return value.stars === item
        }))
      })
      if (f3.length === 0) {
        f1 = []
        f2 = []
        f3 = []
      }
    }
    // фильтрация по типу
    let f4 = []
    if (state.type.length === 0) {
      f4 = f3
    } else {
      state.type.forEach((item) => {
        f4 = f4.concat(f3.filter((value, index, array) => {
          return value.type === item
        }))
      })
      if (f4.length === 0) {
        f1 = []
        f2 = []
        f3 = []
        f4 = []
      }
    }
    // фильтрация по стране
    let f5 = []
    if (state.countries.length === 0) {
      f5 = f4
    } else {
      state.countries.forEach((item) => {
        f5 = f5.concat(f4.filter((value, index, array) => value.country === item))
      })
      if (f5.length === 0) {
        f1 = []
        f2 = []
        f3 = []
        f4 = []
        f5 = []
      }
    }

    if (f5.length !== 0) {
      return f5.filter((value, index, array) => array.indexOf(value) === index)
    }
    if (f4.length !== 0) {
      return f4.filter((value, index, array) => array.indexOf(value) === index)
    }
    if (f3.length !== 0) {
      return f3.filter((value, index, array) => array.indexOf(value) === index)
    }
    if (f2.length !== 0) {
      return f2.filter((value, index, array) => array.indexOf(value) === index)
    }

    return f1.filter((value, index, array) => array.indexOf(value) === index)
  },
  getBookedHotels (state) {
    return state.bookedHotels
  }
}
export const mutations = {
  setHotels (state, payload) {
    state.hotels = payload.value
  },
  setFilter (state, payload) {
    state.countries = payload.countries
    state.type = payload.type
    state.stars = payload.stars
    state.reviews = payload.reviews
    state.price = payload.price
  },
  setCurrentNumPage (state, payload) {
    state.currentPageNum = payload.num
  },
  setBooking (state, payload) {
    state.bookedHotels.push(payload.num)
  }
}
