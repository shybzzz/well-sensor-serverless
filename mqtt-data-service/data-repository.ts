import { client } from './athena-manager';
import { AthenaExecutionResult } from 'athena-client';
import { DataRecord } from './data-record';

export function getLastRecords(
  device: string,
  limit: string
): Promise<AthenaExecutionResult<DataRecord>> {
  return client
    .execute<DataRecord>(
      `
      SELECT * 
      FROM combined_sensor.data 
      WHERE device=\'${device}\' 
      ORDER BY date DESC LIMIT ${limit};
      `
    )
    .toPromise();
}

export function getLastSeen(
  device: string
): Promise<AthenaExecutionResult<{ date: string }>> {
  return client
    .execute<DataRecord>(
      `
      SELECT date FROM combined_sensor.data 
      WHERE device=\'${device}\' 
      ORDER BY date DESC LIMIT 1;
      `
    )
    .toPromise();
}

export function countPerPeriod(
  device: string,
  dateTrunc: string,
  startDate: string,
  endDate: string
): Promise<AthenaExecutionResult<{ count: string }>> {
  return client
    .execute<{ count: string }>(
      `
      SELECT ${dateTrunc}, COUNT(*) AS count
      FROM  "combined_sensor"."${device}"
      WHERE ${dateTrunc} >= CAST('${startDate}' AS DATE)
      AND ${dateTrunc} < CAST('${endDate}' AS DATE)
      GROUP BY ${dateTrunc}
      `
    )
    .toPromise();
}

export const DataRepository = { getLastRecords, getLastSeen, countPerPeriod };
