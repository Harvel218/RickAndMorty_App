<template>
  <div id="nav">
    <input type="text" v-model="userInput" @keyup.enter="updateCharacter" />
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view :userInput="character" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Characters from "@/components/Characters.vue";
// import { useQuery, useLazyQuery, useResult } from "@vue/apollo-composable";
// import gql from "graphql-tag";

export default defineComponent({
  name: "Home",
  components: { Characters },
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
