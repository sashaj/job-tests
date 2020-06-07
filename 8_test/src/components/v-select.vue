<template>
  <div class="select" @click="TOGGLE_OPTIONS_VISIBILITY()">
    <p class="select__title" >{{SELECTED_OPTION}}</p>
    <div class="options" v-if="ARE_OPTIONS_VISIBLE">
      <p
        v-for="option in SELECT_OPTIONS"
        :key="option.value"
        @click="SORT_BY_CATEGORIES(option)"
      >{{option.name}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "v-select",
  computed: {
    ...mapGetters(["SELECT_OPTIONS", "SELECTED_OPTION", "ARE_OPTIONS_VISIBLE"])
  },
  methods: {
    ...mapActions([
      "GET_CONTACTS_FROM_API",
      "TOGGLE_OPTIONS_VISIBILITY",
      "SORT_BY_CATEGORIES"
    ])
  },

  mounted() {
    document.addEventListener("click", this.TURNOFF_SELECT_VISIBILITY, true);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.TURNOFF_SELECT_VISIBILITY);
  }
};
</script>

<style>
.select {
  position: relative;
  width: 200px;
  cursor: pointer;
  margin-left: auto;
}
.select__title {
  border: solid 1px gray;
  padding: 8px;
}

.options {
  border: solid 1px gray;
  position: absolute;
  top: 40px;
  right: 0;
  width: 100%;
  z-index: 2;
  background: white;
  border-top: none; 
}
.select__title {
  margin-bottom: 80px;
}
.options p:hover {
  background: #e5e5e5;
  z-index: 3;
  position: relative;
}


</style>