import { Row, Steps } from 'antd';
import { useState } from 'react';
import DataDiriForm from './DataDiriForm';

const { Step } = Steps;

type OnStepsChange = (current: number) => void;

const CreateAppointmentForm: React.FC = (_props) => {
  const [step, setStep] = useState(0);
  const onStepsChange: OnStepsChange = (c) => {
    setStep(c);
  };

  return (
    <div style={{ height: '100vh', padding: '100px' }}>
      <Row justify="start" wrap={false}>
        <div>
          <Steps
            direction="vertical"
            size="small"
            current={step}
            onChange={onStepsChange}
            style={{ width: '300px' }}
          >
            <Step title="Isi Data Diri" />
            <Step title="Pilih Cabang" />
            <Step title="Pilih Service" />
            <Step title="Pilih Pilih Tanggal" />
            <Step title="Pilih Stylish dan Jam" />
            <Step title="Summary" />
          </Steps>
        </div>
        <div style={{ width: '100%' }}>
          {step === 0 ? <DataDiriForm /> : undefined}
        </div>
      </Row>
    </div>
  );
};

export default CreateAppointmentForm;
