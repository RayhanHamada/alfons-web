import useDataDiriStore from '@/hooks/useDataDiriStore';
import useStepsStore from '@/hooks/useStepsStore';
import supabaseClient from '@/utility/supabaseClient';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { useForm } = Form;

type FormValue = {
  phoneNumber: string;
  name: string;
  jenisKelamin: 'PRIA' | 'WANITA';
};

const DataDiriForm: React.FC = (_props) => {
  const [form] = useForm<FormValue>();
  const [isBaru, setIsBaru] = useState(false);
  const [finishRegister, setFinishRegister] = useState(false);
  const [freeze, setFreeze] = useState(false);

  const {
    name,
    jenisKelamin,
    isChecked,
    phoneNumber,
    dataFilled,
    setDataDiri,
    reset,
    setIsChecked,
    setId,
  } = useDataDiriStore();
  const { setCanContinue } = useStepsStore();

  useEffect(() => {
    if (dataFilled) {
      setCanContinue(true);
    }
  }, [dataFilled, setCanContinue]);

  const onCariNomorHp = async (value: string) => {
    // jika user re input nomor hp
    setIsBaru(false);
    setCanContinue(false);

    if (value === '') {
      message.error('Nomor Handphone harus diisi !');
      setIsChecked(false);
      reset();
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
      const { jenis_kelamin, name, phone_number, id } = checkData;
      setId(id);
      setDataDiri({
        name,
        jenisKelamin: jenis_kelamin,
        phoneNumber: phone_number,
      });

      setCanContinue(true);
    }

    console.log(checkData);

    setIsChecked(true);
  };

  const onDaftarClicked = async (v: FormValue) => {
    const { name, jenisKelamin: jenis_kelamin, phoneNumber: phone_number } = v;

    if (name === '') {
      await message.error('Name cannot be empty', 1);
      return;
    }
    setFreeze(true);

    // insert data ke table klien
    const { data: insertData, error: insertError } = await supabaseClient
      .from('klien')
      .insert({
        name,
        jenis_kelamin,
        phone_number,
      })
      .maybeSingle();

    if (insertError || !insertData) {
      await message.error(
        'Terjadi kegagalan, silahkan refresh dan coba mendaftar lagi',
        1
      );
    } else {
      await message.success('Sukses', 1);
      setId(insertData.id);
      setDataDiri({
        name: insertData.name,
        jenisKelamin: insertData.jenis_kelamin,
        phoneNumber: insertData.phone_number,
      });

      setFinishRegister(true);
      setIsBaru(false);
      setCanContinue(true);
    }

    setFreeze(false);
  };

  return (
    <Col style={{ width: '100%', alignItems: 'center' }}>
      <Title level={4}>Isi Buku Tamu</Title>
      <br />
      <Form form={form} layout="vertical" onFinish={onDaftarClicked}>
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
              disabled={freeze}
              value={phoneNumber}
            />
          </Form.Item>
        </Row>
        {isChecked ? (
          isBaru ? (
            <Title level={5}>
              Nama anda belum terdaftar, untuk melanjutkan pendaftaran silahkan
              isi data diri berikut !
            </Title>
          ) : (
            <Title level={4}>
              Selamat Datang {finishRegister ? '' : 'Kembali'},
              {` ${jenisKelamin === 'PRIA' ? 'Tn.' : 'Ny.'} ${name}`}
            </Title>
          )
        ) : undefined}
        {isBaru ? (
          <>
            <Form.Item label="Nama Lengkap" name="name" required>
              <Input type="text" disabled={freeze} />
            </Form.Item>
            <Form.Item
              label="Jenis Kelamin"
              name="jenisKelamin"
              initialValue="WANITA"
              required
            >
              <Radio.Group disabled={freeze}>
                <Radio value="PRIA">Pria</Radio>
                <Radio value="WANITA">Wanita</Radio>
              </Radio.Group>
            </Form.Item>
            <Button type="primary" htmlType="submit" disabled={freeze}>
              {!freeze ? (
                'Daftar !'
              ) : (
                <>
                  <Spin spinning /> Sedang mendaftarkan...
                </>
              )}
            </Button>
          </>
        ) : undefined}
      </Form>
    </Col>
  );
};

export default DataDiriForm;
