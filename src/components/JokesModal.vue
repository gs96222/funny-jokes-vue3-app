<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import useClickOutside from "@/composables/useClickOutside";

const props = defineProps<{
  show: boolean;
  onClose: (open: boolean) => void;
}>();

const showModal = ref(false);
const targetModel = ref(null);
const { onClickOutside } = useClickOutside();

const closeModal = () => {
  console.log(showModal.value);
  console.log("clicked");
  showModal.value = false;
  props.onClose(false);
};

onMounted(() => {
  showModal.value = props.show;
});

onClickOutside(targetModel, () => {
  console.log(showModal);
  if (showModal.value === true) {
    closeModal();
  }
});

watch(
  () => props.show,
  (show) => {
    console.log("watcher called");
    showModal.value = show;
  }
);
</script>

<template>
  <div v-show="showModal" role="dialog" class="modal-container">
    <div ref="targetModel" class="modal-content">
      <div class="modal-header">
        <span class="close" @click="closeModal">&times;</span>
        <slot name="heading"></slot>
      </div>
      <div class="modal-body">
        <slot name="details"></slot>
      </div>
      <div class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  display: block;
  position: fixed;
  z-index: 10;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}

/* Add Animation */
@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

/* The Close Button */
.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
  z-index: 6;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
  text-align: center;
}

.modal-body {
  padding: 2px 16px;
  min-height: 300px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
</style>
