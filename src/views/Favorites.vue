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

    <div v-else class="message">
      <span>No results</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_IDS } from "@/graphql/querys";
import Character from "@/components/Character.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  name: "Favorites",
  components: { Character, Loading },
  props: {
    userInput: [String],
  },
  setup(props) {
    const charactersIds = JSON.parse(
      localStorage.getItem("favouriteCharacters")!
    );

    const variables = ref({
      ids: charactersIds,
    });

    const { result, error, loading } = useQuery(
      GET_CHARACTERS_BY_IDS,
      variables
    );


    const idFilter = (value: any) => {
      if (charactersIds.includes(value.userInput)) {
        variables.value.ids = value.userInput;
      } else if (value.userInput === "") {
        variables.value.ids = JSON.parse(
          localStorage.getItem("favouriteCharacters")!
        );
      } else {
        variables.value.ids = 0;
      }
    };

    watch(props, (value) => {
      idFilter(value);
    });

    return { result, error, loading };
  },
});
</script>
