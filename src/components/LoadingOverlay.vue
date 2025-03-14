<template>
    <div id="loading-overlay" :class="{ visible: isLoadVisible }">
      <!-- <div><img src="working.gif" width="240px" height="240px" alt=""></div> -->
      <!-- <div><img :src="workingImg" width="240px" height="240px" class="img-fluid"></div> -->
      <div><img src="@/assets/working.gif" width="240px" height="240px" alt=""></div>
    </div>
</template>
<script>
// import workingImg from '../assets/working.gif'
export default {
    // data() {
    //   return {
    //     // workingImg,
    //     loadingVisible: this.isLoadVisible,
    //   }
    // },
    props: {
        isLoadVisible: Boolean,
    },
    created() {
        // console.log('Received isLoadVisible:', this.isLoadVisible);
    },
    computed: {
        loadingVisible() {
            return this.isLoadVisible; // Directly reflect prop changes
        }
    },
    watch: {
        isLoadVisible(newVal) {
            // console.log('Updated isLoadVisible:', newVal);
        }
    }
}
</script>
<style>
    #loading-overlay.visible{
        display: none;
    }
</style>