import {Room} from '@sct-myc/api-interfaces';

export interface RoomUpdatedEvent {
  room: Room;
  fieldNames: string[];
  fields: RoomField[];
}

export interface RoomField {
  name: string;
  value: any;
}
