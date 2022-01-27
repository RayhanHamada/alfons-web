import useCabangStore from '@/hooks/useCabangStore';
import useDataDiri from '@/hooks/useDataDiriStore';
import useJamStylishStore from '@/hooks/useJamStylishStore';
import useServiceStore from '@/hooks/useServiceStore';
import useStepsStore from '@/hooks/useStepsStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import { Col, Layout, Row, Typography } from 'antd';
import Image from 'next/image';
import about from 'public/about.png';
import { useEffect } from 'react';

const { Title, Text } = Typography;

export const AboutSection: React.FC = (_props) => {
  const resetTanggal = useTanggalStore((store) => store.reset);
  const resetJamStylish = useJamStylishStore((store) => store.reset);
  const resetDataDiri = useDataDiri((store) => store.reset);
  const resetCabang = useCabangStore((store) => store.reset);
  const resetServiceStore = useServiceStore((store) => store.reset);
  const resetStep = useStepsStore((store) => store.reset);

  useEffect(() => {
    resetDataDiri();
    resetServiceStore();
    resetTanggal();
    resetCabang();
    resetJamStylish();
    resetStep();
  }, [
    resetCabang,
    resetDataDiri,
    resetJamStylish,
    resetServiceStore,
    resetStep,
    resetTanggal,
  ]);

  return (
    <Layout
      style={{
        background: 'linear-gradient(to bottom, #F2F2F2, #DEBE6D)',
        padding: '64px',
        height: '100%',
      }}
    >
      <Col style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#DFB726' }}>
            About Our Salon
          </Title>
        </div>
        <Row justify="space-around" style={{ alignItems: 'center' }}>
          <div style={{ borderRadius: '70px', overflow: 'clip' }}>
            <Image
              src={about}
              layout="fixed"
              objectFit="cover"
              width="350px"
              height="200px"
              alt="about"
            />
          </div>
          <div
            style={{
              width: '500px',
              flexDirection: 'column',
              height: '100%',
              minHeight: '100%',
            }}
          >
            <Text style={{ fontSize: '1.2em' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{' '}
            </Text>
          </div>
        </Row>
      </Col>
    </Layout>
  );
};
