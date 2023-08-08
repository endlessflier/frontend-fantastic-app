import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import IconButton from '~/components/IconButton';
import { fetchActivities, patchActivities } from '~/api';
import PhoneItem from '~/components/PhoneItem';
import Detail from '../detail';
import { PHONE_DIR } from '~/constant';
import styles from './Activity.module.css';

function Activity() {
  const [activities, setActivites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailedId, setDetailedId] = useState(null);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchActivities();
      const filtered = result.filter((item) => !item.archived && item.from);
      const sorted = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setActivites(sorted);
      setIsLoading(false);
      setUpdated(false);
    };

    if (updated) {
      fetchData();
    }
  }, [updated]);

  const handleArchiveAll = async () => {
    setIsLoading(true);
    await patchActivities(activities, true);
    setUpdated(true);
  };

  if (isLoading) {
    return (
      <div className={styles.root}>
        <Icon.RefreshCw className={styles.loading} />
      </div>
    );
  }

  if (detailedId) {
    return <Detail id={detailedId} onClose={() => setDetailedId(null)} />;
  }

  return (
    <div className={styles.root}>
      <IconButton
        startIcon={<Icon.Archive />}
        className={styles.button}
        onClick={handleArchiveAll}
      >
        Archive all calls
      </IconButton>
      <div className={styles.activityContent}>
        {activities.map((activity) => (
          <PhoneItem
            key={activity.id}
            type={activity.callType}
            inbound={activity.direction === PHONE_DIR.inbound}
            from={activity.from}
            to={activity.to}
            createdAt={activity.createdAt}
            onClick={() => setDetailedId(activity.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Activity;
