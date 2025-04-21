<script>
export default {
  data() {
    return {
      selectedOptions: this.modelValue || [],
      isDropdownVisible: false,
    };
  },
  props: {
    options: { type: Array, required: true },
    modelValue: { default: () => [] },
    name: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  methods: {
    toggleOption(option) {
      const index = this.selectedOptions.findIndex(
        (selected) => selected.id === option.id
      );

      if (index === -1) {

        this.selectedOptions.push(option);
      } else {

        this.selectedOptions.splice(index, 1);
      }

      this.$emit("update:modelValue", this.selectedOptions.map((opt) => opt.id));
    },
    closeDropdown(event) {

      if (!this.$refs.dropDown.contains(event.target)) {
        this.isDropdownVisible = false;
      }
    },
  },
  computed: {
    isOptionSelected() {
      return (option) => {
        return this.selectedOptions.some((selected) => selected.id === option.id);
      };
    },
  },
  watch: {
    modelValue(newValue) {
      this.selectedOptions = this.options.filter((option) =>
        newValue.includes(option.id)
      );
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
<template>
    <div class="dropdown__wrapper" ref="dropDown" :name="name">
      <div
        class="dropdown__selected-option"
        @click="isDropdownVisible = !isDropdownVisible"
      >
        {{
          selectedOptions.length > 0
            ? `${selectedOptions.length} Retailers Selected`
            : "Select Retailers"
        }}
        <i
          :class="`flaticon-down-arrow ${isDropdownVisible ? 'active' : ''}`"
        ></i>
      </div>
  
      <transition name="slide-fade">
        <div class="options__wrapper" v-if="isDropdownVisible">
          <div
            :class="`option ${isOptionSelected(option) ? 'selected' : ''}`"
            v-for="(option, i) in options"
            @click.prevent="toggleOption(option)"
            :key="i"
          >
            <input class="me-2" type="checkbox" :checked="isOptionSelected(option)" />
            {{ option.title }}
          </div>
        </div>
      </transition>
    </div>
  </template>
  

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
  text-align: left;
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
  max-height: 200px;
  overflow-y: auto;
}

.option {
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
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