<template>
  <div class="pagination">
    <button type="button pagination__nav" @click="setPrevPage">prev</button>
    <div class="pagination__elements">
      <button
        type="button"
        v-for="value in pagesArray"
        :key="value"
        @click="setCurrentPage(value)"
        :class="{
          active: isPageActive(value),
          disabled: isPageDisabled(value),
        }"
      >
        <span class="pointer" v-if="isPointerActive(value)">...</span>
        <span class="value" v-else>{{ value }}</span>
      </button>
    </div>
    <button type="button pagination__nav" @click="setNextPage">next</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "Pagination",
  props: {
    totalPages: { type: Number, required: true },
  },

  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const currentPage = ref<number>(Number(route.query.page) || 1);
    let allPages = ref<number>(props.totalPages);

    const pagesArray = computed(() => {
      return Array.from({ length: allPages.value }, (_, index) => index + 1);
    });

    const setPrevPage = () => {
      if (currentPage.value === 1) {
        return;
      }
      currentPage.value = currentPage.value - 1;
    };

    const setNextPage = () => {
      if (currentPage.value === pagesArray.value.length) {
        return;
      }
      currentPage.value = currentPage.value + 1;
    };

    const setCurrentPage = (page: number) => {
      currentPage.value = page;
    };

    const isPageActive = (page: number) => {
      return currentPage.value === page;
    };

    const isPageDisabled = (page: number) => {
      return (
        currentPage.value !== page &&
        page > 2 &&
        page != pagesArray.value.length &&
        currentPage.value != page - 1 &&
        currentPage.value != page + 1 &&
        currentPage.value != page - 2 &&
        currentPage.value != page + 2
      );
    };

    const isPointerActive = (page: number) => {
      return (
        (page === currentPage.value - 2 || page === currentPage.value + 2) &&
        page > 2 &&
        page != pagesArray.value.length
      );
    };

    watch(currentPage, (value) => {
      router.push({ query: { page: `${value}` } });
    });

    return {
      pagesArray,
      setPrevPage,
      setNextPage,
      setCurrentPage,
      isPageActive,
      isPageDisabled,
      isPointerActive,
      currentPage,
    };
  },
});
</script>

<style lang="scss" scoped>
button {
  margin: 2px;
}
.disabled {
  padding: 0;
  border: 0;
  display: none;

  &.pointer {
    color: blue;
  }
}

.active {
  background-color: blue;
}
</style>
