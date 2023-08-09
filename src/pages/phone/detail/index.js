import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { fetchActivity } from '~/api';
import styles from './Detail.module.css';

const datetimeOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};
const formattedDateTime = (inputDate) =>
  new Intl.DateTimeFormat('en-US', datetimeOptions).format(inputDate);

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function Detail({ id, onClose }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchDetail = async () => {
      const result = await fetchActivity(id);
      setData(result);
    };

    if (id) {
      fetchDetail();
    }
  }, [id]);

  if (!data) {
    return (
      <div className={styles.root}>
        <Icon.RefreshCw className={styles.loading} />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <Icon.ChevronLeft className={styles.backButton} onClick={onClose} />
      <span>Detailed View</span>
      <div className={styles.content}>
        <Row label="Call Type" value={data.callType} />
        <Row label="From" value={data.from} />
        <Row label="To" value={data.to} />
        <Row label="Via" value={data.via} />
        <Row label="Duration" value={formatTime(data.duration)} />
        <Row label="Called Time" value={formattedDateTime(new Date(data.createdAt))} />
        <Row label="Direction" value={data.direction} />
      </div>
    </div>
  );
}

const Row = ({ label, value }) => {
  return (
    <div className={styles.row}>
      <h3>{label}</h3>
      <span>{value}</span>
    </div>
  );
};

export default Detail;
