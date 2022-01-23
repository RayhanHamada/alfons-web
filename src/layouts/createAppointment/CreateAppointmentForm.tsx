import useStepsStore from '@/hooks/useStepsStore';
import { Button, Col, Row, Steps } from 'antd';
import { MouseEventHandler } from 'react';
import DataDiriForm from './DataDiriForm';
import ServiceForm from './ServiceForm';

const { Step } = Steps;

const CreateAppointmentForm: React.FC = (_props) => {
  const { step, canContinue, setCanContinue, incrementStep, decrementStep } =
    useStepsStore();

  const onContinueClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    incrementStep();

    // setiap kali user lanjut ke step selanjutnya nggak boleh lanjut lagi ke step selanjutnya
    // kecuali data di step itu sudah terisi.
    setCanContinue(false);
  };

  return (
    <Col style={{ height: '100vh', padding: '100px' }}>
      <Row justify="start" wrap={false}>
        <div>
          <Steps
            direction="vertical"
            size="small"
            current={step}
            style={{ width: '300px' }}
          >
            <Step title="Isi Buku Tamu" />
            <Step title="Pilih Service" />
            <Step title="Pilih Cabang dan Tanggal" />
            <Step title="Pilih Stylish dan Jam" />
            <Step title="Summary" />
          </Steps>
        </div>
        <Col style={{ width: '100%' }}>
          {step === 0 ? (
            <DataDiriForm />
          ) : step === 1 ? (
            <ServiceForm />
          ) : undefined}
          <Row justify="end">
            {canContinue ? (
              <Button type="primary" onClick={onContinueClick}>
                Continue
              </Button>
            ) : undefined}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CreateAppointmentForm;
