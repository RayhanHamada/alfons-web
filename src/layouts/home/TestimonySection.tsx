import { ReviewCard } from '@/components/home/ReviewCard';
import { Col, Layout, Row, Typography } from 'antd';

const { Title, Text } = Typography;

export const TestimonySection: React.FC = (_props) => {
  return (
    <Layout
      style={{ width: '100%', padding: '25px', backgroundColor: '#f2f2f2' }}
    >
      <Col
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'auto',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#DFB726' }}>
            Our Customers Reviews
          </Title>
          <Text style={{ fontSize: '1.3em' }}>
            The moments we&lsquo;re giving them the best experience...
          </Text>
        </div>

        <Row
          justify="space-around"
          style={{ padding: '50px 50px', rowGap: '30px' }}
        >
          <Col>
            <ReviewCard
              avatar="https://joeschmoe.io/api/v1/random"
              reviewer="Lady A"
              description="Great services, professional and friendly staff. This place applies a strict covid 19 protocol so i feel safe to have a treatment in there. My go to stylist for cut and hair coloring is with mas Haris."
              rate={5}
            />
          </Col>
          <Col>
            <ReviewCard
              avatar="https://joeschmoe.io/api/v1/random"
              reviewer="Shinta M"
              description="One of the best beauty parlor in town! Staffs professional, helpful and hospitable."
              rate={4}
            />
          </Col>
          <Col>
            <ReviewCard
              avatar="https://joeschmoe.io/api/v1/random"
              reviewer="Greg S"
              description="Nice haircut. Quite pricy but worth it"
              rate={5}
            />
          </Col>
        </Row>
      </Col>
    </Layout>
  );
};
