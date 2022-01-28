import useDetailStore from '@/hooks/useDetailStore';
import supabaseClient from '@/utility/supabaseClient';
import { numberFormat } from '@/utility/util';
import { Drawer, List, message, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Text } = Typography;

const DetailDrawer: React.FC = (_props) => {
  const { isDrawerOpen, toggleDrawer, appointmentId, reset } = useDetailStore();
  const [orderedServices, setOrderedServices] = useState<
    { name: string; cost_estimate: number }[]
  >([]);

  useEffect(() => {
    (async () => {
      if (appointmentId) {
        const { error, data } = await supabaseClient
          .from('rendered_service')
          .select('appointment_id, service(name, cost_estimate)')
          .eq('appointment_id', appointmentId);

        if (error || !data) {
          await message.error('Gagal mengambil detil appointment.', 1);
          return;
        }

        const mappedService = data.map((v) => ({
          name: 'name' in v.service ? v.service.name : '',
          cost_estimate:
            'cost_estimate' in v.service ? v.service.cost_estimate : 0,
        }));

        setOrderedServices(mappedService);
      }
    })();
  }, [appointmentId]);

  return (
    <Drawer
      title="Detail Appointment"
      size="large"
      visible={isDrawerOpen}
      onClose={() => {
        toggleDrawer();
        reset();
      }}
    >
      <List.Item>
        <List.Item.Meta title={<Text>Nama Service</Text>} />
        <Row justify="space-between">
          <div>Perkiraan Harga</div>
        </Row>
      </List.Item>
      <List
        itemLayout="horizontal"
        dataSource={orderedServices}
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
            </Row>
          </List.Item>
        )}
      />
      <hr />
      <List.Item>
        <List.Item.Meta title="Total Perkiraan Harga" />
        <Row justify="space-between">
          <div>
            {numberFormat(
              orderedServices
                .map((os) => os.cost_estimate)
                .reduce((p, c) => p + c, 0)
            )}
          </div>
        </Row>
      </List.Item>
    </Drawer>
  );
};

export default DetailDrawer;
