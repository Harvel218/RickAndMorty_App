<template>
  <div class="page">
    <header class="page__header container">
      <Logo />
      <label class="page__header--search"
        ><span v-if="route.name === 'Favorites'">Filter by ID</span
        ><span v-else>Search by Name</span
        ><input type="text" v-model="userInput" /><i
          ><svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1527 19.0943H20.0686L19.6844 18.7238C21.0292 17.1595 21.8388 15.1286 21.8388 12.9194C21.8388 7.99314 17.8456 4 12.9194 4C7.99314 4 4 7.99314 4 12.9194C4 17.8456 7.99314 21.8388 12.9194 21.8388C15.1286 21.8388 17.1595 21.0292 18.7238 19.6844L19.0943 20.0686V21.1527L25.9554 28L28 25.9554L21.1527 19.0943ZM12.9194 19.0943C9.50257 19.0943 6.74443 16.3362 6.74443 12.9194C6.74443 9.50257 9.50257 6.74443 12.9194 6.74443C16.3362 6.74443 19.0943 9.50257 19.0943 12.9194C19.0943 16.3362 16.3362 19.0943 12.9194 19.0943Z"
              fill="#11B0C8"
            />
          </svg> </i
      ></label>
    </header>
    <nav class="page__nav container">
      <router-link to="/">All Characters</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>
    <router-view :userInput="userInput" />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import Characters from "@/components/Characters.vue";
import Logo from "@/components/Logo.vue";
import useDebouncedRef from "./composables/useDebounceRef";

export default defineComponent({
  name: "Home",
  components: { Characters, Logo },
  setup() {
    const userInput = useDebouncedRef("", 500, false);
    const route = useRoute();

    return { userInput, route };
  },
});
</script>
<style lang="scss">
@import "./assets/main.scss";
</style>
