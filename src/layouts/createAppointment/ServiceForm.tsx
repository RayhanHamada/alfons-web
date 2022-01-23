import useServiceStore from '@/hooks/useServiceStore';
import useStepsStore from '@/hooks/useStepsStore';
import supabaseClient from '@/utility/supabaseClient';
import { numberFormat } from '@/utility/util';
import { Button, Col, List, message, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title } = Typography;

const ServiceForm: React.FC = (_props) => {
  const { serviceIds, dataFilled } = useServiceStore();
  const { setCanContinue } = useStepsStore();
  const [orderedService, setOrderedService] = useState<
    { id: number; name: string; cost_estimate: number }[]
  >([]);

  useEffect(() => {
    if (dataFilled) {
      setCanContinue(true);
    }
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

  return (
    <Col style={{ width: '100%', alignItems: 'center' }}>
      <Row justify="space-between">
        <Title level={4}>Pilih Service</Title>
        <Button>Tambahkan Service</Button>
      </Row>
      <hr />
      <List
        itemLayout="horizontal"
        dataSource={orderedService}
        renderItem={(service) => (
          <List.Item>
            <List.Item.Meta title={service.name} />
            <div>{numberFormat(service.cost_estimate)}</div>
          </List.Item>
        )}
      />
      {orderedService.length !== 0 ? (
        <List.Item>
          <List.Item.Meta title="Total Perkiraan Harga" />
          <div>
            {numberFormat(
              orderedService
                .map((os) => os.cost_estimate)
                .reduce((p, c) => p + c, 0)
            )}
          </div>
        </List.Item>
      ) : undefined}
    </Col>
  );
};

export default ServiceForm;
