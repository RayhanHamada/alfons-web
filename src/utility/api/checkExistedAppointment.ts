import { Query, Response } from '@/types/api/checkExistedAppointment';
import ky from '@/utility/ky';

const checkExistedAppointment = async ({ tanggal, jamId, stylishId }: Query) =>
  await ky
    .get(
      `checkExistedAppointment?tanggal=${tanggal}&jamId=${jamId}&stylishId=${stylishId}`
    )
    .json<Response>();

export default checkExistedAppointment;
