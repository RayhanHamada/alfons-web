import useCabangStore from '@/hooks/useCabangStore';
import useJamStylishStore from '@/hooks/useJamStylishStore';
import useStepsStore from '@/hooks/useStepsStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import { dayjs } from '@/utility/dayjs';
import supabaseClient from '@/utility/supabaseClient';
import { Col, Form, message, Select, Typography } from 'antd';
import { useEffect, useState } from 'react';

type Hari =
  | 'senin'
  | 'selasa'
  | 'rabu'
  | 'kamis'
  | 'jumat'
  | 'sabtu'
  | 'minggu';

const { Title } = Typography;
const JamStylishForm: React.FC = (_props) => {
  const { cabangId } = useCabangStore();
  const { tanggal } = useTanggalStore();
  const { stylishId, jamId, dataFilled, setStylishId, setJamId } =
    useJamStylishStore();
  const { setCanContinue } = useStepsStore();
  const [availableStylish, setAvailableStylish] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const [availableJam, setAvailableJam] = useState<
    {
      id: number;
      pukul: string;
    }[]
  >([]);

  useEffect(() => {
    if (dataFilled) {
      setCanContinue(true);
    }
    console.log(dataFilled);
  }, [dataFilled, setCanContinue]);

  useEffect(() => {
    (async () => {
      const { error: selectStylishError, data: selectStylishData } =
        await supabaseClient
          .from('stylish')
          .select('*')
          .eq('cabang_id', cabangId)
          .eq(
            `${tanggal.format('dddd').toLowerCase() as Hari}_available`,
            true
          );

      if (selectStylishError || !selectStylishData) {
        await message.error('Gagal Mengambil data stylish');
        return;
      }

      const stylish = selectStylishData.map((v) => ({
        name: v.name,
        id: v.id,
      }));
      setAvailableStylish(stylish);
    })();
  }, [cabangId, tanggal, stylishId, jamId]);

  useEffect(() => {
    (async () => {
      if (stylishId) {
        /**
         * ambil data appointment pada tanggal x, cabang y dan stylish z.
         */
        const { error: selectAppointmentError, data: selectAppointmentData } =
          await supabaseClient
            .from('appointment')
            .select('*')
            // pada cabang ini
            .eq('cabang_id', cabangId)
            // oleh stylish ini
            .eq('stylish_id', stylishId)
            // pada tanggal ini
            .eq('date', tanggal.format('MM/DD/YYYY'))
            .eq('cancel', false);

        if (selectAppointmentError || !selectAppointmentData) {
          await message.error(
            'Gagal mengambil data appointment. Silahkan ulangi pendaftaran',
            1
          );
          return;
        }

        const orderedJamIds = selectAppointmentData.map((d) => d.jam_id);

        // ambil data jam
        const { data: selectJamData, error: selectJamError } =
          await supabaseClient
            .from('jam')
            .select('*')
            .eq('cabang_id', cabangId);

        if (selectJamError || !selectJamData) {
          await message.error('Gagal mengambil data jam', 1);
          return;
        }

        /**
         * filter untuk jam yang belum di order dan hanya ambil id dan pukulnya
         */
        let filteredJam = selectJamData
          .filter((jam) => !orderedJamIds.includes(jam.id))
          .map(({ pukul, id }) => ({ id, pukul }));

        /**
         * jika tanggal adalah hari ini, maka hanya jam2 1 jam kedepan atau lebih yang dapat dipilih
         */
        if (tanggal.startOf('day').isSame(dayjs().startOf('day'))) {
          filteredJam = filteredJam.filter(
            (j) => dayjs().hour() < dayjs(j.pukul, 'HH:mm').hour()
          );
        }

        setAvailableJam(filteredJam);
      }
    })();
  }, [stylishId, cabangId, tanggal, jamId]);

  const onStylishChange = (v: number) => {
    setStylishId(v);
  };

  const onJamChange = (v: number) => {
    setJamId(v);
    console.log(`jam changed ${v}`);
  };

  return (
    <>
      <Col>
        <Title level={4}>
          Pilih Stylish dan Jam kehadiran yang anda inginkan.
        </Title>
        <br />
        <Form layout="vertical" style={{ width: 400 }}>
          {availableStylish.length !== 0 ? (
            <Form.Item name="stylish" label="Pilih Stylish" required>
              <Select
                options={availableStylish.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                onChange={onStylishChange}
              />
            </Form.Item>
          ) : undefined}

          {stylishId ? (
            <Form.Item name="jam" label="Pilih Jam" required>
              <Select
                options={availableJam.map((s) => ({
                  label: s.pukul,
                  value: s.id,
                }))}
                onChange={onJamChange}
              />
            </Form.Item>
          ) : undefined}
        </Form>
      </Col>
    </>
  );
};

export default JamStylishForm;
