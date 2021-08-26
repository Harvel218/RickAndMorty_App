<template>
  <Characters :characterName="userInput"></Characters>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Characters from "@/components/Characters.vue";

export default defineComponent({
  name: "Home",
  components: { Characters },
  props: {
    userInput: [String],
  },
});
</script>
