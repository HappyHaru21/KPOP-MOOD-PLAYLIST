import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip);

const MoodAnalytics = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const res = await axios.get('/api/moods'); // Fetch all moods from backend
        const moods = res.data;

        // Group moods by date and calculate average valence/arousal
        const groupedMoods = groupMoodsByDate(moods);

        // Prepare chart data points
        const dataPoints = Object.keys(groupedMoods).map((date) => ({
          x: groupedMoods[date].averageValence,
          y: groupedMoods[date].averageArousal,
          label: date, // Use date as a label for tooltips
        }));

        setChartData({
          datasets: [
            {
              label: 'Mood Spectrum',
              data: dataPoints,
              backgroundColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (err) {
        console.error('Error fetching mood data:', err);
      }
    };

    fetchMoods();
  }, []);

  return (
    <div>
      <h2>Mood Analytics</h2>
      {chartData ? (
        <Scatter
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label(context) {
                    return `Date: ${context.raw.label}, Valence: ${context.raw.x.toFixed(
                      2
                    )}, Arousal: ${context.raw.y.toFixed(2)}`;
                  },
                },
              },
              title: {
                display: true,
                text: 'Mood Spectrum (Valence vs Arousal)',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Valence (Positive-Negative)',
                },
                min: 0,
                max: 1,
              },
              y: {
                title: {
                  display: true,
                  text: 'Arousal (High-Low)',
                },
                min: 0,
                max: 1,
              },
            },
          }}
        />
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

// Helper function to group moods by date and calculate averages
const groupMoodsByDate = (moods) => {
  const moodScores = {
    happy: { valence: 0.8, arousal: 0.7 },
    excited: { valence: 0.9, arousal: 0.9 },
    calm: { valence: 0.6, arousal: 0.3 },
    neutral: { valence: 0.5, arousal: 0.5 },
    sad: { valence: 0.2, arousal: 0.3 },
    angry: { valence: 0.1, arousal: 0.8 },
    fearful: { valence: 0.1, arousal: 0.7 }
  };

  const grouped = {};

  moods.forEach((mood) => {
    const date = new Date(mood.date).toLocaleDateString(); // Group by date
    const moodData = moodScores[mood.mood.toLowerCase()] || { valence: 0.5, arousal: 0.5 }; // Default to neutral

    if (!grouped[date]) {
      grouped[date] = { totalValence: moodData.valence, totalArousal: moodData.arousal, count: 1 };
    } else {
      grouped[date].totalValence += moodData.valence;
      grouped[date].totalArousal += moodData.arousal;
      grouped[date].count += 1;
    }
  });

  // Calculate averages for each date
  Object.keys(grouped).forEach((date) => {
    grouped[date].averageValence = grouped[date].totalValence / grouped[date].count;
    grouped[date].averageArousal = grouped[date].totalArousal / grouped[date].count;
  });

  console.log('Grouped Moods:', grouped); // Debugging output

  return grouped;
};

export default MoodAnalytics;
