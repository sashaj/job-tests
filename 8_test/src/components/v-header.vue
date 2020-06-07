<template>
  <div class="header">
      <router-link :to="{name: 'homePage'}">
        <img src="../assets/images/wutang.png" alt="">
      </router-link>
      <div class="search__wrapper">
        <input
         type="text" name="" 
         class='search-field'
         v-model='searchValue'
         placeholder="search by name"
         >
        <button class="seach_btn" >
            <i class="material-icons" @click='search(searchValue)'>search</i>
        </button>

      </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: 'v-header',
    data(){
        return {
            searchValue: ''
        }
    },
    methods: {
        ...mapActions([
            'SET_SEARCH_VALUE',
            'SORT_BY_CATEGORIES',
            'SEARCH_CONTACTS'
        ]),
        search(value){
            this.SET_SEARCH_VALUE(value);
            if(value){
                this.SEARCH_CONTACTS();   
            }
            if (this.$route.path !== '/contact_page') {
                this.$router.push('/contact_page');
            }
        }
    },
    computed: {
        // ...mapGetters([
        //     'SEARCH_VALUE'
        // ])
    }
}
</script>

<style lang='scss'>
*{
    box-sizing: border-box;
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: black;
    padding: 16px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
img {
    width: 80px;

}
.search-field{
    padding: 16px;
    height: 31px;
}
.search__wrapper{
    padding: 16px;
    color: black;
    margin-right: 50px;
    display: flex;
}
}
</style>