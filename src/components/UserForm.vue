<template>
    <LoadingOverlay :isLoadVisible=turnOffLoading />  
     <SubHeader />
     <div class="container py-3 bg-light">
        <div class="topMenu mb-3">
            <h2>Letter of Credit Registation</h2>
        </div>
        <div class="mb-3">
            <button class="btn btn-info" id="btn_Detail">Detail</button>
            <button class="btn btn-info" id="btn_Parties">Parties</button>
            <button class="btn btn-info" id="btn_Notepad">Notepad</button>
        </div>
        <div class="row">
            <div class="col-md-6 g-3">
                <label for="refNo" class="form-label">Reference No</label>
                <input type="text" class="form-control" id="refNo" v-model="refNo" 
                :disabled="disableRefNo">
              </div>
        </div>
        <div class="row">
            <div class="col-md-6 g-3">
                <label for="cifNo" class="form-label">Customer No</label>
                <input type="text" class="form-control" id="cifNo" v-model="cifNo" :disabled="disableCifNo">
              </div>
              <div class="col-md-6 g-3">
                <label for="cifName" class="form-label">Customer Name</label>
                <input type="text" class="form-control" id="cifName" v-model="cifName" :disabled="disableCifName">
              </div>
        </div>
        <div class="row">
            <div class="col-md-6 g-3">
                <label for="srcBrn" class="form-label">Source Branch</label>
                <select name="srcBrn" id="srcBrn" v-model="srcBrn" :disabled="disableSrcBrn" class="form-select">
                  <option value="1000">1000 - Kuala Lumpur</option>
                  <option value="1001">1001 - Kepong</option>
                  <option value="1002">1002 - Bandar Utama</option>
                  <option value="1003">1003 - Puchong</option>
              </select>
              </div>
              <div class="col-md-6 g-3">
                <label for="prcBrn" class="form-label">Processing Branch</label>
                <select name="prcBrn" id="prcBrn" v-model="prcBrn" :disabled="disablePrcBrn" class="form-select">
                  <option value="1000">1000 - Kuala Lumpur</option>
                  <option value="1001">1001 - Kepong</option>
                  <option value="1002">1002 - Bandar Utama</option>
                  <option value="1003">1003 - Puchong</option>
              </select>
              </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-6 g-3">
              <label for="refType" class="form-label">Open As</label>
              <select name="refType" id="refType" v-model="refType" :disabled="disableRefType" class="form-select">
                  <option value="LLC">Local LC</option>
                  <option value="FLC">Foreign LC</option>
              </select>
            </div>
        </div>
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne" style="padding:0px;height: 25px;">
              <h5 class="mb-0">
                <button class="btn btn-link text-start" style="width: 100%; padding: 0px;background-color:deepskyblue;text-decoration: none;;height: 30px;color:black" 
                  data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  MAIN
                </button>
              </h5>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordion">
              <div class="card-body" style="padding: 6px">
                <div class="subMenu py-1" style="border-bottom: none;">
                  <h3>LC Details</h3>
                </div>
                <div class="row">
                  <div class="col-md-6 g-3">
                      <label for="lcType" class="form-label">Type of LC</label>
                      <select name="lcType" id="lcType" v-model="lcType" :disabled="disableLcType" class="form-select">
                          <option value="NLC">Normal LC</option>
                          <option value="CLC">Corp LC</option>
                      </select>
                    </div>
                    <div class="col-md-6 g-3">
                      <label for="docIndex" class="form-label">Document Index No</label>
                      <input type="text" class="form-control" id="docIndex" :disabled="disableDocIndex" v-model="docIndex">
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 g-3">
                        <label for="appDate" class="form-label">Application Date</label>
                        <input type="date" class="form-control" id="appDate" :disabled="disableAppDate" v-model="appDate">
                      </div>
                      <div class="col-md-6 g-3">
                        <label for="appRcpDate" class="form-label">Application Receipt Date</label>
                        <input type="date" class="form-control" id="appRcpDate" :disabled="disableAppRcpDate" v-model="appRcpDate">
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-6 g-3">
                        <label for="issDate" class="form-label">Issue Date</label>
                        <input type="date" class="form-control" id="issDate" :disabled="disableIssDate" v-model="issDate">
                      </div>
                      <div class="col-md-6 g-3">
                        <label for="expDate" class="form-label">Expiry Date</label>
                        <input type="date" class="form-control" id="expDate" :disabled="disableExpDate" v-model="expDate">
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-6 g-3">
                        <label for="currType" class="form-label">Currency</label>
                        <select name="currType" id="currType" v-model="currType" :disabled="disableCurrType" class="form-select">
                            <option value="USD">USD</option>
                            <option value="MYR">MYR</option>
                            <option value="SGD">SGD</option>
                        </select>
                      </div>
                      <div class="col-md-6 g-3">
                        <label for="lcAmt" class="form-label">Transaction Amount</label>
                        <input type="text" class="form-control" id="lcAmt" :disabled="disableLcAmt" v-model="lcAmt">
                      </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="fab-container"> -->
      <div :class="['fab-container', { 'fab-hidden': isFabHidden }]">
        <div class="fab shadow">
          <div class="fab-content">
            <span class="material-icons" aria-hidden="true">action</span>
          </div>
        </div>

        <div
            v-for="(button, index) in visibleButtons"
            :key="button.id"
            class="sub-button shadow"
            :style="`--index: ${index + 1};`"
        >
            <a :href="button.href" data-bs-toggle="tooltip" 
            :title="button.title" :id="button.id" 
            data-bs-placement="left"
            @click.prevent="handleButtonClick(button.id); hideTooltip(button.id)" @mouseover="hideTooltip(button.id)">
                <i :class="button.icon" aria-hidden="true"></i>
            </a>
        </div>
        
        <!-- <div class="sub-button shadow" style="--index: 1;">
          <a href="#" data-bs-toggle="tooltip" title="Back" id="btn_Back" data-bs-placement="left">
            <i class="fa-solid fa-arrow-left fa-xl" aria-hidden="true"></i>
          </a>
        </div>
      
        <div class="sub-button shadow" style="--index: 2;">
          <a href="#" data-bs-toggle="tooltip" title="Add" id="btn_Add" data-bs-placement="left">
            <i class="fa-solid fa-square-plus fa-xl" aria-hidden="true"></i>
          </a>
        </div>
      
        <div class="sub-button shadow" style="--index: 3;">
          <a href="#" data-bs-toggle="tooltip" title="Save" id="btn_Save" data-bs-placement="left">
            <i class="fa-solid fa-save fa-xl"  aria-hidden="true"></i>
          </a>
        </div>
      
        <div class="sub-button shadow" style="--index: 4;">
          <a href="#" data-bs-toggle="tooltip" title="Copy" id="btn_Copy" data-bs-placement="left">
            <i class="fa-solid fa-copy fa-xl" aria-hidden="true"></i>
          </a>
        </div>
        <div class="sub-button shadow" style="--index: 5;">
          <a href="#" data-bs-toggle="tooltip" title="Approve" id="btn_Apr" data-bs-placement="left">
            <i class="fa-solid fa-circle-check fa-xl" aria-hidden="true"></i>
          </a>
        </div>
        <div class="sub-button shadow" style="--index: 6;">
          <a href="#" data-bs-toggle="tooltip" title="Delete" id="btn_Del" data-bs-placement="left">
            <i class="fa-solid fa-trash fa-xl" aria-hidden="true"></i>
          </a>
        </div> -->
    </div>

      <button id="show-fab" :class="{ visible: isFabHidden }" @click="showFab">
        <i class="fa-solid fa-angles-right fa-md" ></i>
      </button>

      <button id="hide-fab" :class="{ visible: isHideFab }" @click="hideFab">
        <i class="fa-solid fa-angles-left fa-md" ></i>
      </button>

