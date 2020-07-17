<template>
  <div class="card__wrapper">
    <div class="card__front">
      <div class="card-front__header">
        <div class="card-front-header__left">
          <span class="card-front-header__paying">Paying:</span>
          <span class="card-front-header__sum">{{ currency }} {{ sum }}</span>
        </div>
        <div class="card-front-header__right">
          <img :src="require('../assets/images/svg/mastercard.svg')" class="mastercard" />
          <img :src="require('../assets/images/svg/visa.svg')" class="visa" />
        </div>
      </div>
      <div class="card-front__body">
        <div class="card__input-wrapper">
          <label for="card-number">Card number</label>
          <input
            type="text"
            class="card__input"
            id="card-number"
            placeholder="0000 - 0000 - 0000 - 0000"
            v-model="cardNumber"
            @keydown="cardNumberVerification"
            maxlength="23"
            v-numeric-only
            name='card__number'
            :class="{ error: form.card__number }"
          />
        </div>
      </div>
      <div class="card-front__footer">
        <div class="card-front__footer-left">
          <div class="card__input-wrapper">
            <label for="card-holder">Card holder</label>
            <input 
              type="text" 
              class="card__input" 
              name="card__holder" 
              placeholder="Michael Nagarov" 
              :class="{ error: form.card__holder }"
              oninput = "value=value.toUpperCase()"
              v-model="cardHolder"
              />
          </div>
        </div>
        <div class="card-front__footer-right">
          <span class="card-front__label">Expiration date</span>
          <div class="card__input-wrapper">
            <input
              type="text"
              class="card__input card__input-small"
              name="card__exp_month"
              placeholder="01"
              v-numeric-only
              maxlength="2"
              :class="{ error: form.card__exp_month }"
              v-model="cardExpMonth"
              
            />
            <span class="separator">/</span>
            <input
              type="text"
              class="card__input card__input-small"
              name="card__exp_year"
              placeholder="24"
              maxlength="2"
              v-numeric-only
              :class="{ error: form.card__exp_year }"
              v-model="cardExpYear"

            />
          </div>
        </div>
      </div>
    </div>
    <div class="card__back">
      <div class="card-back_cvc-wrapper">
        <div class="card__input-wrapper">
          <label for="card-cvc">CVC/CVV</label>
          <input 
            type="password" 
            class="card__input card__input-medium" 
            id="cvc" placeholder="•••" 
            v-numeric-only maxlength='4' 
            name="card__cvc"
            :class="{ error: form.card__cvc }"
            />
        </div>
        <span class="card__input-desc">Last 3 or 4 digits</span>
      </div>
    </div>
    <div class="card__svg-credentials">
      <img :src="require('../assets/images/svg/stripe.svg')" class="visa" />
      <img :src="require('../assets/images/svg/visa-verified.svg')" class="visa" />
      <img :src="require('../assets/images/svg/mastercard-securecode.svg')" class="visa" />
    </div>
  </div>
</template>

<script>
export default {
  name: "payment-card",
  props: {
    currency: {
      type: String,
      default: ""
    },
    sum: {
      type: Number,
      default: 0
    },
    form: {
      type: Object,
      default: function() {
        return {};
      }
    },
    userData: {
      type: Object,
      default: function() {
        return {
          cardNumber: "",
          cardHolder: '',
          cardExpMonth: '',
          cardExpYear: '',          
        };
      }
    },  
  },

  data() {
    return {
      cardNumber: "",
      cardHolder: '',
      cardExpMonth: '',
      cardExpYear: '',
    };
  },
  methods: {
    cardNumberVerification(e) {
         let index = this.cardNumber.lastIndexOf("-");
         let test = this.cardNumber.substr(index + 1);
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && e.ctrlKey === true) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && e.ctrlKey === true) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && e.ctrlKey === true) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return
      }
        if (test.length === 4 && this.cardNumber.length < 20) {
          this.cardNumber = this.cardNumber + "-";
      
        }           
    }
  },
  created(){
        if (this.userData.date){
        const dateObj = new Date(parseFloat(this.userData.date));
        let month = (dateObj.getMonth()+ 1).toString();
        let year = dateObj.getUTCFullYear().toString().substring(2);
        if (month < 10){
          month = '0' + month;
        }
        this.cardExpMonth = month;
        this.cardExpYear = year;       
        this.cardNumber = this.userData.number;
        this.cardHolder = this.userData.name.toUpperCase() + ' ' + this.userData.surname.toUpperCase();
        }

        
  }
};

//
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card__wrapper {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
}

.card__front {
  background: #333333;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  width: 500px;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.card-front__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 45px;
}

.card-front-header__paying,
.card-front-header__sum {
  color: #ffffff;
  display: inline-block;
}
.card-front-header__paying {
  margin-right: 10px;
}
.card-front-header__right {
  display: flex;
}
.card-front-header__left {
  display: flex;
  align-items: center;
}
.mastercard {
  margin-right: 10px;
}
.visa {
  margin-top: -5px;
}

.card__input-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.card__input-wrapper label {
  color: #fff;
  font-size: 14px;
  margin-bottom: 10px;
}

.card__input {
  width: 280px;
  height: 40px;
  padding: 10px;
  font-size: 16px;
  &-small {
    width: 50px;
    padding: 12px;
    text-align: center;
  }
  &-medium {
    width: 110px;
    margin-bottom: 10px;
  }
}

.card-front__body {
  margin-bottom: 20px;
}
.card-front__footer {
  display: flex;
  justify-content: space-between;
}
.card-front__footer-right {
  display: flex;
  flex-direction: column;
}
.card-front__footer-right .card__input-wrapper {
  flex-direction: row;
  align-items: center;
}
.card-front__label {
  color: #fff;
  font-size: 14px;
  margin-bottom: 10px;
}
.separator {
  width: 20px;
  color: #fff;
}
.card__back {
  width: 500px;
  height: 320px;
  background: #4f4f4f;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  overflow: auto;
  position: relative;
  padding: 50px 30px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 40px;
  margin-left: auto;
  margin-bottom: 40px;
  &:after {
    content: "";
    width: 100%;
    height: 90px;
    display: block;
    background: #828282;
    top: 60px;
    position: absolute;
    left: 0;
    right: 0;
  }
}
.card__input-desc {
  color: transparentize(#fff, 0.52);
}
.card__svg-credentials {
  margin-left: auto;

  padding-right: 30px;
}
.card__svg-credentials img {
  margin-left: 80px;
  &:first-child {
    margin-left: 0;
  }
}
</style>
