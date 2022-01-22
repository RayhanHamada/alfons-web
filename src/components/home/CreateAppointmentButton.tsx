import { Button } from 'antd';
import { useRouter } from 'next/router';
import type { MouseEventHandler } from 'react';

export const CreateAppointmentButton: React.FC = (_props) => {
  const router = useRouter();

  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await router.push('/createAppointment');
  };

  return (
    <Button type="primary" size="large" onClick={onClick}>
      Make an Appointment
    </Button>
  );
};
