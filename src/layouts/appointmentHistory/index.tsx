import useDetailStore from '@/hooks/useDetailStore';
import { dayjs } from '@/utility/dayjs';
import supabaseClient from '@/utility/supabaseClient';
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Table,
  TableColumnsType,
  Typography,
} from 'antd';
import { MouseEventHandler, useEffect, useState } from 'react';
import DetailDrawer from './DetailDrawer';

type TableDataType = {
  id: number;
  cabang_name: string;
  stylish_name: string;
  tanggal: string;
  pukul: string;
  status: 'CANCEL' | 'SELESAI' | 'AKAN DATANG';
};

const { Title, Text } = Typography;

const columns: TableColumnsType<TableDataType> = [
  {
    title: 'Nama Cabang',
    dataIndex: 'cabang_name',
  },
  {
    title: 'Nama Stylish',
    dataIndex: 'stylish_name',
  },
  {
    title: 'Tanggal',
    dataIndex: 'tanggal',
    render: (v: string) => (
      <Text>{dayjs(v, 'YYYY-MM-DD').format('dddd, DD MMMM YYYY')}</Text>
    ),
  },
  {
    title: 'Jam',
    dataIndex: 'pukul',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (v: string) => <b>{v}</b>,
  },
  {
    title: 'Aksi',
    dataIndex: 'id',
    render: (value: number, record) => {
      const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        useDetailStore.getState().setAppointmentId(record.id);
        useDetailStore.getState().toggleDrawer();
      };

      return <Button onClick={onClick}>Detail</Button>;
    },
  },
];

const AppointmentHistory: React.FC = (_props) => {
  const [klienData, setKlienData] = useState<{
    id: number;
    name: string;
    phoneNumber: string;
    jenisKelamin: 'PRIA' | 'WANITA';
  }>();

  const [appointment, setAppointment] = useState<TableDataType[]>([]);

  useEffect(() => {
    (async () => {
      if (klienData) {
        const { error: selectError, data: selectData } = await supabaseClient
          .from('appointment')
          .select(
            'id, klien_id, date, cancel, jam(pukul), stylish(name), cabang(name)'
          )
          .eq('klien_id', klienData.id);

        if (selectError || !selectData) {
          await message.error(
            'Gagal mengambil data appointment anda, silahkan coba lagi',
            1
          );
          return;
        }

        const mappedAppointment = selectData.map<TableDataType>((v) => ({
          id: v.id,
          cabang_name: 'name' in v.cabang ? v.cabang.name : '',
          pukul: 'pukul' in v.jam ? v.jam.pukul : '',
          stylish_name: 'name' in v.stylish ? v.stylish.name : '',
          tanggal: v.date,
          status:
            dayjs(
              `${v.date} ${'pukul' in v.jam ? v.jam.pukul : ''}`,
              'YYYY-MM-DD HH:mm'
            ) > dayjs()
              ? 'AKAN DATANG'
              : v.cancel
              ? 'CANCEL'
              : 'SELESAI',
        }));

        setAppointment(mappedAppointment);
      }
    })();
  }, [klienData]);

  const onSearch = async (v: string) => {
    const { error, data } = await supabaseClient
      .from('klien')
      .select('*')
      .eq('phone_number', v)
      .maybeSingle();

    if (error) {
      await message.error('Gagal mengambil data anda, silahkan coba lagi !', 1);
      return;
    }

    if (!data) {
      await message.info(
        'Data tidak ditemukan. Pastikan nomor yang dimasukkan benar.',
        1
      );
      return;
    }

    setKlienData({
      id: data.id,
      name: data.name,
      jenisKelamin: data.jenis_kelamin,
      phoneNumber: data.phone_number,
    });
  };

  return (
    <Col style={{ paddingLeft: 200, paddingRight: 200, paddingTop: 50 }}>
      <Title level={3}>Lihat History Appointment</Title>
      <br />
      <Form layout="vertical">
        <Form.Item name="phoneNumber" label="Cari Berdasarkan Nomor Telepon">
          <Input.Search placeholder="Nomor Telepon Anda" onSearch={onSearch} />
        </Form.Item>
      </Form>
      {klienData ? (
        <Text>
          Histori pelayanan untuk{' '}
          <b>
            {klienData.jenisKelamin === 'PRIA' ? 'Tn' : 'Ny'}. {klienData.name}
          </b>
          :
        </Text>
      ) : undefined}
      <br />
      <Table columns={columns} dataSource={appointment} />
      <br />
      <DetailDrawer />
    </Col>
  );
};

export default AppointmentHistory;
