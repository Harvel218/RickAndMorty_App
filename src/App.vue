<template>
  <div class="page">
    <header class="page__header container">
      <Logo />
      <label class="page__header--search"
        ><span>Search by Name</span
        ><input type="text" v-model="userInput" @keyup.enter="updateCharacter"
      /></label>
    </header>
    <nav class="page__nav container">
      <router-link to="/">All Characters</router-link>
      <router-link to="/favorites">Favorites</router-link>
    </nav>
    <router-view :userInput="character" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Characters from "@/components/Characters.vue";
import Logo from "@/components/Logo.vue";

export default defineComponent({
  name: "Home",
  components: { Characters, Logo },
  setup() {
    const character = ref<string>("");
    const userInput = ref<string>("");
    const pageNumber = ref<number>(1);

    const updateCharacter = () => {
      character.value = userInput.value;
    };

    return { character, userInput, updateCharacter, pageNumber };
  },
});
</script>
<style lang="scss">
@import "./assets/main.scss";
</style>
