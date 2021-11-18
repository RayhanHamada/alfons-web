import { Layout, Row, Typography } from 'antd';

const { Footer } = Layout;

const { Title, Text } = Typography;

const hari = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const FooterLayout: React.FC = (_props) => {
  return (
    <Footer style={{ padding: 'inherit 5%' }}>
      <div style={{ flexDirection: 'column' }}>
        <Row justify="space-between">
          <div style={{ flexDirection: 'column' }}>
            <Title level={4}>Contacts</Title>
            <Text>(021) 75920715</Text>
          </div>
          <div style={{ flexDirection: 'column' }}>
            <Title level={4}>Our Locations</Title>
            <Text>Alfons Lotte Shopping Avenue</Text>
            <br />
            <Text>Alfons PIM</Text>
            <br />
            <Text>Alfons Panglima Polim</Text>
          </div>
          <div style={{ flexDirection: 'column' }}>
            <Title level={4}>Company</Title>
            <Text>About</Text>
            <br />
            <Text>Careers</Text>
            <br />
            <Text>Facebook</Text>
            <br />
            <Text>Instagram</Text>
            <br />
            <Text>TikTok</Text>
          </div>
          <div style={{ flexDirection: 'column' }}>
            <Title level={4}>Business Hours</Title>

            {/* row dan col */}
            <Row justify="space-between" style={{ columnGap: '10px' }}>
              <div style={{ flexDirection: 'column' }}>
                {hari.map((h, i) => (
                  <>
                    <Text key={`${h}_1`}>{h}</Text>
                    <br key={`${h}_2`} />
                  </>
                ))}
              </div>
              <div style={{ flexDirection: 'column' }}>
                {Array(hari.length)
                  .fill(undefined)
                  .map((h, i) => (
                    <>
                      <Text key={`${h}_3`}>:</Text>
                      <br key={`${h}_4`} />
                    </>
                  ))}
              </div>
              <div style={{ flexDirection: 'column' }}>
                {Array(hari.length)
                  .fill(undefined)
                  .map((_v, i) => (
                    <>
                      <Text key={`${i}_5`}>11.00 - 20.00</Text>
                      <br key={`${i}_6`} />
                    </>
                  ))}
              </div>
            </Row>
          </div>
        </Row>

        {/* footer text */}
        <div style={{ textAlign: 'center', paddingTop: '30px' }}>
          <Text>Alfons Salon ©2021 Created by Kelompok 2 P3L 4IA12</Text>
        </div>
      </div>
    </Footer>
  );
};
