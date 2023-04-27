type TimeType = {
  hours: number;
  minutes: number;
  seconds: number;
};
const timeConverter = (n: number): TimeType => {
  const hours = Math.floor(n / (1000 * 60 * 60));
  const minutes = Math.floor((n - hours * 3600 * 1000) / (1000 * 60));
  const seconds = Math.floor((n - minutes * 60 * 1000) / 1000);
  return { hours, minutes, seconds };
};

const getNiceTimeString = (time: TimeType) => {
  return `${time.hours > 9 ? time.hours : "0" + time.hours}:${
    time.minutes > 9 ? time.minutes : "0" + time.minutes
  }:${time.seconds > 9 ? time.seconds : "0" + time.seconds}`;
};

export { timeConverter, getNiceTimeString };
