export type CheckIn = {
  id: string;
  timeStamp: string;
  claimVersion: number;
  description: string;
  future: string;
  memberAddress: string;
  morale: string;
  secondsWorked: string;
  obstacles: string;
  tokenAmountClaimed: string;
};

export type CorruptMetadata = {
  id: string;
  error: boolean;
  secondsWorked: string;
  tokenAmountClaimed: string;
  timeStamp: string;
  memberAddress: string;
  description: string;
  type: 'Corrupt Metadata';
};
