<template>
    <div id="pie-container" class="text-center chart-container" v-bind:style="{ display: hasError ? 'none' : 'flex' }">
        <div>
            <h1 v-bind:style="{ display: hasError ? 'none' : 'block' }">Transactions by Count</h1>
            <svg id="pie-chart-count" ></svg>
            <div id="tooltip-count" class="tooltip-chart"></div>
        </div>
        <div>
            <h1 v-bind:style="{ display: hasError ? 'none' : 'block' }">Transactions by LC Amount</h1>
            <svg id="pie-chart-amount"></svg>
            <div id="tooltip-amount" class="tooltip-chart"></div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            pieUrl:
                "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction",
            pieData: [],
            listData: [],
            // listData: [
            // {
            //     "srcBrn": "1000",
            //     "prcBrn": "1000",
            //     "refNo": "1000001",
            //     "refType": "LLC",
            //     "cifName": "YTL Export Corp.",
            //     "cifNo": "1800002",
            //     "currType": "USD",
            //     "trxStatus": "FullApp",
            //     "lcType": "NLC",
            //     "lcAmt": "8000.00",
            //     "docIndex": "A1000006",
            //     "appDate": "2025-03-19",
            //     "appRcpDate": "2025-03-12",
            //     "issDate": "2025-03-20",
            //     "expDate": "2025-03-19",
            //     "id": 2
            // },
            // {
            //     "srcBrn": "1000",
            //     "prcBrn": "1001",
            //     "refNo": "1000002",
            //     "refType": "LLC",
            //     "cifName": "Trade Import Corp.",
            //     "cifNo": "1800001",
            //     "currType": "USD",
            //     "trxStatus": "FullApp",
            //     "lcType": "NLC",
            //     "lcAmt": "16000.00",
            //     "docIndex": "A1000002",
            //     "appDate": "2025-03-06",
            //     "appRcpDate": "2025-03-06",
            //     "issDate": "2025-03-06",
            //     "expDate": "2025-03-14",
            //     "id": 3
            // },
            // {
            //     "srcBrn": "1000",
            //     "prcBrn": "1001",
            //     "refNo": "1000003",
            //     "refType": "LLC",
            //     "cifName": "Trade Import Corp.",
            //     "cifNo": "1800001",
            //     "currType": "USD",
            //     "trxStatus": "FullApp",
            //     "lcType": "NLC",
            //     "lcAmt": "80000.00",
            //     "docIndex": "A1000002",
            //     "appDate": "2025-03-06",
            //     "appRcpDate": "2025-03-06",
            //     "issDate": "2025-03-06",
            //     "expDate": "2025-03-14",
            //     "id": 4
            // },
            // ],
            pieWidth: 500,
            pieHeight: 500,
            pieRadius: 240,
            hasError: false,
            pieDataCount: [],
            pieDataAmount: [],
        };
    },
    mounted(){
        this.fetchData();
    },
    methods: {
        fetchData() {
            try {
                fetch(this.pieUrl,
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
                        toastr.error(data.errors[0].detail, "Error - Pie Chart");
                        this.hasError = true;
                        this.pieDataCount = this.groupByCifNameCount(this.listData);
                        this.pieDataAmount = this.groupByCifNameAmount(this.listData);
                        this.drawChart("pie-chart-count", this.pieDataCount, 
                        "count", "tooltip-count");
                        this.drawChart("pie-chart-amount", this.pieDataAmount, 
                        "amount", "tooltip-amount");
                    }else{
                        this.hasError = false;
                        this.listData = data.transaction;
                        // this.pieData = this.groupByCifName(this.listData);
                        this.pieDataCount = this.groupByCifNameCount(this.listData);
                        this.pieDataAmount = this.groupByCifNameAmount(this.listData);
                        // this.drawChart();
                        this.drawChart("pie-chart-count", this.pieDataCount, 
                        "count", "tooltip-count");
                        this.drawChart("pie-chart-amount", this.pieDataAmount, 
                        "amount", "tooltip-amount");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    toastr.options.closeButton = true;
                    toastr.options.progressBar = true;
                    toastr.error(err, "Error - Pie Chart");
                    this.hasError = true;
                    this.$nextTick(() => {
                        this.turnOffLoading = true;
                    });
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                this.hasError = true;
            }
        },
        groupByCifNameCount(data) {
            const groupedData = {};
            
            // data.forEach((item) => {
            //     if (groupedData[item.cifName]) {
            //     groupedData[item.cifName] += 1;
            //     } else {
            //     groupedData[item.cifName] = 1;
            //     }
            // });
            data.forEach((item) => {
                groupedData[item.cifName] = (groupedData[item.cifName] || 0) + 1;
            });
            
            return Object.keys(groupedData).map((key) => ({
                cifName: key,
                count: groupedData[key],
            }));
        },
        groupByCifNameAmount(data) {
            const groupedData = {};
            data.forEach((item) => {
                groupedData[item.cifName] = (groupedData[item.cifName] || 0) + parseFloat(item.lcAmt);
            });
            return Object.keys(groupedData).map((key) => ({
                cifName: key,
                amount: groupedData[key],
            }));
        },
        // drawChart() {
        drawChart(elementId, data, valueKey, tooltipChartEl) {
            const colorScheme = elementId === "pie-chart-count" ? d3.schemeSet2 : d3.schemePastel1; // Different color sets
            const color = d3.scaleOrdinal(colorScheme);
            const svg = d3
                // .select("#pie-chart")
                .select(`#${elementId}`)
                .attr("width", this.pieWidth)
                .attr("height", this.pieHeight)
                .append("g")
                .attr(
                "transform",
                `translate(${this.pieWidth / 2}, ${this.pieHeight / 2})`
                );
            
            // const pie = d3.pie().value((d) => d.noOfTrx);
            const pie = d3.pie().value((d) => d[valueKey]);
            const arc = d3.arc().innerRadius(0).outerRadius(this.pieRadius);
            const arcHover = d3.arc().innerRadius(0).outerRadius(this.pieRadius + 10);

            svg
                .selectAll("path")
                .data(pie(data))
                // .data(pie(this.pieData))
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .attr("stroke", "#fff")
                .style("stroke-width", "2px")
                .style("cursor", "pointer")
                .on("mouseover", function (event, d) {
                    d3.select(this).transition().duration(1000).attr("d", arcHover);
                    d3.select(`#${tooltipChartEl}`)
                    .style("display", "block")
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 10 + "px")
                    .html(valueKey === "amount" ? 
                    `Name: ${d.data.cifName}<br>Amount: ${d3.format(",.2f")(d.data.amount)}` 
                    : `Name: ${d.data.cifName}<br>Count: ${d.data.count}`);
                    // .html(`${d.data.cifName}: ${d.data[valueKey]}`);
                    // .html(`Name: ${data.data.cifName} <br/>No of Transactions: ${data.data.noOfTrx}`);
                })
                .on("mouseout", function () {
                    d3.select(this).transition().duration(1000).attr("d", arc);
                    d3.select(`#${tooltipChartEl}`).style("display", "none");
                });
        },
        formatAmount(amount) {
            if (amount == null) return "0.00"; // Handle undefined or null values
            return new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            .format(amount);
        },
    },
}
</script>
<style>
    .tooltip-chart {
        background-color: #224FAF;
        border: 1px solid transparent;
        padding: 5px;
        /* this will be used later to show the tooltip on the chart */
        position: absolute; 
        /* hide the tooltip for a while */
        display: block;
        font-weight: bold;
        font-style: italic;
        color: white;
    }

    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px; /* Space between charts */
        margin-top: 20px;
    }
</style>