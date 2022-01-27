import { Body } from '@/types/api/createAppointment';
import supabaseServer from '@/utility/supabaseServer';
import { NextApiHandler } from 'next';

const createAppointment: NextApiHandler = async (req, res) => {
  const { tanggal, cabangId, klienId, stylishId, jamId, note, serviceIds } =
    req.body as Body;

  const { error: insertAppointmentError, data: insertAppointmentData } =
    await supabaseServer
      .from('appointment')
      .insert({
        date: tanggal,
        cabang_id: cabangId,
        jam_id: jamId,
        klien_id: klienId,
        stylish_id: stylishId,
        note,
      })
      .maybeSingle();

  if (insertAppointmentError || !insertAppointmentData) {
    res.status(500).end();
    return;
  }

  const { error: insertRenderedServiceError, data: insertRenderedServiceData } =
    await supabaseServer.from('rendered_service').insert(
      serviceIds.map((id) => ({
        appointment_id: insertAppointmentData.id,
        service_id: id,
      }))
    );

  if (insertRenderedServiceError || !insertRenderedServiceData) {
    res.status(500).end();
    return;
  }
};

export default createAppointment;
