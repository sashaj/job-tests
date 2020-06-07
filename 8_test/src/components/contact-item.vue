<template>
  <div class="contact-item">
    <popup v-if="isPopupVisible" @closePopup="closeInfoPopup" modalTitle="Info">
      <img class="contact-item__image" :src="require('../assets/images/' + contact_data.image)" />
      <div class="popup__info">
        <p class="contact-item__name">{{ contact_data.name }}</p>
        <p class="contact-item__price">Mobile: {{ contact_data.mobile }}</p>
        <p class="contact-item__price">Category: {{ contact_data.category }}</p>
      </div>
    </popup>
    <img class="contact-item__image" :src="require('../assets/images/' + contact_data.image)" />
    <p class="contact-item__name">{{ contact_data.name }}</p>
    <p class="contact-item__price">Mobile: {{ contact_data.mobile }}</p>
    <button class="contact-item__show_info" @click="showPopupInfo">show info</button>
  </div>
</template>

<script>
import popup from "./popup";
export default {
  name: "contact-item",
  components: {
    popup
  },

  props: {
    contact_data: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  methods: {
    closeInfoPopup() {
      this.isPopupVisible = false;
    },
    showPopupInfo() {
      this.isPopupVisible = true;
    }
  },
  data() {
    return {
      isPopupVisible: false
    };
  }
};
</script>

<style lang="scss">
.contact-item {
 
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 0 8px 0 #e9e9e9;
  padding: $padding * 2;
  justify-content: space-between;
  margin-bottom: $margin*5;
  .contact-item__image {
    width: 100px;
    border-radius: 50%;
  }
}

.contact-item__show_info{
  padding: 10px;
  background: white;
  border: 1px solid black;
  cursor: pointer;
}

</style>
