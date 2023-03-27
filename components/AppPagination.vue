<template>
  <paginate
    :page-count="Math.ceil(getFilteredHotels.length / 3)"
    :click-handler="functionName"
    :prev-text="'Назад'"
    :next-text="'Следующая'"
    :container-class="'pagination'"
    :page-class="'page'"
  />
</template>

<script scoped>
import { mapGetters } from 'vuex'
export default {
  name: 'AppFooter',
  computed: mapGetters('data', ['getFilteredHotels']),
  methods: {
    functionName (pageNum) {
      this.$store.commit('data/setCurrentNumPage', { num: pageNum })
    }
  }
}
</script>

<style lang="scss">
.pagination{
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 35px;
  padding: 0;
  margin: 47px auto 0 auto;
  list-style-type: none;
  .disabled, .disabled>a{
    color: #DBDBDB;
    cursor: not-allowed;
  }
  &>li{
    background-size: 5px 9px;
    background-repeat: no-repeat;
  }
  &>li:first-child{
    background-image: url('../assets/images/prev.svg');
    background-position: center left;
    width: 60px;
    padding-left: 15px;
  }
  &>li:first-child.disabled{
    background-image: url('../assets/images/prev-dis.svg');
  }
  &>li:last-child.disabled{
    background-image: url('../assets/images/next-dis.svg');
  }
  &>li:last-child{
    background-image: url('../assets/images/next.svg');
    background-position: center right;
    width: 106px;
  }
}
.page{
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #3A3A3A;
  &.active{
    color: #6A53F5;
  }
}
</style>
