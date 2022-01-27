import { Query, Response } from '@/types/api/checkExistedAppointment';
import supabaseServer from '@/utility/supabaseServer';
import { NextApiHandler } from 'next';

const checkExistedAppointment: NextApiHandler<Response> = async (req, res) => {
  const { tanggal, stylishId, jamId } = req.query as Query;

  const { error, count } = await supabaseServer
    .from('appointment')
    .select('id, date, stylishId, jamId', { count: 'exact' })
    .eq('date', tanggal)
    .eq('stylishId', stylishId)
    .eq('jamId', jamId);

  if (error || count === null) {
    res.json({ exists: false, error: 'Failed' });
    return;
  }

  res.json({ exists: count > 0 });
};

export default checkExistedAppointment;
