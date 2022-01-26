import Calendar from '@/components/createAppointment/Calendar';
import useStepsStore from '@/hooks/useStepsStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import { dayjs } from '@/utility/dayjs';
import { Col, Typography } from 'antd';
import { useEffect } from 'react';

const { Title, Text } = Typography;

const TanggalForm: React.FC = (_props) => {
  const { tanggal, setTanggal } = useTanggalStore();
  const { setCanContinue } = useStepsStore();

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  return (
    <>
      <Col>
        <Title level={4}>Pilih Tanggal Kehadiran Anda</Title>
        <br />
        <div>
          <Calendar
            fullscreen={false}
            disabledDate={(date) => date.isBefore(dayjs().startOf('day'))}
            value={tanggal}
            onChange={(date) => setTanggal(date)}
          />
          <Text>
            Tanggal yang dipilih: <b>{tanggal.format('dddd, DD MMMM YYYY')}</b>
          </Text>
        </div>
      </Col>
    </>
  );
};

export default TanggalForm;
