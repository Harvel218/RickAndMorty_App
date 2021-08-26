<template>
  <div class="characters__row container">
    <div class="item character">
      <img :src="charImage" :alt="charName" />
    </div>
    <div class="item character">
      <span>{{ charId }}</span>
    </div>
    <div class="item character">
      <span>{{ charName }}</span>
    </div>
    <div class="item character">
      <i v-if="male()"
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 11C11.43 11 13 12.57 13 14.5C13 16.43 11.43 18 9.5 18C7.57 18 6 16.43 6 14.5C6 12.57 7.57 11 9.5 11ZM9.5 9C6.46 9 4 11.46 4 14.5C4 17.54 6.46 20 9.5 20C12.54 20 15 17.54 15 14.5C15 13.34 14.64 12.27 14.03 11.38L18 7.42V10H20V4H14V6H16.58L12.61 9.97C11.73 9.36 10.66 9 9.5 9Z"
            fill="#A9B1BD"
          />
        </svg> </i
      ><i v-else-if="female()"
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 9.5C17.5 6.46 15.04 4 12 4C8.96 4 6.5 6.46 6.5 9.5C6.5 12.2 8.44 14.43 11 14.9V17H9V19H11V21H13V19H15V17H13V14.9C15.56 14.43 17.5 12.2 17.5 9.5ZM8.5 9.5C8.5 7.57 10.07 6 12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5Z"
            fill="#A9B1BD"
          />
        </svg> </i
      ><i v-else-if="genderless()"
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="#A9B1BD"
          />
        </svg> </i
      ><i v-else
        ><svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 13H5V11H19V13Z" fill="#A9B1BD" />
        </svg> </i
      ><span>{{ charGender }}</span>
    </div>
    <div class="item character">
      <span>{{ charSpecies }}</span>
    </div>
    <div class="item character">
      <span>{{ charEpisode[charEpisode.length - 1].episode }}</span>
    </div>
    <div class="item">
      <button
        type="button"
        class="remove"
        v-if="isFavourite && favPage"
        @click="removeFromStorage(charId), removeItem($event)"
      >
        <svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="43" height="43" rx="8" fill="#11B0C8" />
          <path
            d="M22 27.27L28.18 31L26.54 23.97L32 19.24L24.81 18.63L22 12L19.19 18.63L12 19.24L17.46 23.97L15.82 31L22 27.27Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        type="button"
        class="remove"
        v-else-if="isFavourite"
        @click="removeFromStorage(charId)"
      >
        <svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="43" height="43" rx="8" fill="#11B0C8" />
          <path
            d="M22 27.27L28.18 31L26.54 23.97L32 19.24L24.81 18.63L22 12L19.19 18.63L12 19.24L17.46 23.97L15.82 31L22 27.27Z"
            fill="white"
          />
        </svg>
      </button>
      <button
        type="button"
        class="add"
        v-else-if="!favPage"
        @click="saveToStorage(charId)"
      >
        <svg
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1"
            y="1"
            width="41"
            height="41"
            rx="7"
            stroke="#11B0C8"
            stroke-width="2"
          />
          <path
            d="M22 27.27L28.18 31L26.54 23.97L32 19.24L24.81 18.63L22 12L19.19 18.63L12 19.24L17.46 23.97L15.82 31L22 27.27Z"
            fill="#11B0C8"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  props: {
    charImage: String,
    charId: [Number, String],
    charName: String,
    charGender: String,
    charSpecies: String,
    charEpisode: Array,
    favPage: Boolean,
  },
  setup(props) {
    const alreadySaved = ref<boolean>(false);
    const isFavourite = ref<boolean>(false);

    const checkIfInStore = () => {
      if (!localStorage.getItem("favouriteCharacters")) {
        localStorage.setItem("favouriteCharacters", JSON.stringify([]));
      }

      JSON.parse(localStorage.getItem("favouriteCharacters")!).forEach(
        (item: number) => {
          if (item === props.charId) {
            alreadySaved.value = true;
            isFavourite.value = true;
          }
        }
      );
    };

    const male = () => {
      return props.charGender === "Male";
    };

    const female = () => {
      return props.charGender === "Female";
    };

    const genderless = () => {
      return props.charGender === "Genderless";
    };

    const removeItem = (event: any) => {
      event.target.closest(".characters__row").remove();
    };

    const saveToStorage = (charId: number) => {
      const favCharacters = JSON.parse(
        localStorage.getItem("favouriteCharacters")!
      );

      checkIfInStore();

      if (!alreadySaved.value) {
        favCharacters.push(charId);
      }

      localStorage.setItem(
        "favouriteCharacters",
        JSON.stringify(favCharacters)
      );

      isFavourite.value = true;
    };

    const removeFromStorage = (charId: number) => {
      const favCharacters = JSON.parse(
        localStorage.getItem("favouriteCharacters")!
      );

      favCharacters.forEach((item: number, index: number) => {
        if (item === charId) {
          favCharacters.splice(index, 1);
        }
      });

      localStorage.setItem(
        "favouriteCharacters",
        JSON.stringify(favCharacters)
      );

      isFavourite.value = false;
    };

    onMounted(checkIfInStore);

    return {
      saveToStorage,
      removeFromStorage,
      isFavourite,
      removeItem,
      male,
      female,
      genderless,
    };
  },
});
</script>

<style lang="scss" scoped>
.character {
  width: 100%;
}
</style>