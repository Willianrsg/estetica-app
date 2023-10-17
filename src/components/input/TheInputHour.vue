<template>
  <div :class="`${this.divClass}`">
    <s-label :label="label" :required="required" />
    <div class="input-group mb-3">
      <s-datepicker
        v-mask="'##:##'"
        format="HH:mm"
        model-type="HH:mm"
        time-picker
        :input-class-name="hasError ? 'dp-custom-input' : ''"
        :class="{ 'is-invalid': hasError }"
        v-model="inputValue"
        @input="updateValue"
        @blur="updateValue"
      >
        <template #input-icon>
          <i class="bi bi-clock ms-2"></i>
        </template>
      </s-datepicker>
      <div class="form-group right-inner-addon">
        <b
          ><i class="bi bi-exclamation-circle text-danger" v-if="hasError"></i
        ></b>
      </div>
      <div class="invalid-feedback" v-if="hasError">
        {{ error }}
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import { validateTime } from "@/rule/validate";
  
  export default defineComponent({
    data: () => ({
      inputValue: "",
      error: null,
      hasError: false,
      textInputOptions: {
        enterSubmit: true,
      },
      showTimepicker: false,
    }),
  
    props: {
      divClass: String,
      label: String,
      isDisabled: Boolean,
      required: Boolean,
      modelValue: String,
    },
  
    computed: {
      inputId() {
        return `timepicker-${Math.random().toString(36).substring(7)}`;
      },
    },
  
    methods: {
      update() {
        if (this.inputValue == "") this.inputValue = null;
        this.$emit("update:modelValue", this.inputValue);
      },
      updateValue() {
        validateTime(
          this.inputValue,
          this.required,
          this,
          `${this.label} é obrigatória.`
        );
        this.update();
      },
      openTimepicker() {
        this.showTimepicker = true;
      },
      selectTime(selectedTime) {
        this.inputValue = selectedTime;
        this.showTimepicker = false;
      },
    },
  
    emits: ["update:modelValue"],
  
    created() {
      if (this.modelValue) {
        this.inputValue = this.modelValue;
      }
    },
  
    watch: {
      inputValue() {
        this.updateValue();
      },
  
      modelValue() {
        if (this.modelValue == undefined) {
          this.inputValue = null;
        }
  
        if (this.modelValue != null) {
          if (this.modelValue != this.inputValue) {
            this.inputValue = this.modelValue;
          }
        }
      },
    },
  });
</script>
