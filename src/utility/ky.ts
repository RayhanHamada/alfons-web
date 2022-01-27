import ogKy from 'ky';

const ky = ogKy.extend({
  prefixUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api`,
});

export default ky;
