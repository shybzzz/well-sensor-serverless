import { client } from './athena-manager';
import { AthenaExecutionResult } from 'athena-client';

export function getLastSeen(
  device: string
): Promise<AthenaExecutionResult<{ date: string }>> {
  return client
    .execute<{ date }>(
      `SELECT date FROM combined_sensor.data WHERE device=\'${device}\' ORDER BY date DESC limit 1;`
    )
    .toPromise();
}

export const DataRepository = { getLastSeen };
