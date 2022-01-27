import useJamStylishStore from '@/hooks/useJamStylishStore';
import useTanggalStore from '@/hooks/useTanggalStore';
import supabaseClient from '@/utility/supabaseClient';
import { Button, Col, message, Typography } from 'antd';
import { useRouter } from 'next/router';
import React, { MouseEventHandler, useEffect, useState } from 'react';

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

  const router = useRouter();

  const onClickToHome: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await router.replace('/');
  };

  return (
    <Col
      style={{
        width: '100%',
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 60,
      }}
    >
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
      <br />
      <Button onClick={onClickToHome}>Ke Halaman Beranda</Button>
      <br />
      <br />
    </Col>
  );
};

export default SuccessCreateAppointmentLayout;
