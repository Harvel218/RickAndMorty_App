<template>
  <div class="home">
    <Characters :characterName="userInput"></Characters>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import Characters from "@/components/Characters.vue";
// import { useQuery, useLazyQuery, useResult } from "@vue/apollo-composable";
// import gql from "graphql-tag";

export default defineComponent({
  name: "Home",
  components: { Characters },
  props: {
    userInput: [String],
  },
  // setup() {
  //   const character = ref<string>("");
  //   const userInput = ref<string>("");
  //   const pageNumber = ref<number>(1);

  //   const updateCharacter = () => {
  //     character.value = userInput.value;
  //   };

  //   return { character, userInput, updateCharacter, pageNumber };
  // },
});
</script>
