import { Layout as AntdLayout } from 'antd';
import { FooterLayout } from './FooterLayout';
import { NavbarLayout } from './NavbarLayout';

const { Content } = AntdLayout;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <AntdLayout style={{ background: 'white' }}>
        <NavbarLayout />
        <Content>{children}</Content>
        <FooterLayout />
      </AntdLayout>
    </>
  );
};
