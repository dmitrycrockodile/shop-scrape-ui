<template>
  <div class="dropdown__wrapper" ref="dropDown" :name="name">
    <div
      class="dropdown__selected-option"
      @click="isDropdownVisible = !isDropdownVisible"
    >
      {{
        selectedOption
          ? `${selectedOption.name} (${selectedOption.weight}, ${selectedOption.amount} items)`
          : "Select Pack Size"
      }}
      <i
        :class="`flaticon-down-arrow ${isDropdownVisible ? 'active' : ''}`"
      ></i>
    </div>
    <transition name="slide-fade">
      <div class="options__wrapper" v-if="isDropdownVisible">
        <div
          :class="`option ${isDisabledOptions[option.id] ? 'disabled' : ''}`"
          v-for="(option, i) in options"
          @click.prevent="!isDisabledOptions[option.id] && selectOption(option)"
          :key="i"
        >
          {{ option.name }} ({{ option.weight }}, {{ option.amount }} items)
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption:
        this.options.find((opt) => opt.id === this.modelValue) || null,
      isDropdownVisible: false,
    };
  },
  props: {
    options: { type: Array, required: true },
    modelValue: { default: null },
    name: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  methods: {
    selectOption(option) {
      this.$emit("update:modelValue", option.id);
      this.selectedOption = option;
      this.isDropdownVisible = false;
    },
    closeDropdown(event) {
      if (!this.$refs.dropDown.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    },
  },
  computed: {
    isDisabledOptions() {
      return this.options.reduce((acc, option) => {
        acc[option.id] =
          this.selectedOption && this.selectedOption.id === option.id;
        return acc;
      }, {});
    },
  },
  mounted() {
    window.addEventListener("click", this.closeDropdown);
  },
  unmounted() {
    window.removeEventListener("click", this.closeDropdown);
  },
};
</script>

<style scoped>
.dropdown__wrapper {
  cursor: pointer;
  min-width: 160px;
  padding: 5px 10px;
  text-align: center;
  font-size: 14px;
  position: relative;
  z-index: 100;
  border: 1px solid #5e72e4;
  border-radius: 5px;
  background: #fff;
}

.dropdown__selected-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  position: relative;
}

.dropdown__selected-option i {
  transition: transform 0.2s;
}

.dropdown__selected-option i.active {
  transform: rotate(180deg);
}

.options__wrapper {
  background-color: #fff;
  border: 1px solid #5e72e4;
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 101;
  border-radius: 5px;
}

.option {
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.option:hover {
  background-color: #e0e0e0;
}

.option.disabled {
  background-color: #d2d2d2;
  cursor: default;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
