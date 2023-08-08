import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import IconButton from '~/components/IconButton';
import { fetchActivities, patchActivities } from '~/api';
import PhoneItem from '~/components/PhoneItem';
import Detail from '../detail';
import { PHONE_DIR } from '~/constant';
import styles from './Archive.module.css';

function Archive() {
  const [archives, setArchives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [detailedId, setDetailedId] = useState(null);
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchActivities();
      const filtered = result.filter((item) => item.archived && item.from);
      const sorted = filtered.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setArchives(sorted);
      setIsLoading(false);
      setUpdated(false);
    };

    if (updated) {
      fetchData();
    }
  }, [updated]);

  const handleUnarchiveAll = async () => {
    setIsLoading(true);
    await patchActivities(archives, false);
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
        startIcon={<Icon.RotateCcw />}
        className={styles.button}
        onClick={handleUnarchiveAll}
      >
        Unarchive all calls
      </IconButton>
      <div className={styles.content}>
        {archives.map((item) => (
          <PhoneItem
            key={item.id}
            type={item.callType}
            inbound={item.direction === PHONE_DIR.inbound}
            from={item.from}
            to={item.to}
            createdAt={item.createdAt}
            onClick={() => setDetailedId(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Archive;
