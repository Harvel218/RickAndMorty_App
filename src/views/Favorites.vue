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
          <span>Add&nbsp;To Favorites</span>
        </div>
      </div>

      <Character
        v-for="character in result.charactersByIds"
        :key="character.id"
        :charImage="character.image"
        :charId="character.id"
        :charName="character.name"
        :charGender="character.gender"
        :charSpecies="character.species"
        :charEpisode="character.episode"
        :favPage="true"
      />
    </div>
    <Loading v-else-if="loading" />

    <div v-else-if="error" class="error">
      <span>{{ error.message }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_IDS } from "@/graphql/querys";
import Character from "@/components/Character.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "Home",
  components: { Character, Loading },
  props: {},
  setup() {
    const variables = ref({
      ids: JSON.parse(localStorage.getItem("favouriteCharacters")!),
    });

    const { result, error, loading } = useQuery(
      GET_CHARACTERS_BY_IDS,
      variables
    );

    console.log(result);

    return { result, error, loading };
  },
});
</script>
