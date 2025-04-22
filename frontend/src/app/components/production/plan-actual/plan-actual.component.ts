import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js'; // Import Chart from chart.js

@Component({
  selector: 'app-plan-actual',
  templateUrl: './plan-actual.component.html',
  styleUrls: ['./plan-actual.component.scss']
})
export class PlanActualComponent implements OnInit {
    data: any;
    options: any;
    randomNumber: number; // Property to hold the random number

    // Define the custom plugin for drawing text in the center (same as before)
    private centerTextPlugin: any = {
        id: 'centerText', // A unique ID for your plugin
        afterDraw(chart: any, args: any, pluginOptions: any) {
            const { ctx, chartArea } = chart;

            ctx.save(); // Save the current context state

            // Calculate the center of the chart area
            const centerX = (chartArea.left + chartArea.right) / 2;
             const adjustedCenterY = (chartArea.top + chartArea.bottom) / 2 + (pluginOptions.yOffset || 20);


            // Set text properties
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; // Align text baseline to the middle for perfect vertical centering
            // Use the font size passed in the plugin options, default if not provided
            ctx.font = `${pluginOptions.fontSize || '40'}px sans-serif`;
            // Use the color passed in the plugin options, default to black if not provided
            ctx.fillStyle = pluginOptions.color || 'black';

            // Get the text to display from the plugin options
            const text = pluginOptions.text;

            // Draw the text if it exists
            if (text !== undefined && text !== null) {
                 ctx.fillText(text, centerX, adjustedCenterY); // Use adjusted Y coordinate
            }

            ctx.restore(); // Restore the context state
        }
    };

    // Register the plugin when the component is initialized (same as before)
    constructor() {
        if (typeof Chart !== 'undefined' && !(Chart.registry.plugins.get(this.centerTextPlugin.id))) {
            Chart.register(this.centerTextPlugin);
            // console.log("Center text plugin registered."); // Optional log
        }
    }


    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        // --- Generate the random number ---
        this.randomNumber = Math.floor(Math.random() * 1000); // Generate a number between 0 and 999

        // --- Start: Data setup for half-doughnut (MODIFIED - NO DUMMY DATA) ---

        // Your actual data values (NO DUMMY DATA NEEDED)
        const actualDataValues = [300, 50, 100]; // Example values: Planned, Actual, Difference
        const actualDataLabels = ['Planned', 'Pending', 'Idle']; // Example labels

        // Data arrays only contain the actual data values and labels now
        const chartDataValues = actualDataValues;
        const chartDataLabels = actualDataLabels;

        // Define colors for your actual data (same as before)
        const dataColors = [
             documentStyle.getPropertyValue('--blue-500'),
             documentStyle.getPropertyValue('--yellow-500'),
             documentStyle.getPropertyValue('--indigo-500')
        ];
        const dataHoverColors = [
             documentStyle.getPropertyValue('--blue-400'),
             documentStyle.getPropertyValue('--yellow-400'),
             documentStyle.getPropertyValue('--indigo-400')
        ];

        // The colors arrays also only contain colors for the actual data now
        const chartDataColors = dataColors;
        const chartDataHoverColors = dataHoverColors;


        this.data = {
            labels: chartDataLabels,
            datasets: [
                {
                    data: chartDataValues,
                    backgroundColor: chartDataColors,
                    hoverBackgroundColor: chartDataHoverColors,
                    borderWidth: 0 // Keep this to remove borders around segments
                }
            ]
        };
        // --- End: Data setup ---


        // --- Options setup (MODIFIED - circumference and removed filters) ---
        this.options = {
            cutout: '80%', // Keep the hole size

            // *** Set circumference to 180 degrees (half circle) ***
            circumference: 180,
            rotation: -90,

            // maintainAspectRatio: true, // Keep based on your size requirements
            maintainAspectRatio: false, // Often set to false for gauges to control height independently

            plugins: { // This is the object for configuring REGISTERED plugins
                legend: {
                    labels: {
                        color: textColor
                    }
                },
                 tooltip: {
                    enabled: true
                 },
                 // --- Configure your custom center text plugin here ---
                 centerText: { // Use the plugin ID as the key
                      text: this.randomNumber.toString(), // Pass the number as a string
                      fontSize: 40, // Optional: specify font size
                      color: textColor,
                      yOffset: 20
                 }
            },
        };
    }
}
