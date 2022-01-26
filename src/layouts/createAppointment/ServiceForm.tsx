import useServiceStore from '@/hooks/useServiceStore';
import useStepsStore from '@/hooks/useStepsStore';
import supabaseClient from '@/utility/supabaseClient';
import { numberFormat } from '@/utility/util';
import { Button, Col, Input, List, message, Row, Typography } from 'antd';
import {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import ServiceDrawer from './ServiceDrawer';

type DataType = { id: number; name: string; cost_estimate: number };

const { Title, Text } = Typography;

const ServiceForm: React.FC = (_props) => {
  const {
    serviceIds,
    dataFilled,
    toggleDrawer,
    removeServiceId,
    setNote,
    note,
  } = useServiceStore();
  const { setCanContinue } = useStepsStore();
  const [orderedService, setOrderedService] = useState<DataType[]>([]);

  useEffect(() => {
    if (dataFilled) {
      setCanContinue(true);
      return;
    }
    setCanContinue(false);
  }, [dataFilled, setCanContinue]);

  useEffect(() => {
    (async () => {
      const { data: selectData, error: selectError } = await supabaseClient
        .from('service')
        .select('id, name, cost_estimate')
        .in('id', serviceIds);

      if (selectError || !selectData) {
        await message.error('Gagal mengambil data service', 1);
        return;
      }

      setOrderedService(selectData);
    })();
  }, [serviceIds]);

  const onTambahServiceClick: MouseEventHandler<HTMLButtonElement> = (_e) => {
    toggleDrawer();
  };

  const onNoteChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setNote(e.target.value);
  };

  return (
    <>
      <Col style={{ width: '100%', alignItems: 'center' }}>
        <Row justify="space-between">
          <Title level={4}>Pilih Service</Title>
          <Button onClick={onTambahServiceClick}>Tambahkan Service</Button>
        </Row>
        <br />
        <List.Item>
          <List.Item.Meta title={<Text>Nama Service</Text>} />
          <Row justify="space-between">
            <div>Perkiraan Harga</div>

            <Button
              type="ghost"
              size="small"
              danger
              style={{ marginLeft: 20, visibility: 'hidden' }}
            >
              Hapus
            </Button>
          </Row>
        </List.Item>
        <hr />
        <List
          itemLayout="horizontal"
          dataSource={orderedService}
          renderItem={(service, i) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Text>
                    {i + 1}. *{service.name}
                  </Text>
                }
              />
              <Row justify="space-between">
                <div>{numberFormat(service.cost_estimate)}</div>

                <Button
                  type="ghost"
                  size="small"
                  danger
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    removeServiceId(service.id);
                  }}
                >
                  Hapus
                </Button>
              </Row>
            </List.Item>
          )}
        />
        <hr />
        {orderedService.length !== 0 ? (
          <List.Item>
            <List.Item.Meta
              title="Total Perkiraan Harga"
              description={
                <small>
                  *Ini adalah perkiraan harga, harga sebenarnya akan bergantung
                  pada ukuran rambut anda, jenis produk, dan pertimbangan lain
                  dari pihak salon.
                </small>
              }
            />
            <Row justify="space-between">
              <div>
                {numberFormat(
                  orderedService
                    .map((os) => os.cost_estimate)
                    .reduce((p, c) => p + c, 0)
                )}
              </div>
              <Button
                type="ghost"
                size="small"
                danger
                style={{ marginLeft: 20, visibility: 'hidden' }}
              >
                Hapus
              </Button>
            </Row>
          </List.Item>
        ) : undefined}
        <br />
        <Title level={4}>Catatan</Title>
        <Input.TextArea
          rows={5}
          placeholder="Warna Cat yang diinginkan, Ukuran rambut anda, Apa saja yang anda perlu katakan kepada stylish anda..."
          onChange={onNoteChange}
          value={note}
        />
        <br />
        <br />
      </Col>
      <ServiceDrawer />
    </>
  );
};

export default ServiceForm;
