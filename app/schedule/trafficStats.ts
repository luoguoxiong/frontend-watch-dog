import { Context, Application } from 'egg';

export default (app:Application) => {
  return {
    schedule: {
      cron: app.config.trafficStatsScheduleMin,
      type: 'all',
      disable: false,
      immediate: true,
    },
    async task(ctx:Context) {
      ctx.service.trafficStats.getTrafficStatsMinutes();
    },
  };
};

