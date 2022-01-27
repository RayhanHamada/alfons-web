import { Button } from 'antd';
import Link from 'next/link';

const AppointmentHistoryButton: React.FC = (_props) => {
  return (
    <Link href="/appointmentHistory" passHref>
      <Button type="ghost" size="middle" style={{ color: 'white' }}>
        Lihat Histori Appointment Saya
      </Button>
    </Link>
  );
};

export default AppointmentHistoryButton;
