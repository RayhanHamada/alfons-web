import { Layout, Row, Typography } from 'antd';

const { Footer } = Layout;

const { Title, Text, Link } = Typography;

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
            <a
              style={{ color: 'black' }}
              href="https://goo.gl/maps/ZwAFJyJB3WwK87Dq8"
              target="_blank"
              rel="noreferrer"
            >
              Alfons Lotte Shopping Avenue
            </a>
            <br />
            <a
              style={{ color: 'black' }}
              href="https://goo.gl/maps/ufxLYGzZKB1kBdyAA"
              target="_blank"
              rel="noreferrer"
            >
              Alfons PIM
            </a>
            <br />
            <a
              style={{ color: 'black' }}
              href="https://goo.gl/maps/Y3EsiwGSWHaEP1H46"
              target="_blank"
              rel="noreferrer"
            >
              Alfons Panglima Polim
            </a>
          </div>
          <div style={{ flexDirection: 'column' }}>
            <Title level={4}>Company</Title>
            <Link style={{ color: 'black' }} href="/">
              About
            </Link>

            <br />
            <a
              style={{ color: 'black' }}
              href="https://m.facebook.com/profile.php?id=203503029677883"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <br />
            <a
              style={{ color: 'black' }}
              href="https://www.instagram.com/alfons_salon.id/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
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
          <Text>2021 Copyright Alfons Salon • All rights reserved</Text>
        </div>
      </div>
    </Footer>
  );
};
