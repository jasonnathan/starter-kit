import { type ObjectId } from 'mongodb';

export interface Badge {
  _id: ObjectId | string;
  name: string;
  displayName: string;
  infoUrl: string;
  image: string;
  description: string;
}
export interface UserBadgeMap {
  _id: ObjectId;
  user: ObjectId;
  post: ObjectId;
  badge: ObjectId | Badge;
  metaData?: object;
  isActive: boolean;
  assignedOn: Date;
  isSuppressed?: boolean;
  hiddenFromPublication?: boolean;
  actionUrl: string;
}
