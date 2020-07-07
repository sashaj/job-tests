<template>
  <div class="input-checkbox">
   <div class="form__input-checkbox">
   <label class="checkbox">Привяжите карту для быстрого пополнения баланса по SMS, USSD
и подключения автоплатежей.
     <input type="checkbox" name="user-terms" id="user-terms">
     <span class="checkbox__checkmark"></span>    
    </label>
   <!-- <div class="tippy">agree to the terms</div> -->
    </div>
  </div>
</template>

<script>
export default {
    name: "input-checkbox",
    props: {
    currency: {
      type: String,
      default: ""
    },
    sum: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {};
  },
  methods: {}

}
</script>

<style scoped lang='scss'>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 45px;
  cursor: pointer;
  user-select: none;
  font-size: 15px;
  font-family: "Arial";
  margin-right: 60px;
  color: #333333;
  text-align: left;

  @media (max-width: 1035px) {
    font-size: 14px;
  }

  @media (max-width: 600px) {
  }
}

.form__input-checkbox {
  position: relative;
}

.checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox__checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;

  border: 1px solid transparent;
  background-color: #000;
}

.checkbox input:checked ~ .checkbox__checkmark {

  border-color: #000;
}

.checkbox__checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox input:checked ~ .checkbox__checkmark:after {
  display: block;
}

.checkbox .checkbox__checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.input-checkbox{
  display: flex;
  margin-bottom: 40px;
}
</style>