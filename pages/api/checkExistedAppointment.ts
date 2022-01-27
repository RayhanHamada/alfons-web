import { Query, Response } from '@/types/api/checkExistedAppointment';
import supabaseServer from '@/utility/supabaseServer';
import { NextApiHandler } from 'next';

const checkExistedAppointment: NextApiHandler<Response> = async (req, res) => {
  const { tanggal, stylishId, jamId } = req.query as Query;

  const { error, count } = await supabaseServer
    .from('appointment')
    .select('id, date, stylish_id, jam_id', { count: 'exact' })
    .eq('date', tanggal)
    .eq('stylish_id', parseInt(stylishId))
    .eq('jam_id', parseInt(jamId));

  if (error || count === null) {
    res.json({ exists: false, error: 'Failed' });
    console.log(error);

    return;
  }

  res.json({ exists: count > 0 });
};

export default checkExistedAppointment;
