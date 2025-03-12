<template>
  <SubHeader />
  <div class="container py-3">
    <div class="topMenu">
        <h2>Import</h2>
    </div>
    <div class="subMenu">
        <h3>Letter of Credit</h3>
    </div>
    <!-- Loop through grouped subMenuItems (2 items per row) -->
    <div v-for="(row, rowIndex) in groupedSubMenuItems" :key="rowIndex" class="row">
      <div v-for="(item, index) in row" :key="index" class="col-md-6 col-sm-12 py-2">
        <img :src="actionForwardImg" class="img-fluid">
        <span><router-link to="/list">{{ item.title }}</router-link></span>
        <!-- <span><a :href="item.url">{{ item.title }}</a></span> -->
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from './Header.vue';
// const actionForwardImg = new URL('@/assets/action_forward.jpg', import.meta.url).href;
import actionForwardImg from '../assets/action_forward.jpg'

export default {
    name: 'SubMenus',
    components: {
      SubHeader
    },   
    data() {
      return {
        actionForwardImg,
        subMenuItems: [
          { title: "Registation", url: "/list" },
          { title: "Collect Margin", url: "#" },
          { title: "Issuance", url: "#" },
          { title: "Refund Margin", url: "#" },
          { title: "Amendment", url: "#" },
          { title: "Ready for Approval", url: "#" },
          { title: "Cancellation", url: "#" },
          { title: "Supervisor Release", url: "#" },
          { title: "Charge Collection", url: "#" },
          { title: "Approve Credit Excess", url: "#" },
          { title: "Reactivation", url: "#" }
        ]
      };
    },
    computed: {
    groupedSubMenuItems() {
      // Split array into chunks of 2 items per row
      const groups = [];
      for (let i = 0; i < this.subMenuItems.length; i += 2) {
        groups.push(this.subMenuItems.slice(i, i + 2));
      }
      return groups;
    }
  }
}
</script>

<style >
.topMenu {
    background-color:deepskyblue;
    padding-bottom: 2px;
}

.topMenu h2 {
    font-size: 20px;
    padding-left: 10px;
    padding-top: 5px;
}

.subMenu {
    background-color: rgb(44, 243, 243);
    border-bottom: solid;
}

.subMenu h3 {

    padding-top: 2px;
    font-size: 15px;
}
</style>