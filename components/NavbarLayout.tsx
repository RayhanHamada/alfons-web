import { Layout } from 'antd';
import { Brand } from './Brand';

const { Header } = Layout;

export const NavbarLayout: React.FC = (_props) => {
  return (
    <Header
      style={{
        backgroundColor: '#FFFFFF',
        opacity: '100%',
        margin: '0 auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Brand />
    </Header>
  );
};
