import dayjs from 'dayjs/esm';

import { Status } from 'app/entities/enumerations/status.model';

import { ITorder, NewTorder } from './torder.model';

export const sampleWithRequiredData: ITorder = {
  id: 73921,
  date: dayjs('2023-09-08T08:48'),
  total: 18390,
  status: Status['READY'],
};

export const sampleWithPartialData: ITorder = {
  id: 11430,
  date: dayjs('2023-09-08T21:42'),
  total: 24366,
  status: Status['IN_PROGRESS'],
};

export const sampleWithFullData: ITorder = {
  id: 19815,
  date: dayjs('2023-09-09T00:19'),
  total: 45522,
  status: Status['IN_PROGRESS'],
};

export const sampleWithNewData: NewTorder = {
  date: dayjs('2023-09-09T05:39'),
  total: 88820,
  status: Status['IN_PROGRESS'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
