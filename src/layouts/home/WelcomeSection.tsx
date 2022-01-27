import { CreateAppointmentButton } from '@/components/home/CreateAppointmentButton';
import { Col, Layout, Typography } from 'antd';
import Image from 'next/image';
import photo from 'public/girl-large.jpg';

export const WelcomeSection: React.FC = (_props) => {
  return (
    <Layout>
      <div style={{ position: 'relative' }}>
        <Col
          style={{
            position: 'absolute',
            zIndex: 2,
            padding: '10% 10% 5% 5%',
            width: '100%',
          }}
        >
          <Typography.Title
            level={2}
            style={{
              position: 'relative',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Welcome to Alfons Salon
          </Typography.Title>

          <Typography.Text
            style={{
              fontSize: '1.2em',
              color: 'white',
            }}
          >
            Professionnal Salon dengan produk dari L&lsquo;oreal dan
            K&lsquo;erastase, melayani Gunting, Blow, Creambath, Manicure,
            Padicure, Make Up, Nail Polish Gel, Eyelash Extension, dll.
          </Typography.Text>
          <br />
          <br />
          <CreateAppointmentButton />
        </Col>
        <div style={{ position: 'relative' }}>
          <Image
            src={photo}
            objectFit="cover"
            height="2500px"
            layout="responsive"
            objectPosition="center top"
            alt="girl"
            priority
          />
        </div>
      </div>
    </Layout>
  );
};
