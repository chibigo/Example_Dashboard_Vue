<template>
  <div>
    <Dropdown
      v-model="valueModel"
      :options="options"
      optionLabel="name"
      :placeholder="valueModel.name"
      class="w-full md:w-14rem"
    />
  </div>
</template>

<script setup>
import Dropdown from "primevue/dropdown";
import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t,locale } = useI18n();

const valueModel = ref({
    name: t(`language.en`),
    code: "en",
  });


const options = ref([
  {
    name: t(`language.en`),
    code: "en",
  },
  {
    name: t(`language.vi`),
    code: "vi",
  },
]);

watch(valueModel, (newLocale) => { 
  locale.value = newLocale.code;
});
</script>

<style lang="scss" scoped></style>
