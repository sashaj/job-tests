<template>
  <div class="payment-page">
    <form class="payment__form" @submit.prevent="verifyForm">
      <InputSum :currency="currency.euro" @inputSumChange="changeSum" :form="form.errorClass"></InputSum>
      <PaymentCard :currency="currency.euro" :sum="sum" :form="form.errorClass"></PaymentCard>
      <InputCheckbox></InputCheckbox>
      <Popup v-show="isPopupVisible" @closePopup="closePopup">
        <p>success!</p>
      </Popup>
      <Banner>
        <div class="payment__banner">
          <div class="banner-left">
            <span class="banner__title">Итого к зачислению</span>
            <span class="banner__sum">{{ currency.euro }} {{ sum}}</span>
            <span class="banner__desc">Без комиссии</span>
          </div>
          <div class="banner-right">
            <button class="banner__button">Оплатить</button>
          </div>
        </div>
      </Banner>
    </form>
  </div>
</template>

<script>
import InputSum from "../components/input-sum";
import PaymentCard from "../components/payment-card";
import InputCheckbox from "../components/input-checkbox";
import Banner from "../components/banner";
import Popup from "../components/popup";

export default {
  name: "payment-page",
  props: {
    msg: String
  },
  components: {
    InputSum,
    PaymentCard,
    InputCheckbox,
    Banner,
    Popup
  },
  data() {
    return {
      currency: {
        euro: "€",
        usd: "$"
      },
      isPopupVisible: false,
      sum: 0,
      form: {
        errorClass: {
          input__sum: false,
          card__number: false,
          card__holder: false,
          card__exp_month: false,
          card__exp_year: false,
          card__cvc: false
        }
      }
    };
  },
  methods: {
    changeSum(sum) {
      if (sum !== sum) {
        this.sum = 0;
      } else {
        this.sum = sum;
      }
    },
    closePopup() {
      this.isPopupVisible = false;
    },
    showPopup() {
      this.isPopupVisible = true;
    },
 
    verifyForm(e) {
      const form = e.target;
      e.preventDefault;
      const formData = new FormData(form);
      formData.forEach((value, key) => {
        this.$set(this.form, `${key}`, value);
      });
      if (this.form.input__sum == 0) {
        this.form.errorClass.input__sum = true;

      } else {
        this.form.errorClass.input__sum = false;
      }
      if (this.form.card__number.length < 19) {
        this.form.errorClass.card__number = true;
      } else {
        this.form.errorClass.card__number = false;
      }
      if (
        /[а-яА-ЯЁё]/.test(this.form.card__holder) ||
        this.form.card__holder.length < 3
      ) {
        this.form.errorClass.card__holder = true;

      } else {
        this.form.errorClass.card__holder = false;
      }
      if (
        parseFloat(this.form.card__exp_month) > 12 ||
        this.form.card__exp_month.length < 1
      ) {
        this.form.errorClass.card__exp_month = true;
      } else {
        this.form.errorClass.card__exp_month = false;
      }
      if (
        parseFloat(this.form.card__exp_year) < 20 ||
        this.form.card__exp_year.length < 2
      ) {
        this.form.errorClass.card__exp_year = true;
      } else {
        this.form.errorClass.card__exp_year = false;
      }
      if (this.form.card__cvc.length < 3) {
        this.form.errorClass.card__cvc = true;
      } else {
        this.form.errorClass.card__cvc = false;
      }

      if (
        Object.keys(this.form.errorClass).every(k => !this.form.errorClass[k])
      ) {
        this.pseudoSendForm(form);
      }
    },
    pseudoSendForm(form) {
      console.log(form);
      setTimeout(() => {
        this.isPopupVisible = true;
      }, 1000);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#app input.error {
  border-color: red;
  box-shadow: inset 0px -1px 0px red;
}
.payment-page {
  padding: 10px 70px 105px 70px;

  max-width: 810px;
  margin: 0 auto;
  background: lightgray;
}
.payment__form {
  display: flex;
  flex-direction: column;
}
.payment__banner {
  display: flex;
  padding: 30px;
  justify-content: space-between;
  .banner__button {
    width: 295px;
    height: 50px;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .banner-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .banner__title {
    font-size: 18px;
    color: #333333;
    margin-bottom: 10px;
  }

  .banner-right {
    display: flex;
    align-items: center;
  }
  .banner__sum {
    font-weight: bold;
    font-size: 30px;
    color: #4f4f4f;
    margin-bottom: 5px;
  }
  .banner__desc {
    color: transparentize($color: #333333, $amount: 0.36);
    font-size: 12px;
  }
}
</style>
