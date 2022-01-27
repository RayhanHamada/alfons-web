import ogKy from 'ky';

const ky = ogKy.extend({
  prefixUrl: `/api`,
});

export default ky;
