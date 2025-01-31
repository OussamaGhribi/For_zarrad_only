import { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

function AdminDashboard() {
  const [earnings, setEarnings] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const salesData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 63, 75, 80],
        borderColor: '#4A90E2',
        backgroundColor: 'rgba(74, 144, 226, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ['Nike', 'Puma', 'Adidas', 'Zara', 'Levi', 'H&M'],
    datasets: [
      {
        label: 'Sales Distribution',
        data: [300, 500, 100, 150, 50, 30],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#2ECC71'],
        hoverOffset: 5,
      },
    ],
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/earnings')
      .then((response) => {
        setEarnings(response.data.earnings);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load earnings');
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="dashboard-grid p-3">
        <div className="card earnings-card">
          <h2>Total Earnings</h2>
          {loading ? (
            <div className="loading">
              <Spinner animation="border" variant="primary" />
              <span>Loading...</span>
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <p className="earnings-amount">${(earnings / 1000).toFixed(2)}</p>
          )}
        </div>
      </div>
      <div className='flex'>
          <div className="card chart-card m-3">
            <h2>Monthly Sales</h2>
            <Line data={salesData} />
          </div>

          <div className="card chart-card m-3">
            <h2>Sales Distribution</h2>
            <Pie data={pieChartData}/>
          </div>
        </div>
    </div>
  );
}

export default AdminDashboard;
