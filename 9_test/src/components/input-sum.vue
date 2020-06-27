<template>
  <div class="input-sum">
    <span class='input-sum__currency'>{{ currency }}</span>
     <input 
        type="number" 
        placeholder='Enter sum' 
        class=""
        v-model="inputSumInEuro"
        @keyup='inputSumChange($event.target.value)'
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
  },  
  data() {
    return {
        inputSumInEuro: ''
    };
  },
  methods: {
      inputSumChange(value){
        this.$emit("inputSumChange", parseInt(value));
      }
  },
  computed: {

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
