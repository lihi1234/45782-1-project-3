import React, { useEffect, useMemo } from 'react';
import VacationService from '../../services/auth-aware/VacationService';
import useService from '../../hooks/use-service';
import { init } from '../../redux/vacation-slice';
import { useAppDispatcher, useAppSelector } from '../../redux/hooks';
import './Report.css'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components for BAR CHARTS
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Report: React.FC = () => {
  const vacations = useAppSelector(state => state.vacationSlice.vacations);
  const dispatch = useAppDispatcher();
  const vacationService = useService(VacationService);

  useEffect(() => {
    (async () => {
      try {
        if (vacations.length === 0) {
          const vacationFromServer = await vacationService.getAllVacations();
          dispatch(init(vacationFromServer));
        }
      } catch (e) {
        alert(e);
      }
    })();
  }, [dispatch, vacationService, vacations.length]);

  // Memoized data to prevent "Canvas already in use" error
  const data = useMemo(() => ({
    labels: vacations.map((v) => v.destination),
    datasets: [
      {
        label: 'Number of Likes',
        data: vacations.map((v) => v.likes?.length ?? 0),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  }), [vacations]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Vacation Likes Bar Chart',
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // only whole numbers
        },
      },
    },
  }), []);



 
  function exportCSV() {
    // CSV header
    let csv = "Vacation, Likes\n";

    // Add each row
    vacations.forEach(v => {
      const name = v.destination.replace(/,/g, ""); // avoid CSV breaks
      const likes = v.likes?.length ?? 0;
      csv += `${name}, ${likes}\n`;
    });

    // Create a Blob file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Download link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "vacation-likes-report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

 



  return (
    <div className="Report">
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Vacation Likes Dashboard</h2>
      {vacations.length === 0 ? (
        <p>No vacations available</p>
      ) : (
        <Bar key={vacations.length} data={data} options={options} />
      )}

      
      <button  onClick={exportCSV}>
        Download CSV
      </button>
    </div>
    </div>

    
  );
};

export default Report;



