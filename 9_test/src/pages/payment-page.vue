<template>
  <div class="payment-page">
    payment page 1
    <InputSum 
      :currency="currency.euro"
      @inputSumChange="changeSum">
    </InputSum>
    <PaymentCard 
      :currency="currency.euro"
      :sum="sum"
    >
    </PaymentCard>
    <InputCheckbox></InputCheckbox>
    <Banner>
      <div class="payment__banner">
        <div class="banner-left">
          <span class="banner__title">Итого к зачислению</span>
          <span class="banner__sum"> {{ currency.euro }} {{ sum}}</span>
          <span class="banner__desc"> Без комиссии</span>
        </div>
        <div class="banner-right">
          <button type='button' class="banner__button"> Оплатить</button>
        </div>
      </div>
     
    </Banner>
  </div>
</template>

<script>
import InputSum from "../components/input-sum";
import PaymentCard from "../components/payment-card";
import InputCheckbox from "../components/input-checkbox";
import Banner from "../components/banner";

export default {
  name: "payment-page",
  props: {
    msg: String,
  },
   components: {
    InputSum,
    PaymentCard,
    InputCheckbox,
    Banner
  },
  data() {
    return {
      currency: {
        euro: '€',
        usd: '$'
      },
      sum: 0,
    };
  },
  methods: {
    changeSum(sum){
      console.log(typeof sum)
      if (sum !== sum){
        this.sum = 0;
      } else {
        this.sum = sum;
      }
    },

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.payment-page{
  padding: 10px 70px 105px 70px;
  display: flex;
  flex-direction: column;
  max-width: 810px;
  margin: 0 auto;
  background: lightgray;
}
.payment__banner{
  display: flex;
  padding: 30px;
  justify-content: space-between;
  .banner__button{
    width: 295px;
    height: 50px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .banner-left{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .banner__title{
    font-size: 18px;
    color: #333333;
    margin-bottom: 10px;
  }

  .banner-right{
    display: flex;
    align-items: center;
  }
  .banner__sum{
    font-weight: bold;
    font-size: 30px;
    color: #4F4F4F;
    margin-bottom: 5px;
  }
  .banner__desc{
    color: transparentize($color: #333333, $amount: 0.36);
    font-size: 12px;
  }
}


</style>
