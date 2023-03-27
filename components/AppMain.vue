<template>
  <div class="main">
    <div v-if="getFilteredHotels.length > 0" class="main__cards">
      <div
        v-for="(hotel, idx) in displayedPosts"
        :key="'hotel'+idx"
        class="main__card"
      >
        <div class="main__more">
          <div class="main__title">
            {{ hotel.name }}
          </div>
          <div class="main__signs">
            <div class="main__stars">
              <div
                v-for="n in 5"
                :key="n"
                class="main__star"
                :class="{'on' : n <= hotel.stars}"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11.2513L11.3262 14L10.178 8.82L14 5.33467L8.96707 4.88533L7 0L5.03293 4.88533L0 5.33467L3.82204 8.82L2.67384 14L7 11.2513Z" fill="#D7D7D7" />
                </svg>
              </div>
            </div>
            <div class="main__type">
              {{ hotel.type }}
            </div>
            <div class="main__reviews-count">
              <div class="main__reviews-dot" />
              {{ hotel.reviews_amount }} отзывов
            </div>
            <div class="main__country">
              <div class="main__geo">
                <img src="../assets/images/map.svg" alt="map">
              </div>
              {{ hotel.country }}
            </div>
          </div>
          <div class="main__desc">
            {{ hotel.description }}
          </div>
        </div>
        <div class="main__about">
          <div class="main__price">
            {{ Math.ceil(hotel.min_price).toLocaleString("ru-RU") }} ₽
          </div>
          <div class="main__ps">
            Цена за 1 ночь
          </div>
          <div
            class="book"
            :class="getBookedHotels.includes(perPage * (getCurrentPageNum - 1) + idx) ? 'booked' : 'not-booked'"
            @click="bookingBtn (idx)"
          >
            <div class="book__img" />
            <div class="book__status">
              Забронирова{{ getBookedHotels.includes(perPage * (getCurrentPageNum - 1) + idx) ? 'но' : 'ть' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <AppPagination v-if="getFilteredHotels.length > 0" />
    <div v-else class="main__not-found">
      <div class="not-found__img">
        <img src="../assets/images/not-found.png" alt="not-found">
      </div>
      <div class="not-found__title">
        По данным параметрам ничего не найдено
      </div>
      <div class="not-found__desc">
        Попробуйте изменить параметры фильтрации или вернуться в общий каталог
      </div>
      <button
        class="not-found__btn"
        @click="reset"
      >
        Очистить фильтр
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppPagination from './AppPagination.vue'
export default {
  name: 'AppMain',
  components: { AppPagination },
  data () {
    return {
      perPage: 3 // максимальное количество карточек на странице
    }
  },
  computed: {
    ...mapGetters('data', ['getHotels', 'getCountries', 'getFilteredHotels', 'getCurrentPageNum', 'getBookedHotels']),
    displayedPosts () {
      const page = this.getCurrentPageNum
      const perPage = this.perPage
      const from = (page * perPage) - perPage
      const to = (page * perPage)
      return this.getFilteredHotels.slice(from, to)
    }
  },
  methods: {
    reset () {
      this.$store.commit('data/setFilter', { countries: [], type: [], stars: [], reviews: null, price: [0, 100500] })
    },
    bookingBtn (idx) {
      this.$store.commit('data/setBooking', { num: this.perPage * (this.getCurrentPageNum - 1) + idx })
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  .main__cards{
    display: flex;
    flex-wrap: wrap;
    row-gap: 15px;
  }
  .main__card{
    border: 1px solid #EAEAEA;
    border-radius: 15px;
    padding: 25px 25px 25px 40px;
    display: flex;
    justify-content: space-between;
    column-gap: 20px;
  }
  .main__title{
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;
    color: #3A3A3A;
    padding-bottom: 8px;
  }
  .main__signs{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-bottom: 18px;
    .main__stars{
      display: flex;
      column-gap: 6px;
      justify-items: flex-start;
      align-items: center;
      margin-right: 15px;
      .main__star{
        svg{
          width: 14px;
          height: 14px;
        }
        &.on{
          svg{
            path{
              fill: #FFA900;
            }
          }
        }
      }
    }
    .main__type{
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #868686;
    }
    .main__reviews-count{
      font-weight: 400;
      font-size: 14px;
      line-height: 18px;
      color: #868686;
      padding-left: 18px;
      position: relative;
      .main__reviews-dot{
        content: '';
        position: absolute;
        background: #949494;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        top: 50%;
        left: 6px;
        transform: translateY(-50%);
      }
    }
    .main__country{
      font-weight: 400;
      font-size: 14px;
      line-height: 21px;
      color: #3A3A3A;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      column-gap: 8px;
      margin-left: 15px;
      .main__geo>img{
        width: 8.5px;
        height: 13px;
      }
    }
  }
  .main__desc{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    max-width: 560px;
    color: #3A3A3A;
  }
  .main__about{
    flex-shrink: 0;
    .main__price{
      font-weight: 700;
      font-size: 25px;
      line-height: 32px;
      text-align: right;
      color: #3A3A3A;
    }
    .main__ps{
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      color: #868686;
      margin-bottom: 27px;
    }
    .book{
      border-radius: 12px;
      width: 179px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      column-gap: 10px;
      position: relative;
      &:hover{
        cursor: pointer;
      }
      .book__img{
        width: 15px;
        height: 15px;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
      }
      .book__status{
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
      }
      .book__status::before{
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: 0.1;
        border-radius: 12px;
      }
      &.booked{
        .book__img{
          background-image: url('../assets/images/ok-green.svg');
        }
        .book__status{
          color: #00BB6D;
        }
        .book__status::before{
          background-color: #00BB6D;
        }
      }
      &.not-booked{
        .book__img{
          background-image: url('../assets/images/visa.svg');
        }
        .book__status{
          color: #6A53F5;
        }
        .book__status::before{
          background-color: #6A53F5;
        }
      }
    }
  }
  .main__not-found{
    padding-top: 92px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .not-found__img{
      width: 238px;
      height: auto;
    }
    .not-found__title{
      margin-top: 34px;
      font-weight: 700;
      font-size: 18px;
      line-height: 23px;
      text-align: center;
      color: #3A3A3A;
    }
    .not-found__desc{
      margin: 8px 0 23px 0;
      font-weight: 400;
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      max-width: 323px;
      color: #969696;
    }
    .not-found__btn{
      border-radius: 15px;
      padding: 14px 61px 15px 60px;
      border: 0;
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
      cursor: pointer;
      color: #6A53F5;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #624DE3;
        opacity: 0.1;
        border-radius: 15px;
      }
    }
  }
}
</style>
