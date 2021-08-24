<template>
  <div class="home">
    <input type="text" v-model="userInput" @keyup.enter="updateCharacter" />
    <GetCharacters
      :characterName="character"
      :pageNumber="pageNumber"
    ></GetCharacters>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import GetCharacters from "@/components/getCharacters.vue";
// import { useQuery, useLazyQuery, useResult } from "@vue/apollo-composable";
// import gql from "graphql-tag";

export default defineComponent({
  name: "Home",
  components: { GetCharacters },
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
