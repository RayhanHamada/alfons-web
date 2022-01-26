import useStepsStore from '@/hooks/useStepsStore';
import { Button, Col, Row, Steps } from 'antd';
import { MouseEventHandler } from 'react';
import CabangForm from './CabangForm';
import DataDiriForm from './DataDiriForm';
import JamStylishForm from './JamStylishForm';
import ServiceForm from './ServiceForm';
import Summary from './Summary';
import TanggalForm from './TanggalForm';

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

  const onStepBackClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    decrementStep();
  };

  return (
    <Col style={{ padding: '100px' }}>
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
            <Step title="Pilih Cabang" />
            <Step title="Pilih Tanggal" />
            <Step title="Pilih Stylish dan Jam" />
            <Step title="Summary" />
          </Steps>
        </div>
        <Col style={{ width: '100%' }}>
          {step === 0 ? (
            <DataDiriForm />
          ) : step === 1 ? (
            <ServiceForm />
          ) : step === 2 ? (
            <CabangForm />
          ) : step === 3 ? (
            <TanggalForm />
          ) : step === 4 ? (
            <JamStylishForm />
          ) : (
            <Summary />
          )}
          <br />
          <Row justify="space-between">
            {step !== 0 ? (
              <Button type="ghost" onClick={onStepBackClick}>
                Kembali
              </Button>
            ) : undefined}
            <div></div>
            {canContinue ? (
              <Button type="primary" onClick={onContinueClick}>
                Lanjut
              </Button>
            ) : undefined}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CreateAppointmentForm;
