<template>
  <div>
    <div v-if="result" class="characters__container">
      <div class="characters__row characters__headers">
        <div class="item item--first headers--title"><span>Photo</span></div>
        <div class="item headers--title"><span>Character&nbsp;ID</span></div>
        <div class="item headers--title"><span>Name</span></div>
        <div class="item headers--title"><span>Gender</span></div>
        <div class="item headers--title"><span>Species</span></div>
        <div class="item headers--title"><span>Last&nbsp;Episode</span></div>
        <div class="item headers--title">
          <span>Add&nbsp;To&nbsp;Favorites</span>
        </div>
      </div>
      <div
        class="characters__row"
        v-for="character in result.characters.results"
        :key="character.id"
      >
        <div class="item item--first character">
          <img :src="character.image" :alt="character.name" />
        </div>
        <div class="item character">
          <span>{{ character.id }}</span>
        </div>
        <div class="item character">
          <span>{{ character.name }}</span>
        </div>
        <div class="item character">
          <span>{{ character.gender }}</span>
        </div>
        <div class="item character">
          <span>{{ character.species }}</span>
        </div>
        <div class="item character">
          <span>{{
            character.episode[character.episode.length - 1].episode
          }}</span>
        </div>
        <div class="item"><button type="button">Add</button></div>
      </div>
    </div>
    <div v-else-if="loading">loading</div>
    <div v-else-if="error">{{ error.message }}</div>
    <Pagination v-if="result" :totalPages="result?.characters.info.pages" />
  </div>
</template>
<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { GET_CHARACTERS_BY_NAME } from "@/graphql/querys";
import { useRoute, useRouter } from "vue-router";
import Pagination from "@/components/Pagination.vue";

export default defineComponent({
  name: "Characters",
  props: {
    characterName: [String],
  },
  components: { Pagination },
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
<style lang="scss" scoped>
.characters {
  overflow: scroll;

  &__row {
    display: flex;
    justify-content: space-evenly;
    height: 81px;

    .item {
      width: 14.28%;
      min-width: 120px;
      display: flex;
      align-items: center;

      &--first {
        justify-content: center;
      }

      img {
        width: 43px;
        height: 68px;
        object-fit: cover;
      }
    }
  }
}
</style>
