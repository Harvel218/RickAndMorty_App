<template>
  <div class="characters">
    <div v-if="result" class="characters__container">
      <div class="characters__row characters__headers container">
        <div class="item headers--title"><span>Photo</span></div>
        <div class="item headers--title"><span>Character&nbsp;ID</span></div>
        <div class="item headers--title"><span>Name</span></div>
        <div class="item headers--title"><span>Gender</span></div>
        <div class="item headers--title"><span>Species</span></div>
        <div class="item headers--title"><span>Last&nbsp;Episode</span></div>
        <div class="item headers--title">
          <span>Add&nbsp;To&nbsp;Favorites</span>
        </div>
      </div>

      <Character
        v-for="character in result.characters.results"
        :key="character.id"
        :charImage="character.image"
        :charId="character.id"
        :charName="character.name"
        :charGender="character.gender"
        :charSpecies="character.species"
        :charEpisode="character.episode"
        :favPage="false"
      />
    </div>

    <Loading v-else-if="loading" />

    <div v-else-if="error" class="error">
      <span>{{ error.message }}</span>
    </div>

    <Pagination v-if="result" :totalPages="result.characters.info.pages" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_NAME } from "@/graphql/querys";
import { useRoute, useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";
import Character from "@/components/Character.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "Characters",
  props: {
    characterName: [String],
  },
  components: { Pagination, Character, Loading },
  setup(props) {
    const route = useRoute();
    const router = useRouter();

    const variables = ref({
      page: Number(route.query.page) || 1,
      value: "",
    });

    const { result, error, loading } = useQuery(
      GET_CHARACTERS_BY_NAME,
      variables
    );

    watch(
      () => props.characterName,
      (value) => {
        router.push({ query: { page: "1" } });
        variables.value.value = value!;
      }
    );

    watch(
      () => route.query.page,
      (value) => {
        variables.value.page = Number(value);
      }
    );

    return { result, loading, error };
  },
});
</script>
<style lang="scss">
</style>
