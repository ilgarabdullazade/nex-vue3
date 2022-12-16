<template>
  <div class="cta__language language">
    <div class="select select_sel-language">
      <div class="select__body">
        <button
          type="button"
          class="select__title"
          @click="isHidden = !isHidden">
          <span class="select__value"
            ><span class="select__content"
              ><span class="select__row"
                ><span class="select__asset"
                  ><img src="@/assets/img/header/icons/world.svg" /></span
                ><span class="select__text">{{
                  $t('header.language')
                }}</span></span
              ></span
            ></span
          >
        </button>
        <div class="select__options" :hidden="isHidden">
          <button
            v-for="locale in supportedLocales"
            :key="locale"
            @click="switchLocale(locale)"
            class="select__option"
            :class="{ active: $i18n.locale === locale }"
            type="button">
            {{ locale === 'uk' ? 'UA' : locale }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Trans } from '@/plugins/Translation';

export default {
  name: 'NexLanguageSwitcher',
  data: () => {
    return {
      isHidden: true,
    };
  },
  computed: {
    supportedLocales() {
      return Trans.supportedLocales;
    },
  },
  methods: {
    async switchLocale(locale) {
      if (this.$i18n.locale !== locale) {
        const to = this.$router.resolve({ params: { locale } });
        await Trans.changeLocale(locale);
        this.$router.push(to.fullPath);
        this.isHidden = true;
      }
    },
  },
};
</script>

<style scoped>
.select_sel-language .select__option {
  text-transform: uppercase;
}
.select_sel-language .select__option.active {
  color: #edbb40;
}

.dark-mode .select__text {
  color: #ececec !important;
}
.select__title {
  background-color: transparent !important;
}
</style>
