<template>
  <aside class="aside">
    <div class="aside__title">
      Страна
    </div>
    <div class="country">
      <div class="country__icon country__icon_search">
        <input
          v-model="search"
          class="country__input"
          type="text"
          placeholder="Поиск стран"
        >
        <div
          class="country__clear"
          :class="{'show' : search}"
          @click="search = ''"
        />
      </div>
    </div>
    <div
      class="countries"
    >
      <div
        v-if="filteredCountries.length == 0"
        class="not-found"
      >
        К сожалению, по вашему запросу ничего не найдено :(
      </div>
      <div
        v-for="(country, i) in filteredCountries"
        :key="i"
        class="checkbox"
      >
        <input
          :id="country"
          v-model="countries"
          class="custom-checkbox"
          type="checkbox"
          :name="country"
          :value="country"
        >
        <label :for="country">{{ country }}</label>
      </div>
    </div>
    <div class="aside__title">
      Тип
    </div>
    <div class="HType">
      <div class="checkbox">
        <input
          id="apartments"
          v-model="type"
          class="custom-checkbox"
          type="checkbox"
          name="apartments"
          value="Апартаменты"
        >
        <label for="apartments">Апартаменты</label>
      </div>
      <div class="checkbox">
        <input
          id="hotel"
          v-model="type"
          class="custom-checkbox"
          type="checkbox"
          name="hotel"
          value="Отель"
        >
        <label for="hotel">Отель</label>
      </div>
    </div>
    <div class="aside__title">
      Количество звезд
    </div>
    <div class="SCounter">
      <div
        v-for="i in 5"
        :key="i"
        class="checkbox"
      >
        <input
          :id="'star-'+i"
          v-model="stars"
          class="custom-checkbox"
          type="checkbox"
          :name="'star-'+i"
          :value="i"
        >
        <label :for="'star-'+i">{{ i }} звезд{{ i == 1 ? 'a' : i == 5 ? '' : 'ы' }}</label>
      </div>
    </div>
    <div class="aside__title">
      Количество отзывов (от)
    </div>
    <div class="reviews">
      <input
        v-model="reviews"
        class="reviews__input"
        type="number"
        placeholder="Например, от 10"
      >
    </div>
    <div class="aside__title">
      Цена
    </div>
    <div class="aside__prices">
      <div class="aside__price">
        <input
          v-model="minPrice"
          class="price__input"
          type="number"
          placeholder="от 0 ₽"
          @input="setInput"
        >
      </div>
      <div class="aside__price">
        <input
          v-model="maxPrice"
          class="price__input"
          type="number"
          placeholder="до 100 500 ₽"
          @input="setInput"
        >
      </div>
    </div>
    <vue-slider
      ref="slider"
      v-model="price"
      :dot-size="22"
      :max="100500"
      :order="false"
      @change="slideChange"
    />
    <button
      class="aside__btn apply"
      @click="$store.commit('data/setFilter', { countries, type, stars, reviews, price })"
    >
      Применить фильтр
    </button>
    <button
      class="aside__btn clear"
      @click="reset"
    >
      <img src="../assets/images/clear.svg" alt="clear">
      Очистить фильтр
    </button>
  </aside>
</template>

<script scoped>
import { mapGetters } from 'vuex'
import clearBtnMixin from './mixins/clearBtnMixin'
import '~/assets/css/antd.css'
export default {
  name: 'AppAside',
  mixins: [clearBtnMixin],
  data () {
    return {
      search: '',
      countries: [],
      type: [],
      stars: [],
      reviews: null,
      price: [0, 100500],
      minPrice: null,
      maxPrice: null
    }
  },
  computed: {
    ...mapGetters('data', ['getHotels', 'getCountries', 'getAll']),
    filteredCountries () {
      const filtered = this.getCountries.filter((item) => {
        return item.includes(this.search)
      })
      return filtered
    }
  },
  methods: {
    setInput () {
      if (this.minPrice && this.maxPrice) {
        this.$refs.slider.setValue([this.minPrice, this.maxPrice])
      } else if (this.minPrice) {
        this.$refs.slider.setValue([this.minPrice, this.price[1]])
      } else if (this.maxPrice) {
        this.$refs.slider.setValue([this.price[0], this.maxPrice])
      } else {
        this.$refs.slider.setValue([0, 100500])
      }
    },
    slideChange () {
      this.minPrice = this.price[0]
      this.maxPrice = this.price[1]
    },
    reset () {
      this.$store.commit('data/setFilter', { countries: [], type: [], stars: [], reviews: null, price: [0, 100500] })
      this.search = ''
      this.countries = []
      this.type = []
      this.stars = []
      this.reviews = null
      this.price = [0, 100500]
      this.minPrice = null
      this.maxPrice = null
    }
  }
}
</script>

<style lang="scss" scoped>
.aside{
  width: 325px;
  flex-shrink: 0;
}
.aside__title{
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  color: #3A3A3A;
}
.country{
  margin-top: 14px;
  .country__label {
    display: block;
    margin-bottom: 14px;
  }
  .country__input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 14px 0 15px 0;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #3A3A3A;
    border: 1px solid #EAEAEA;
    border-radius: 10px;
  }
  .country__input::placeholder {
    color: #868686;
  }
  .country__input:focus {
    color: #3A3A3A;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
  }
  .country__input:disabled,
  .country__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
  }
  .country__icon {
    position: relative;
  }
  .country__icon::before {
    content: '';
    color: #bdbdbd;
    position: absolute;
    display: flex;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
  .country__clear {
    content: '';
    position: absolute;
    display: none;
    align-items: center;
    bottom: 0;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    width: 13px;
    background-image: url("../assets/images/clear-input.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
    &.show {
      display: flex;
    }
  }
  .country__icon input {
    padding: 0 30px 0 46px;
  }
  .country__icon_search::before {
    width: 16px;
    background-image: url("../assets/images/search-ico.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
}
/* для элемента input c type="checkbox" */
.custom-checkbox {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  /* для элемента label, связанного с .custom-checkbox */
  .custom-checkbox+label {
    display: inline-flex;
    align-items: center;
    user-select: none;
  }
  /* создание в label псевдоэлемента before со следующими стилями */
  .custom-checkbox+label::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    flex-grow: 0;
    border: 1px solid #CDCDCD;
    border-radius: 4px;
    margin-right: 10px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 50% 50%;
  }
  /* стили при наведении курсора на checkbox */
  .custom-checkbox:not(:disabled):not(:checked)+label:hover::before {
    border-color: #00BB6D;
  }
  /* стили для активного чекбокса (при нажатии на него) */
  .custom-checkbox:not(:disabled):active+label::before {
    background-color: #CDCDCD;
    border-color: #CDCDCD;
  }
  /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
  .custom-checkbox:focus:not(:checked)+label::before {
    border-color: #3ff2a7;
  }
  /* стили для чекбокса, находящегося в состоянии checked */
  .custom-checkbox:checked+label::before {
    border-color: #00BB6D;
    background-color: #00BB6D;
    background-image: url("../assets/images/check.svg");
  }
  /* стили для чекбокса, находящегося в состоянии disabled */
  .custom-checkbox:disabled+label::before {
    background-color: red;
  }
  .checkbox {
    margin-bottom: 15px;
  }
.countries{
  margin: 10px 0 25px 0;
  padding: 24px 20px 0 20px;
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  height: 202px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  .not-found{
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    color: #868686;
    max-width: 228px;
    margin: 0 auto;
    position: relative;
    top: 25%;
  }
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
    appearance: none;
    -moz-appearance: textfield;
}
.HType{
  margin: 13px 0 26px 0;
  padding: 25px 20px;
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  .checkbox{
    margin-bottom: 0;
    position: relative;
  }
  .checkbox:first-child:after{
    content: '';
    margin: 17px 0;
    display: block;
    width: 284px;
    height: 1px;
    background: #EAEAEA;
  }
}
.SCounter{
  margin: 13px 0 26px 0;
  padding: 26px 20px;
  border: 1px solid #EAEAEA;
  border-radius: 10px;
  .checkbox:last-child{
    margin-bottom: 0;
  }
}
.reviews{
  margin: 15px 0 25px 0;
  .reviews__input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 14px 0 15px 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #3A3A3A;
    border: 1px solid #EAEAEA;
    border-radius: 10px;
  }
  .reviews__input::placeholder {
    color: #868686;
  }
  .reviews__input:focus {
    color: #3A3A3A;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
  }
  .reviews__input:disabled,
  .reviews__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
  }
}
.aside__prices{
  display: flex;
  column-gap: 30px;
  margin: 15px 0 20px 0;
  position: relative;
  .aside__price:last-child::before{
    content: '';
    width: 10px;
    height: 1px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #C4C4C4;
  }
  .price__input {
    display: block;
    width: 100%;
    height: 50px;
    padding: 14px 0 15px 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 21px;
    color: #3A3A3A;
    border: 1px solid #EAEAEA;
    border-radius: 10px;
  }
  .price__input::placeholder {
    color: #868686;
  }
  .price__input:focus {
    color: #3A3A3A;
    background-color: #fff;
    border-color: #bdbdbd;
    outline: 0;
  }
  .price__input:disabled,
  .price__input[readonly] {
    background-color: #f5f5f5;
    opacity: 1;
  }
}
.aside__btn{
  border-radius: 15px;
  padding: 18px 0;
  width: 100%;
  border: 0;
  font-weight: 700;
  font-size: 16px;
  line-height: 21px;
  cursor: pointer;
  &.apply{
    margin-top: 40px;
    background-color: #6A53F5;
    color: #FFFFFF;
  }
  &.clear{
    margin-top: 15px;
    border: 1px solid #EAEAEA;
    color: #3A3A3A;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      margin-right: 10px;
      width: 10px;
      height: 10px;
    }
  }
}

</style>