</template>
<script>
import SubHeader from './Header.vue';
import LoadingOverlay from './LoadingOverlay.vue';

export default {
    name: 'UserForm',
    props: {
      trxId: String,
      mode: String
    },
    // props: ['trxId', 'mode'],
    components: {
      SubHeader,
      LoadingOverlay
    },
    data() {
    return {
        // Initialize local state with props or fallback to default values
        gTrxId: this.trxId || this.$route.params.trxId || "", 
        gMode: this.mode || this.$route.params.mode || "new",
        disableRefNo: false,
        disableCifNo: false,
        disableCifName: false,
        disableSrcBrn: false,
        disablePrcBrn: false,
        disableRefType: false,
        disableLcType: false,
        disableDocIndex: false,
        disableAppDate: false,
        disableAppRcpDate: false,
        disableIssDate: false,
        disableExpDate: false,
        disableCurrType: false,
        disableLcAmt: false,
        refNo: "", //100001
        cifNo: "", //110001
        cifName: "", //YTL Corp
        srcBrn: "", //1000
        prcBrn: "", //1001
        refType: "", //LLC
        lcType: "", //NLC
        docIndex: "", //100001
        appDate: "", //2025-03-19
        appRcpDate: "", //2025-03-19
        issDate: "", //2025-03-19
        expDate: "", //2025-03-20
        currType: "", //USD
        lcAmt: "", //8000.00
        isFabHidden: false, // Track FAB visibility
        isHideFab: false,
        turnOffLoading: false,
        buttons: [
          { id: "btn_Back", title: "Back", icon: "fa-solid fa-arrow-left fa-xl", href: "#", alwaysShow: true },
          { id: "btn_Add", title: "Add", icon: "fa-solid fa-square-plus fa-xl", href: "#", allowedRoles: ["admin", "editor"] },
          { id: "btn_Save", title: "Save", icon: "fa-solid fa-save fa-xl", href: "#", hideIfStatus: "approved" },
          { id: "btn_Copy", title: "Copy", icon: "fa-solid fa-copy fa-xl", href: "#", allowedRoles: ["admin"] },
          { id: "btn_Apr", title: "Approve", icon: "fa-solid fa-circle-check fa-xl", href: "#", showIfStatus: "pending" },
          { id: "btn_Del", title: "Delete", icon: "fa-solid fa-trash fa-xl", href: "#", allowedRoles: ["admin"], hideIfStatus: "approved" }
        ],
        modeMap: {
          inq: "Inquiry",
          new: "Add",
          edt: "Update",
          cpy: "Copy",
          apr: "Approval",
          del: "Delete"
        },
      };
    },
    computed: {        
        visibleButtons() {
            return this.buttons.filter(button => {
                // Always show buttons explicitly marked
                // if (button.alwaysShow) return true;

                // Filter by allowed roles (userRole is now coming from props)
                // if (button.allowedRoles && !button.allowedRoles.includes(this.userRole)) {
                // return false;
                // }

                // Hide button if transaction status matches hideIfStatus
                // if (button.hideIfStatus && button.hideIfStatus === this.transactionStatus) {
                // return false;
                // }

                // Show button only if transaction status matches showIfStatus
                // if (button.showIfStatus && button.showIfStatus !== this.transactionStatus) {
                // return false;
                // }
                if(this.mode == 'inq') {
                    if(button.id != 'btn_Back'){
                        return false;
                    }
                }

                if(this.mode == 'edt') {
                    if(button.id != 'btn_Back' && button.id != 'btn_Save'){
                        return false;
                    }
                }

                if(this.mode == 'new') {
                    if(button.id != 'btn_Back' && button.id != 'btn_Add'){
                        return false;
                    }
                }

                if(this.mode == 'cpy') {
                    if(button.id != 'btn_Back' && button.id != 'btn_Copy'){
                        return false;
                    }
                }

                if(this.mode == 'apr') {
                    if(button.id != 'btn_Back' && button.id != 'btn_Apr'){
                        return false;
                    }
                }

                if(this.mode == 'del') {
                    if(button.id != 'btn_Back' && button.id != 'btn_Del'){
                        return false;
                    }
                }

                return true;
            });
        }
    },
    created() {
        // console.log('Received trxId:', this.trxId);
        // console.log('Received mode:', this.mode);

        if (this.trxId != 0) {
          // console.log('trigger GET method');
            fetch(
                "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
                this.trxId,
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
                toastr.error(data.errors[0].detail, "Error - Form - " + this.getModeDesc(this.mode));
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
              }else{
                console.log(data.transaction);
                const dataset = data.transaction;

                this.refNo = dataset.refNo;
                this.cifNo = dataset.cifNo;
                this.cifName = dataset.cifName;
                this.srcBrn = dataset.srcBrn;
                this.prcBrn = dataset.prcBrn;
                this.refType = dataset.refType;

                if(this.mode == "inq" || this.mode == "edt" || this.mode == "apr" || this.mode == "del"){
                    this.disableRefNo = true;
                    this.disableCifNo = true;
                    this.disableCifName = true;
                    this.disableSrcBrn = true;
                    this.disablePrcBrn = true;
                    this.disableRefType = true;
                }

                if(this.mode == "inq" || this.mode == "apr" || this.mode == "del"){
                    this.disableLcType = true;
                    this.disableDocIndex = true;
                    this.disableAppDate = true;
                    this.disableAppRcpDate = true;
                    this.disableIssDate = true;
                    this.disableExpDate = true;
                    this.disableCurrType = true;
                    this.disableLcAmt = true;
                }

                this.lcType = dataset.lcType;
                this.docIndex = dataset.docIndex;
                this.appDate = dataset.appDate;
                this.appRcpDate = dataset.appRcpDate;
                this.issDate = dataset.issDate;
                this.expDate = dataset.expDate;
                this.currType = dataset.currType;
                this.lcAmt = dataset.lcAmt;
                this.$nextTick(() => {
                  this.turnOffLoading = true;
                });
              }
            })
            .catch((err) => {
                toastr.options.closeButton = true;
                toastr.options.progressBar = true;
                toastr.error(err, "Error - Form - " + this.getModeDesc(this.mode));
                this.$nextTick(() => {
                  this.turnOffLoading = true;
                });
                //document.getElementById("loading-overlay").style.display = "none";
            });
        } else {
            //document.getElementById("loading-overlay").style.display = "none";
            this.$nextTick(() => {
              this.turnOffLoading = true;
            });
        }
    },
    mounted() {
      this.initBootstrapTooltips();
    },
    methods: {
        hideTooltip(btn) {
              const tooltipEl = document.getElementById(btn);
              // const button = event.currentTarget;
              const tooltip = bootstrap.Tooltip.getInstance(tooltipEl);
              if (tooltip) {
                  tooltip.hide();
              }
        },
        initBootstrapTooltips() {
          const tooltipTriggerList = [].slice.call(
            document.querySelectorAll('[data-bs-toggle="tooltip"]')
          );
          tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
          });
        },
        hideFab() {
            this.isFabHidden = true;
            this.isHideFab = true;
        },
        showFab() {
            this.isFabHidden = false;
            this.isHideFab = false;
        },
        getModeDesc(code) {
            return this.modeMap[code] || code; // Fallback to code if no mapping found
        },
        handleButtonClick(buttonId) {
          console.log("button id clicked : " + buttonId);
          this.$nextTick(() => {
            this.turnOffLoading = false;
          });
          switch (buttonId) {
              case 'btn_Back':
                  // console.log("Back button clicked");
                  // this.$router.go(-1);
                  toastr.options.closeButton = true;
                  toastr.options.progressBar = true;
                  toastr.info("Redirect back to List", "Info");
                  this.$router.push({ 
                    name: 'list', 
                  });
                  break;
              case 'btn_Save':
                  // console.log("Save button clicked");
                  this.saveTransaction();
                  break;
              case 'btn_Add':
                  // console.log("Add button clicked");
                  this.addTransaction();
                  break;
              case 'btn_Apr':
                  // console.log("Approve button clicked");
                  this.approveTransaction();
                  break;
              case 'btn_Copy':
                  // console.log("Copy button clicked");
                  this.copyTransaction();
                  break;
              case 'btn_Del':
                  // console.log("Delete button clicked");
                  this.deleteTransaction();
                  break;
              default:
                  // console.log("Unknown button clicked");
          }
        },
        saveTransaction() {
            // Add logic for saving a transaction
            // alert("Saving transaction...");
            const data = {
              transaction: {
                lcType: this.lcType,
                docIndex: this.docIndex,
                appDate: this.appDate,
                appRcpDate: this.appRcpDate,
                issDate: this.issDate,
                expDate: this.expDate,
                currType: this.currType,
                lcAmt: this.lcAmt,
              },
            };
            console.log(data);
            this.fetchPut(data, this.gTrxId);
        },
        addTransaction() {
            // Add logic for adding a transaction
            // alert("Adding new transaction...");
            const data = {
              transaction: {
                refNo: this.refNo,
                cifNo: this.cifNo,
                cifName: this.cifName,
                srcBrn: this.srcBrn,
                prcBrn: this.prcBrn,
                refType: this.refType,
                lcType: this.lcType,
                docIndex: this.docIndex,
                appDate: this.appDate,
                appRcpDate: this.appRcpDate,
                issDate: this.issDate,
                expDate: this.expDate,
                currType: this.currType,
                lcAmt: this.lcAmt,
                trxStatus: "NewReg",
              },
            };
            this.fetchPost(data);
        },
        approveTransaction() {
            // Add logic for approving a transaction
            // alert("Approving transaction...");
            const data = {
              transaction: {
                trxStatus: "FullApp",
              },
            };
            this.fetchPut(data, this.gTrxId);
        },
        copyTransaction() {
            // Add logic for copying a transaction
            // alert("Copying transaction...");
            const data = {
              transaction: {
                refNo: this.refNo,
                cifNo: this.cifNo,
                cifName: this.cifName,
                srcBrn: this.srcBrn,
                prcBrn: this.prcBrn,
                refType: this.refType,
                lcType: this.lcType,
                docIndex: this.docIndex,
                appDate: this.appDate,
                appRcpDate: this.appRcpDate,
                issDate: this.issDate,
                expDate: this.expDate,
                currType: this.currType,
                lcAmt: this.lcAmt,
                trxStatus: "NewReg",
              },
            };
            this.fetchPost(data);
        },
        deleteTransaction() {
            // Add logic for deleting a transaction
            // alert("Deleting transaction...");
            fetch(
            "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
            this.gTrxId,
            {
              method: "DELETE",
              headers: {
                Authorization: "Bearer thisisasecretkeyforthisapi",
                "Content-Type": "application/json",
              },
            }
            )
            .then(() => {
              if(data.transaction === undefined && data.errors != undefined){
                toastr.options.closeButton = true;
                toastr.options.progressBar = true;
                toastr.error(data.errors[0].detail, "Error - Form - " + this.getModeDesc(this.mode));
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
              }else{
                toastr.options.closeButton = true;
                toastr.options.progressBar = true;
                toastr.success("Record successfully deleted", "Info");
                toastr.info("Redirect back to List", "Info");
                this.$router.push({ 
                  name: 'list', 
                });
              }
            })
            .catch((err) => {
              console.log(err);
              toastr.options.closeButton = true;
              toastr.options.progressBar = true;
              toastr.error(err, "Error - Form - " + this.getModeDesc(this.mode));
              this.$nextTick(() => {
                this.turnOffLoading = true;
            });
            });
        },
        fetchPut(putData, puttrxId){
          fetch(
          "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/" +
          puttrxId,
          {
            method: "PUT",
            body: JSON.stringify(putData),
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
                toastr.error(data.errors[0].detail, "Error - Form - " + this.getModeDesc(this.mode));
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
            }else{
              toastr.options.closeButton = true;
              toastr.options.progressBar = true;
              switch(this.gMode){
                case "edt":
                  toastr.success("Record successfully updated", "Info");
                  break;
                case "apr":
                  toastr.success("Record successfully approved", "Info");
                  break;
              }
              toastr.info("Redirect back to List", "Info");
              this.$router.push({ 
                name: 'list', 
              });
            }
            // document.location.href = "/list.html";
            // document.getElementById("loading-overlay").style.display = "none";
          })
          .catch((err) => {
            console.log(err);
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.error(err, "Error - Form - " + this.getModeDesc(this.mode));
            this.$nextTick(() => {
                this.turnOffLoading = true;
            });
            // document.getElementById("loading-overlay").style.display = "none";
          });
        },
        fetchPost(postData){
          fetch(
          "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction/",
          {
            method: "POST",
            body: JSON.stringify(postData),
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
                toastr.error(data.errors[0].detail, "Error - Form - " + this.getModeDesc(this.mode));
                this.$nextTick(() => {
                    this.turnOffLoading = true;
                });
            }else{
              toastr.options.closeButton = true;
              toastr.options.progressBar = true;
              switch(this.gMode){
                case "new":
                  toastr.success("Record successfully added", "Info");
                  break;
                case "cpy":
                  toastr.success("Record successfully copied", "Info");
                  break;
              }              
              toastr.info("Redirect back to List", "Info");
              this.$router.push({ 
                name: 'list', 
              });
            }
            // document.location.href = "/list.html";
            // document.getElementById("loading-overlay").style.display = "none";
          })
          .catch((err) => {
            console.log(err);
            toastr.options.closeButton = true;
            toastr.options.progressBar = true;
            toastr.error(err, "Error - Form - " + this.getModeDesc(this.mode));
            this.$nextTick(() => {
                this.turnOffLoading = true;
            });
            // document.getElementById("loading-overlay").style.display = "none";
          });
        }
    },
}
</script>

