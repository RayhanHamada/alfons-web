import { Row, Steps } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

type OnStepsChange = (current: number) => void;

const CreateAppointmentForm: React.FC = (_props) => {
  const [step, setStep] = useState(1);
  const onStepsChange: OnStepsChange = (c) => {
    setStep(c);
  };

  return (
    <div style={{ width: '100%', height: '100vh', padding: '100px' }}>
      <Row justify="start">
        <Steps
          direction="vertical"
          size="small"
          current={step}
          onChange={onStepsChange}
        >
          <Step title="Isi Data Diri" />
          <Step title="Pilih Cabang" />
          <Step title="Pilih Service" />
          <Step title="Pilih Pilih Tanggal" />
          <Step title="Pilih Stylish dan Jam" />
          <Step title="Summary" />
        </Steps>
      </Row>
    </div>
  );
};

export default CreateAppointmentForm;
