<template>
  <div v-if="result">
    <span v-for="character in result.characters.results" :key="character.id">{{
      character.name
    }}</span>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useQuery, useLazyQuery, useResult } from "@vue/apollo-composable";
import { GET_CHARACTERS } from "@/graphql/querys";

export default defineComponent({
  props: {
    characterName: [String],
    pageNumber: [Number],
  },

  setup(props) {
    const pageNumber = ref<number>(1);

    const variables = ref({
      page: pageNumber.value,
      name: "rick",
    });

    const { result, error, loading } = useQuery(GET_CHARACTERS, variables);

    watch(props, (value) => {
      console.log(value.characterName);
      variables.value.page = value.pageNumber!
      variables.value.name = value.characterName!
    });

    return { result };
  },
});
</script>
<style lang="sass" scoped>
</style>
