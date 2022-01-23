import useCabangStore from '@/hooks/useCabangStore';
import useStepsStore from '@/hooks/useStepsStore';
import supabaseClient from '@/utility/supabaseClient';
import {
  Col,
  Form,
  message,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const CabangForm: React.FC = (_props) => {
  const [cabangs, setCabangs] = useState<{ id: number; name: string }[]>([]);
  const { setCabang, dataFilled, cabangId } = useCabangStore();
  const { setCanContinue } = useStepsStore();

  useEffect(() => {
    if (dataFilled) {
      setCanContinue(true);
    }
  }, [dataFilled, setCanContinue]);

  useEffect(() => {
    (async () => {
      const { data: cabangData, error: cabangError } = await supabaseClient
        .from('cabang')
        .select('id, name');

      if (!cabangData || cabangError) {
        await message.error('Gagal mengambil data cabang', 1);
        return;
      }

      setCabangs(cabangData);
    })();
  }, []);

  const onRadioChange = (e: RadioChangeEvent) => {
    setCabang(parseInt(e.target.value));
  };

  return (
    <>
      <Col style={{ width: '100%', alignItems: 'center' }}>
        <Row justify="space-between">
          <Title level={4}>Pilih Lokasi Service</Title>
        </Row>
        <Form
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <Title level={5} style={{ textAlign: 'center' }}>
            Kami Tersedia Di {cabangs.length} Tempat Berbeda
          </Title>
          <br />
          <Form.Item name="Cabang" initialValue={cabangId}>
            <Radio.Group onChange={onRadioChange}>
              {cabangs.map((c) => (
                <Radio key={c.id} value={c.id}>
                  {c.name}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Col>
    </>
  );
};

export default CabangForm;
