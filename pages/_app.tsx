import '@/styles/antdstyles.less';
import type { AppProps } from 'next/app';
import { Layout } from '../layouts/CustomLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
