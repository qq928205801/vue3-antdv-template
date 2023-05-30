<template>
  <div>
    <teleport to="body" :disabled="toTarget">
      <div v-if="modalOpen" class="modal">
        <div>
          {{ stateSount }}--{{ jisuanReactive }}
          I'm a teleported modal! (My parent is "body")
          <button @click="modalOpen = false">Close</button>
        </div>
      </div>
    </teleport>
    <button @click="toTarget = !toTarget">toTargetBtn</button>

    <button @click="modalOpen = true">
      Open full screen modal! (With teleport!)
    </button>
  </div>
</template>
<script setup>
import { ref } from "vue";
let toTarget = ref(true);
let modalOpen = ref(true);
</script>
     