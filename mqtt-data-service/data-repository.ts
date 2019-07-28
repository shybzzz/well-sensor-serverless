import { client } from './athena-manager';
import { AthenaExecutionResult } from 'athena-client';
import { DataRecord } from './data-record';

export function getLastSeen(
  device: string
): Promise<AthenaExecutionResult<DataRecord>> {
  return client
    .execute<DataRecord>(
      `SELECT date FROM combined_sensor.data WHERE device=\'${device}\' ORDER BY date DESC limit 1;`
    )
    .toPromise();
}

export const DataRepository = { getLastSeen };
