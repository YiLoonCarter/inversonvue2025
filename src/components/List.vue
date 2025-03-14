<template>
    <LoadingOverlay :isLoadVisible=turnOffLoading /> 
    <SubHeader />
    <div class="container py-3">
        <div class="topMenu mb-3">
            <h2>Letter of Credit Registation Search</h2>
        </div>
        <div class="mb-3">
            <label for="regView">View</label>
            <select name="regView" id="regView" class="form-select">
                <option value="#">All Registration</option>
                <option value="NewReg">New Registration</option>
                <option value="FullApp">Fully Approved</option>
                <option value="RegCan">Registration Cancelled</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="srcBrn">Source Branch</label>
            <select name="srcBrn" id="srcBrn" class="form-select">
                <option value="1000">1000 - Kuala Lumpur</option>
                <option value="1001">1001 - Kepong</option>
                <option value="1002">1002 - Bandar Utama</option>
                <option value="1003">1003 - Puchong</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="refNo">Reference Number</label>
            <input type="text" name="refNo" id="refNo" class="form-control">
        </div>
        <div class="mb-3">
            <button id="btn_Back" style="border: none;background-color: transparent;" 
            data-bs-toggle="tooltip" title="Back" data-bs-placement="top"
            @click="goToSubMenu()">
              <i class="fa-solid fa-arrow-left fa-2xl" style="color: rgb(55, 175, 202);"></i>
            </button>
            <button id="btn_Search" style="border: none;background-color: transparent;" 
            data-bs-toggle="tooltip" title="Search" data-bs-placement="top">
              <i class="fa-solid fa-magnifying-glass fa-2xl" style="color: rgb(55, 175, 202);"></i>
            </button>
            <button id="btn_New" style="border: none;background-color: transparent;" 
            data-bs-toggle="tooltip" title="New" data-bs-placement="top"
            @click="goToUserForm('0', 'new')">
              <i class="fa-solid fa-square-plus fa-2xl" style="color: rgb(66, 177, 202);"></i>
            </button>
        </div>
        <table class="table table-striped table-hover text-center">
            <thead id="trxDetailHdr">
                <tr>
                    <!-- <th class="listTable1" style="background-color: rgb(66, 177, 202);"><input type="checkbox" name="chkAll" id="chkAll"></th> -->
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">Branch</th>
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">Reference</th>
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">Name</th>
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">Currency</th>
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">Amount</th>
                    <th class="listTable1 text-start" style="background-color: rgb(66, 177, 202);">Status</th>
                    <th class="listTable1" style="background-color: rgb(66, 177, 202);">To-do</th>
                </tr>
            </thead>
            <tbody id="trxDetail">
                <tr v-for="(item, index) in listdata" :key="index">
                    <!-- <td><input type="checkbox"></td> -->
                    <td>{{ item.srcBrn }}</td>
                    <td>{{ item.refNo }}</td>
                    <td>{{ item.cifName }}</td>
                    <td>{{ item.currType }}</td>
                    <td>{{ item.lcAmt }}</td>
                    <td class="text-start">{{ getStatusDesc(item.trxStatus) }}</td>
                    <td>
                        <div class="dropdown">
                            <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><button class="dropdown-item" @click="goToUserForm(item.id, 'inq')">Inquiry</button></li>
                                <li><button class="dropdown-item" @click="goToUserForm(item.id, 'edt')">Edit</button></li>
                                <li><button class="dropdown-item" @click="goToUserForm(item.id, 'cpy')">Copy</button></li>
                                <li><button class="dropdown-item" @click="goToUserForm(item.id, 'apr')">Approve</button></li>
                                <li><button class="dropdown-item" @click="goToUserForm(item.id, 'del')">Delete</button></li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
      <PieChart />
</template>
<script>
import SubHeader from './Header.vue';
import LoadingOverlay from './LoadingOverlay.vue';
import PieChart from './PieChart.vue';

export default {
    name: 'List',
    components: {
      SubHeader,
      LoadingOverlay,
      PieChart
    },
    data() {
        return {
            turnOffLoading: false,
            listdata: [],
            currencyMap: {
                USD: "USD - US Dollar",
                SGD: "SGD - Singapore Dollar",
                MYR: "MYR - Malaysia Ringgit"
            },
            statusMap: {
                FullApp: "Fully Approved",
                NewReg: "New Registration",
                RegCan: "Registration Cancelled"
            }
        } 
    },
    created(){

        fetch(
        "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction",
        {
            headers: {
            Authorization: "Bearer thisisasecretkeyforthisapi",
            "Content-Type": "application/json",
            },
        }
        )
        .then((response) => response.json())
        .then((data) => {
            if(data.transaction === undefined && data.errors != undefined){
                toastr.options.closeButton = true;
                toastr.options.progressBar = true;
                toastr.error(data.errors[0].detail, "Error");
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
            }else{
                this.listdata = data.transaction;
                console.log(this.listdata);
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
            } 
        })
        .catch((err) => {
            console.log(err);
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.error(err, "Error");
            this.$nextTick(() => {
                this.turnOffLoading = true;
            });
        });

    },
    methods: {
        goToUserForm(trxId, mode) {
            let modeDesc = "";
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            switch(mode){
                case "new":
                    modeDesc = "Adding a new record";
                    break;
                case "edt":
                    modeDesc = "Editing record";
                    break;
                case "cpy":
                    modeDesc = "Copying record";
                    break;
                case "inq":
                    modeDesc = "Inquiry record detail";
                    break;
                case "apr":
                    modeDesc = "Approving record";
                    break;
                case "del":
                    modeDesc = "Deleting record";
                    break;
            }
            toastr.info(modeDesc, "Info");
            this.$router.push({ 
                name: 'UserForm', 
                params: { trxId, mode } 
            });
        },
        goToSubMenu() {
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.info("Redirect back to Sub Menu", "Info");
            this.$router.push({ 
                name: 'home', 
            });
        },
        getCurrencyName(code) {
            return this.currencyMap[code] || code; // Fallback to code if no mapping found
        },
        getStatusDesc(code) {
            return this.statusMap[code] || code; // Fallback to code if no mapping found
        }
    },
    mounted() {
      // Set turnOffLoading to true once the component is fully mounted
    //   this.$nextTick(() => {
    //     this.turnOffLoading = true;
    //     console.log("turnOffLoading set to:", this.turnOffLoading);
    //   });
    }
}
</script>
<style>
    
</style>