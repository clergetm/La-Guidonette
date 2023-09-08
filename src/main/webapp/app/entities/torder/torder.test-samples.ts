import dayjs from 'dayjs/esm';

import { Status } from 'app/entities/enumerations/status.model';

import { ITorder, NewTorder } from './torder.model';

export const sampleWithRequiredData: ITorder = {
  id: 73921,
};

export const sampleWithPartialData: ITorder = {
  id: 11430,
  date: dayjs('2023-09-07T21:13'),
  status: Status['IN_PROGRESS'],
};

export const sampleWithFullData: ITorder = {
  id: 6172,
  date: dayjs('2023-09-08T02:34'),
  total: 31139,
  status: Status['CANCELLED'],
};

export const sampleWithNewData: NewTorder = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
