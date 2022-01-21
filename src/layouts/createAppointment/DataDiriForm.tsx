import useDataDiri from '@/hooks/useDataDiri';
import supabaseClient from '@/utility/supabaseClient';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Typography,
} from 'antd';
import { useState } from 'react';

const { Title, Text } = Typography;
const { useForm } = Form;

type FormValue = {
  phoneNumber: string;
  name: string;
  jenisKelamin: 'PRIA' | 'WANITA';
};

const DataDiriForm: React.FC = (_props) => {
  const [form] = useForm<FormValue>();
  const [isChecked, setIsChecked] = useState(false);
  const [isBaru, setIsBaru] = useState(false);
  const [finishRegister, setFinisRegister] = useState(false);

  // untuk klien lama
  const [klienLamaName, setKlienLamaName] = useState<string>();

  const {} = useDataDiri();

  const onCariNomorHp = async (value: string) => {
    if (value === '') {
      message.error('Nomor Handphone harus diisi !');
      return;
    }

    const { error: errorCheck, data: checkData } = await supabaseClient
      .from('klien')
      .select('*')
      .eq('phone_number', value)
      .maybeSingle();

    if (errorCheck) {
      message.error('Gagal mengecek data, silahkan ulangi pengisian form !');
      return;
    }

    if (!checkData) {
      setIsBaru(true);
    } else {
      const { jenis_kelamin, name } = checkData;
      setKlienLamaName(`${jenis_kelamin === 'PRIA' ? 'Tn.' : 'Ny.'} ${name}`);
    }

    console.log(checkData);

    setIsChecked(true);
  };

  const onFinish = (v: FormValue) => {
    console.log(v);
  };

  return (
    <Col style={{ width: '100%', alignItems: 'center' }}>
      <Title level={4}>Isi Buku Tamu</Title>
      <br />
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row align="stretch">
          <Form.Item<FormValue>
            label="Nomor HP"
            name="phoneNumber"
            style={{ width: '300px' }}
            required
          >
            <Input.Search
              allowClear
              type="tel"
              placeholder="Nomor HP Anda"
              onSearch={onCariNomorHp}
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </Form.Item>
        </Row>
        {isChecked ? (
          isBaru ? (
            <Title level={5}>
              Halo, untuk melanjutkan pendaftaran silahkan isi data diri berikut
              !
            </Title>
          ) : (
            <Title level={4}>
              Selamat Datang {finishRegister ? '' : 'Kembali'}, {klienLamaName}
            </Title>
          )
        ) : undefined}
        {isBaru ? (
          <>
            <Form.Item label="Nama" required>
              <Input type="text" />
            </Form.Item>
            <Form.Item
              label="Jenis Kelamin"
              name="jenisKelamin"
              initialValue="WANITA"
              required
            >
              <Radio.Group>
                <Radio value="PRIA">Pria</Radio>
                <Radio value="WANITA">Wanita</Radio>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Daftar !
            </Button>
          </>
        ) : undefined}
      </Form>
    </Col>
  );
};

export default DataDiriForm;
