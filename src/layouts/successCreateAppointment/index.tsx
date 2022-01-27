import useJamStylishStore from '@/hooks/useJamStylishStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import supabaseClient from '@/utility/supabaseClient';
import { Col, message, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

export const SuccessCreateAppointmentLayout: React.FC = (_props) => {
  const { tanggal } = useTanggalStore();
  const { jamId } = useJamStylishStore();
  const [pukul, setPukul] = useState<string>();

  useEffect(() => {
    (async () => {
      const { error, data } = await supabaseClient
        .from('jam')
        .select('*')
        .eq('id', jamId!)
        .maybeSingle();

      if (error || !data) {
        await message.error('Gagal mengambil data jam', 1);
        return;
      }

      setPukul(data.pukul);
    })();
  }, [jamId]);

  return (
    <Col style={{ width: '100%' }}>
      <Title level={2}>Terimakasih !</Title>
      <br />
      <Title level={4}>Permintaan janji temu anda telah dikirim.</Title>
      <br />
      <Title level={4}>
        Kami akan menghubungi anda pada hari{' '}
        {tanggal.format('dddd, DD MMMM YYYY')}
      </Title>
      <br />
      <Title level={4}>Harap datang 15 menit sebelum jam {pukul}</Title>
    </Col>
  );
};

export default SuccessCreateAppointmentLayout;
