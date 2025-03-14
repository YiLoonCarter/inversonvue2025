<template>
    <div id="pie-container" class="text-center">
        <h1 v-bind:style="{ display: hasError ? 'none' : 'block' }">Transaction Statistics</h1>
        <svg id="pie-chart"></svg>
        <div id="tooltip" class="tooltip-chart"></div>
      </div>
</template>
<script>

export default {
    data() {
        return {
            // turnOffLoading: false,
            pieUrl:
                "https://api.sheety.co/8f2d0776cec55794d25d35becbdcfc1d/appData/transaction",
            pieData: [],
            // pieData: [
            //     {"cifName":"Yi Loon", "noOfTransaction": 2},
            //     {"cifName":"Soon Ee", "noOfTransaction": 3}
            // ],
            pieWidth: 500,
            pieHeight: 500,
            pieRadius: 240,
            hasError: false,
        };
    },
    mounted(){
        this.fetchData();
    },
    methods: {
        // async fetchData() {
        fetchData() {
            try {
                // const response = await fetch(this.pieUrl);
                // const data = await response.json();
                //this.pieData = data.transaction;
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
                        // this.$nextTick(() => {
                        //     this.turnOffLoading = true;
                        // });
                    }else{
                        this.hasError = false;
                        this.pieData = this.groupByCifName(data.transaction);
                        this.drawChart();
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
        groupByCifName(data) {
            const groupedData = {};
            
            data.forEach((item) => {
                if (groupedData[item.cifName]) {
                groupedData[item.cifName] += 1;
                } else {
                groupedData[item.cifName] = 1;
                }
            });
            
            return Object.keys(groupedData).map((key) => ({
                cifName: key,
                noOfTrx: groupedData[key],
            }));
        },
        drawChart() {
            const color = d3.scaleOrdinal(d3.schemeSet2);
            const svg = d3
                .select("#pie-chart")
                .attr("width", this.pieWidth)
                .attr("height", this.pieHeight)
                .append("g")
                .attr(
                "transform",
                `translate(${this.pieWidth / 2}, ${this.pieHeight / 2})`
                );

            // const pie = d3.pie().value((d) => d.lcAmt);
            const pie = d3.pie().value((d) => d.noOfTrx);
            const arc = d3.arc().innerRadius(0).outerRadius(this.pieRadius);
            const arcHover = d3.arc().innerRadius(0).outerRadius(this.pieRadius + 10);

            svg
                .selectAll("path")
                .data(pie(this.pieData))
                .enter()
                .append("path")
                .attr("d", arc)
                .attr("fill", (d, i) => color(i))
                .attr("stroke", "#fff")
                .style("stroke-width", "2px")
                .style("cursor", "pointer")
                .on("mouseover", function (event, data) {
                d3.select(this).transition().duration(1000).attr("d", arcHover);
                d3.select("#tooltip")
                    .style("display", "block")
                    .style("left", event.pageX + 10 + "px")
                    .style("top", event.pageY - 10 + "px")
                    // .html(`Name: ${data.data.cifName} <br/>Amount: ${data.data.lcAmt}`);
                    .html(`Name: ${data.data.cifName} <br/>No of Transactions: ${data.data.noOfTrx}`);
                })
                .on("mouseout", function () {
                d3.select(this).transition().duration(1000).attr("d", arc);
                d3.select("#tooltip").style("display", "none");
                });
        },
    },
}
</script>
<style>
    .tooltip-chart {
        background-color: white;
        border: 1px solid black;
        padding: 5px;
        /* this will be used later to show the tooltip on the chart */
        position: absolute; 
        /* hide the tooltip for a while */
        display: block;
    }
</style>