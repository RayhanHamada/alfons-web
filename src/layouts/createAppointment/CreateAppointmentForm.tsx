import useCabangStore from '@/hooks/useCabangStore';
import useDataDiri from '@/hooks/useDataDiriStore';
import useJamStylishStore from '@/hooks/useJamStylishStore';
import useServiceStore from '@/hooks/useServiceStore';
import useStepsStore from '@/hooks/useStepsStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import checkExistedAppointment from '@/utility/api/checkExistedAppointment';
import createAppointment from '@/utility/api/createAppointment';
import { Button, Col, message, Row, Spin, Steps } from 'antd';
import { useRouter } from 'next/router';
import { MouseEventHandler, useState } from 'react';
import CabangForm from './CabangForm';
import DataDiriForm from './DataDiriForm';
import JamStylishForm from './JamStylishForm';
import ServiceForm from './ServiceForm';
import Summary from './Summary';
import TanggalForm from './TanggalForm';

const { Step } = Steps;

const CreateAppointmentForm: React.FC = (_props) => {
  const { tanggal } = useTanggalStore();
  const { klienId } = useDataDiri();
  const { cabangId } = useCabangStore();
  const { note, serviceIds } = useServiceStore();
  const { jamId, stylishId } = useJamStylishStore();
  const { step, canContinue, setCanContinue, incrementStep, decrementStep } =
    useStepsStore();

  const router = useRouter();

  const [freeze, setFreeze] = useState(false);

  const onContinueClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    incrementStep();

    // setiap kali user lanjut ke step selanjutnya nggak boleh lanjut lagi ke step selanjutnya
    // kecuali data di step itu sudah terisi.
    setCanContinue(false);
  };

  const onStepBackClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    decrementStep();
  };

  const onBuatAppointment: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setFreeze(true);
    // check apakah ada appointment dengan tanggal, cabang, stylish serupa
    const res = await checkExistedAppointment({
      tanggal: tanggal.format('MM/DD/YYYY'),
      jamId: jamId!.toString(),
      stylishId: stylishId!.toString(),
    });

    if (res.error) {
      await message.error('Gagal mengecek appointment', 1);
    } else {
      if (!res.exists) {
        await message.error(
          'Oops, sudah ada appointment dengan stylish dan jam yang sama, silahkan pilih kembali stylish atau jam yang lain',
          4
        );
      } else {
        // membuat appointment
        const res2 = await createAppointment({
          cabangId,
          jamId: jamId!,
          klienId: klienId!,
          tanggal: tanggal.format('MM/DD/YYYY'),
          stylishId: stylishId!,
          note,
          serviceIds,
        });

        if (!res2.ok) {
          await message.error(
            'Oops, terjadi kesalahan saat membuat appointment, silahkan ulangi kembali',
            4
          );
        } else {
          await message.success('Berhasil membuat appointment !', 1);
          // routing ke success page
          await router.replace('/successCreateAppointment');
        }
      }
    }

    setFreeze(false);
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
              <Button type="ghost" onClick={onStepBackClick} disabled={freeze}>
                Kembali
              </Button>
            ) : undefined}
            <div></div>
            {canContinue ? (
              step !== 5 ? (
                <Button
                  type="primary"
                  onClick={onContinueClick}
                  disabled={freeze}
                >
                  Lanjut
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={onBuatAppointment}
                  disabled={freeze}
                >
                  Buat Appointment ! {freeze ? <Spin spinning /> : ''}
                </Button>
              )
            ) : undefined}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default CreateAppointmentForm;
