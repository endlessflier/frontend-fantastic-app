import * as Icon from 'react-feather';
import styles from './PhoneItem.module.css';
import { CALL_TYPE, PHONE_DIR } from '~/constant';

const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
const timeOptions = { hour: 'numeric', minute: 'numeric' };
const formattedDateTime = (inputDate, options) =>
  new Intl.DateTimeFormat('en-US', options).format(inputDate);

const formattedTime = (inputDate) => {
  const inputTime = formattedDateTime(inputDate, timeOptions);
  const timeOnly = inputTime.split(' ')[0];
  const [hours, minutes] = timeOnly.split(':').map((part) => part.padStart(2, '0'));
  const time = `${hours}:${minutes}`;
  const ampm = inputTime.split(' ')[1];
  return { time, ampm };
};

function PhoneItem({ type, inbound, from, to, createdAt, onClick }) {
  return (
    <div className={styles.root} onClick={onClick}>
      <div className={styles.date}>
        <span>{formattedDateTime(new Date(createdAt), dateOptions)}</span>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          {type === CALL_TYPE.missed && <Icon.PhoneMissed className={styles.missed} />}
          {type === CALL_TYPE.answered && (
            <>
              {inbound === PHONE_DIR.inbound ? (
                <Icon.PhoneIncoming className={styles.answered} />
              ) : (
                <Icon.PhoneOutgoing className={styles.answered} />
              )}
            </>
          )}
          {type === CALL_TYPE.voicemail && <Icon.Voicemail />}
          <div>
            <span>{to}</span>
            <div>
              tried to call on <span>{from}</span>
            </div>
          </div>
        </div>
        <div className={styles.time}>
          <Icon.MoreVertical />
          <span>{formattedTime(new Date(createdAt)).time}</span>
          <span className={styles.ampm}>{formattedTime(new Date(createdAt)).ampm}</span>
        </div>
      </div>
    </div>
  );
}

export default PhoneItem;
