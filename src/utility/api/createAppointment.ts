import { Body, Response } from '@/types/api/createAppointment';
import { PostCaller } from '@/types/ky';
import ky from '@/utility/ky';

const createAppointment: PostCaller<Body, Response> = (json) =>
  ky.post('createAppointment', {
    json,
  });

export default createAppointment;
