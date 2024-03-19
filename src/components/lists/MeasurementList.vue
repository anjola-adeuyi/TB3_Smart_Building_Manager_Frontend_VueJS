<template>
  <div class="measurement-list">
    <h2>Measurement Upload</h2>
    <div class="upload-section">
      <input
        type="file"
        class="btn btn-primary"
        @change="handleFileUpload"
      />
    </div>

    <div
      v-if="error"
      class="error-message"
    >
      {{ error }}
    </div>

    <div
      class="time-range"
      v-if="measurements.length > 0"
    >
      <div class="time-card">
        <div class="card-title">Earliest Time</div>
        <div class="card-content">{{ earliestTime }}</div>
      </div>
      <div class="time-card">
        <div class="card-title">Oldest Time</div>
        <div class="card-content">{{ oldestTime }}</div>
      </div>
    </div>

    <div
      v-if="measurements.length > 0"
      class="chart-container"
    >
      <canvas ref="chartCanvas"></canvas>
    </div>

    <h2>Measurements</h2>
    <div
      v-if="measurements.length > 0"
      class="measurements-table"
    >
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Temperature (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(measurement, index) in measurements"
            :key="measurement.id"
          >
            <td>{{ measurement.id }}</td>
            <td>{{ formatTime(measurement.parsedTime) }}</td>
            <td>{{ measurement.temperature }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { API_HOST } from '../../config';
import Chart from 'chart.js/auto';

export default {
  name: 'MeasurementList',
  data() {
    return {
      measurements: [],
      error: null,
      earliestTime: '',
      oldestTime: '',
    };
  },
  created() {
    this.fetchMeasurementData();
    this.fetchTimeRange();
  },
  methods: {
    async handleFileUpload(event) {
      this.error = null;
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        // Upload CSV file to the backend API
        await axios.post(`${API_HOST}/api/sensor/upload`, formData);

        // Fetch measurement data after upload
        this.fetchMeasurementData();
      } catch (error) {
        console.error('Error uploading file:', error);
        this.error = 'An error occurred while uploading measurements.';
      }
    },
    async fetchMeasurementData() {
      this.error = null;
      try {
        // Fetch measurement data from the backend API
        const response = await axios.get(`${API_HOST}/api/sensor/measurements`);
        this.measurements = response.data;

        // eslint-disable-next-line no-console
        console.log({ measurements: this.measurements });
        console.log({ response: response.data });

        // Visualize measurement data
        this.visualizeData();
      } catch (error) {
        console.error('Error fetching measurement data:', error);
        // this.error = 'An error occurred while fetching measurements.';
      }
    },
    visualizeData() {
      // Prepare data for Chart.js
      const labels = this.measurements.map((measurement) => measurement.parsedTime);
      const temperatures = this.measurements.map((measurement) => parseFloat(measurement.temperature));

      // Create a line chart using Chart.js
      const ctx = this.$refs.chartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Temperature',
              data: temperatures,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Time',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Temperature (°C)',
              },
            },
          },
        },
      });
    },
    formatTime(time) {
      const parsedTime = new Date(time);
      return parsedTime.toLocaleString(); // Customize the format as needed
    },
    async fetchTimeRange() {
      try {
        const response = await axios.get(`${API_HOST}/api/sensor/time-range`);
        this.earliestTime = response.data.earliestTime;
        this.oldestTime = response.data.oldestTime;
      } catch (error) {
        console.error('Error fetching time range:', error);
      }
    },
  },
  mounted() {
    this.fetchMeasurementData();
  },
};
</script>

<style>
.upload-section {
  display: flex;
  gap: 10px;
}
.measurements-table {
  padding: 4px;
  border: 1px solid #ccc;
}
.chart-container {
  width: 100%;
  min-height: 400px;
}
.error-message {
  color: red;
}

/* Oldest and Earliest Time */

.time-range {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.time-card {
  width: calc(50% - 10px);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-title {
  font-weight: bold;
  margin-bottom: 10px;
}
.card-content {
  font-size: 16px;
}

/* Additional CSS styles for table */
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
</style>
