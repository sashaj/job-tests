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
  </div>
</template>

<script>
import InputSum from "../components/input-sum";
import PaymentCard from "../components/payment-card";

export default {
  name: "payment-page",
  props: {
    msg: String,
  },
   components: {
    InputSum,
    PaymentCard
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
      this.sum = sum;
    }
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
</style>
