<template>
  <div class="contact">
    <h1>Contacts</h1>
    <vSelect></vSelect>
    <div class="contact__list">
      <vcontactItem
        v-for="contact in SORTED_CONTACTS"
        :key="contact.article"
        :contact_data="contact"
      />
      <p v-if="!SORTED_CONTACTS.length">Nothing found with selected search terms</p>
    </div>
  </div>
</template>

<script>
import vcontactItem from "../components/contact-item";
import vSelect from "../components/v-select";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "contactPage",
  components: {
    vcontactItem,
    vSelect
  },
  computed: {
    ...mapGetters([
      "CONTACTS",
      "SELECTED_OPTION",
      "SORTED_CONTACTS",
      "SEARCH_VALUE"
    ]),
    filteredProducts() {
      if (this.SORTED_CONTACTS.length) {
        return this.SORTED_CONTACTS;
      } else {
        return [];
      }
    }
  },
  methods: {
    ...mapActions([
      "GET_CONTACTS_FROM_API",
      "SORT_BY_CATEGORIES",
      "SEARCH_CONTACTS",
    ])
  },

  mounted() {
    this.GET_CONTACTS_FROM_API().then(() => {
      this.SORT_BY_CATEGORIES();
    });
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.contact {
  width: 100%;
  &__list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
}

.contact__link-to-cart {
  position: absolute;
  top: 102px;
  right: 10px;
  padding: $padding * 2;
  border: solid 1px gray;
}
</style>
