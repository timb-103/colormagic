import type { PlausibleEventName } from '../types';

/** @description simple wrapper so we can define event names */
export function sendPlausibleEvent(name: PlausibleEventName): void {
  useTrackEvent(name);
}
