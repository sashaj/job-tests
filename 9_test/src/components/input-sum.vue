<template>
  <div class="input-sum">
    <span class='input-sum__currency'>{{ currency }}</span>
     <input 
        type="text" 
        placeholder='Enter a sum' 
        class=""
        @keyup='inputSumChange($event.target.value)'
        oninput = "value=value.replace(/[^\d]/g,'')"
        maxlength="8"
        name="input__sum"
        :class="{ error: form.input__sum }"
        >
  </div>
</template>

<script>
export default {
  name: "input-sum",
  props: {
    currency: {
       type: String,
       default: ''
    },
     form: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },  
  data() {
    return {
      
    };
  },
  methods: {
      inputSumChange(value){
        this.$emit("inputSumChange", parseInt(value));
      }
  },
  watch: {
    inputSumInEuro(value) {
      return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.input-sum {
    align-self: flex-start;
    position: relative;
    margin-bottom: 10px;
}
.input-sum__currency {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
}


.input-sum input {
    box-shadow: inset 0px -1px 0px #D0ECEA;
    border: 1px solid #000000;
    height: 40px;
    width: 280px;
    padding: 0 15px 0 25px;
    color: #000000;
    font-size: 16px;
}
</style>
