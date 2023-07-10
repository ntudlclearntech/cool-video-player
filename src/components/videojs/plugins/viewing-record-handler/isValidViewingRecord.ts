import { ViewingRecord } from "./models/viewing-record.model";

export function isValidViewingRecord(record: ViewingRecord): boolean {
  return (isPlayingRecord(record) || isSeekingRecord(record))
}

function isPlayingRecord(record: ViewingRecord): boolean {
  return ((record.end > record.start) && (record.playbackRate != 0));
}

function isSeekingRecord(record: ViewingRecord): boolean {
  return ((record.end != record.start) && (record.playbackRate == 0));
}
