import useCabangStore from '@/hooks/useCabangStore';
import useDataDiri from '@/hooks/useDataDiriStore';
import useJamStylishStore from '@/hooks/useJamStylishStore';
import useServiceStore from '@/hooks/useServiceStore';
import useStepsStore from '@/hooks/useStepsStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import supabaseClient from '@/utility/supabaseClient';
import { numberFormat } from '@/utility/util';
import { Col, message, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const Summary: React.FC = (_props) => {
  const { name, jenisKelamin } = useDataDiri();
  const { cabangId } = useCabangStore();
  const { jamId, stylishId } = useJamStylishStore();
  const { serviceIds } = useServiceStore();
  const { tanggal } = useTanggalStore();
  const { setCanContinue } = useStepsStore();

  useEffect(() => {
    setCanContinue(true);
  }, [setCanContinue]);

  const [summary, setSummary] = useState({
    cabangName: '',
    stylishName: '',
    pukul: '',
    services: [] as { name: string; cost_estimate: number }[],
    totalCostEstimate: 0,
  });

  useEffect(() => {
    (async () => {
      const { error: selectCabangError, data: selectCabangData } =
        await supabaseClient
          .from('cabang')
          .select('id, name')
          .eq('id', cabangId)
          .maybeSingle();

      if (selectCabangError || !selectCabangData) {
        await message.error('Gagal mengambil data Cabang.', 1);
        return;
      }

      const { error: selectStylishError, data: selectStylishData } =
        await supabaseClient
          .from('stylish')
          .select('id, name')
          .eq('id', stylishId!)
          .maybeSingle();

      if (selectStylishError || !selectStylishData) {
        await message.error('Gagal mengambil data Stylish.', 1);
        return;
      }

      const { error: selectJamError, data: selectJamData } =
        await supabaseClient
          .from('jam')
          .select('id, pukul')
          .eq('id', jamId!)
          .maybeSingle();

      if (selectJamError || !selectJamData) {
        await message.error('Gagal mengambil data Jam.', 1);
        return;
      }

      const { error: selectServiceError, data: selectServiceData } =
        await supabaseClient
          .from('service')
          .select('id, name, cost_estimate')
          .in('id', serviceIds);

      if (selectServiceError || !selectServiceData) {
        await message.error('Gagal mengambil data service.', 1);
        return;
      }

      setSummary({
        cabangName: selectCabangData.name,
        pukul: selectJamData.pukul,
        stylishName: selectStylishData.name,
        services: selectServiceData.map(({ name, cost_estimate }) => ({
          name,
          cost_estimate,
        })),
        totalCostEstimate: selectServiceData.reduce(
          (p, c) => p + c.cost_estimate,
          0
        ),
      });
    })();
  }, [cabangId, stylishId, jamId, serviceIds]);

  return (
    <>
      <Col style={{ width: '100%', alignItems: 'center' }}>
        <Title level={4} style={{ textAlign: 'center' }}>
          Summary
        </Title>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Nama</Text>
          <Text>
            <b>
              {jenisKelamin === 'PRIA' ? 'Tn.' : 'Ny.'} {name}
            </b>
          </Text>
        </Row>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Cabang</Text>
          <Text>
            <b>{summary.cabangName}</b>
          </Text>
        </Row>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Stylish</Text>
          <Text>
            <b>{summary.stylishName}</b>
          </Text>
        </Row>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Tanggal</Text>
          <Text>
            <b>{tanggal.format('dddd, DD MMMM YYYY')}</b>
          </Text>
        </Row>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Pukul</Text>
          <Text>
            <b>{summary.pukul}</b>
          </Text>
        </Row>
        <br />
        <Col style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}>
          <Text>Service</Text>
          <ul>
            {summary.services.map((s) => (
              <li key={s.name}>
                <Row justify="space-between">
                  <Text>{s.name}</Text>
                  <Text>{numberFormat(s.cost_estimate)}</Text>
                </Row>
              </li>
            ))}
          </ul>
        </Col>
        <br />
        <Row
          style={{ width: '100%', paddingLeft: 200, paddingRight: 200 }}
          justify="space-between"
        >
          <Text>Total Perkiraan Harga</Text>
          <Text>
            <b>{numberFormat(summary.totalCostEstimate)}</b>
          </Text>
        </Row>
      </Col>
    </>
  );
};

export default Summary;
