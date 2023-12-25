import { Context, Application } from 'egg';

export default (app:Application) => {
  return {
    schedule: {
      cron: app.config.trafficStatsScheduleDay,
      type: 'all',
      disable: false,
      immediate: false,
    },
    async task(ctx:Context) {
      // ctx.service.trafficStats.getTrafficStatsDays();
      ctx.service.elasticsearch.trafficStats.getTrafficStatsDays();
    },
  };
};