<style>
  .fab-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    user-select: none;
    position: fixed; /* Fixed instead of absolute */
    bottom: 30px;
    right: 30px;
    /* transition: bottom 0.3s ease-in-out; */
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }
  .fab-container:hover {
    height: 100%;
  }
  .fab-container:hover .sub-button {
    transform: translateY(calc(-70px * var(--index)));
    transition: transform 0.3s ease;
    opacity: 1; /* Fully visible on hover */
  }

  .fab-container .fab {
    opacity: 0.6; /* Semi-transparent before hover */
    transition: opacity 0.3s ease-in-out;
    position: relative;
    height: 70px;
    width: 70px;
    background-color: #4ba2ff;
    border-radius: 50%;
    z-index: 2;
  }
  .fab-container .fab:hover {
    opacity: 1; /* Fully visible on hover */
  }
  .fab-container .fab::before {
    content: " ";
    position: absolute;
    bottom: 0;
    right: 0;
    height: 35px;
    width: 35px;
    background-color: inherit;
    border-radius: 0 0 10px 0;
    z-index: -1;
  }
  .fab-container .fab .fab-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }
  .fab-container .fab .fab-content .material-icons {
    color: black;
    font-size: 12px;
  }
  .fab-container .fab .fab-content .material-icons:hover {
    color: white;
    font-size: 13px;
  }
  .fab-container .sub-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 10px;
    right: 10px;
    height: 50px;
    width: 50px;
    /* background-color: #4ba2ff; */
    background-color: paleturquoise;
    border-radius: 50%;
    transition: all 0.3s ease;
    opacity: 0; /* Semi-transparent before hover */
    transition: opacity 0.3s ease-in-out;
  }
  .fab-container .sub-button:hover {
    cursor: pointer;
    background-color: aquamarine;
    
  }
  .fab-container .sub-button .material-icons {
    color: black;
    padding-top: 6px;
  }

  .fab-hidden {
    transform: translateX(100px); /* Moves it out of view */
    opacity: 0;
    pointer-events: none; /* Prevents interaction */
}

/* Hide Button (Left Arrow) */
#hide-fab {
    position: fixed;
    bottom: 35px;
    right: 0px;
    /* background-color: #ff4b4b; */
    background-color: #4ba2ff;
    border: none;
    /* border-radius: 50%; */
    height: 50px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}
#hide-fab:hover {
    color: white;
}

/* Show Button (Right Arrow) */
#show-fab {
    position: fixed;
    bottom: 35px;
    right: 0px;
    /* background-color: #4ba2ff; */
    background-color: #4ba2ff;
    border: none;
    /* border-radius: 50%; */
    height: 50px;
    width: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;
}
#show-fab:hover {
    color: white;
}

#show-fab.visible {
    opacity: 1;
    pointer-events: all;
}

#hide-fab.visible {
    opacity: 0;
    pointer-events: none;
}
</style>