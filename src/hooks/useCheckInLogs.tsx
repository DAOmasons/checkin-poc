import { createContract } from '@daohaus/tx-builder';
import { ValidNetwork } from '@daohaus/keychain-utils';
import CheckInShamanABI from '../abi/CheckInShaman.json';
import { useQuery } from 'react-query';
import { CheckIn, CorruptMetadata } from '../types';

const handleCorruptMetadata = (arg: any): CorruptMetadata => {
  return {
    id: `${arg?.account}-${arg?.timestamp}`,
    error: true,
    type: 'Corrupt Metadata',
    description:
      'User did not provide the correct metadata to the contract. Shares were still claimed, however the data is not available to display. Verify this claim with the team member to ensure that this claim is legitimite.',
    memberAddress: arg?.account,
    secondsWorked: arg?.secondsWorked,
    tokenAmountClaimed: arg?.tokenAmountClaimed.toString(),
    timeStamp: arg?.timestamp.toString(),
  };
};

const resolveEventData = (arg: any): CheckIn | CorruptMetadata => {
  if (JSON.parse(arg?.metadata || '{}')?.version !== 0.1) {
    return handleCorruptMetadata(arg);
  }
  const { account, timestamp, secondsWorked, metadata, tokenAmountClaimed } =
    arg;
  const { version, morale, description, future, obstacles } =
    JSON.parse(metadata) || {};

  return {
    id: `${account}-${timestamp}`,
    claimVersion: version,
    morale,
    description,
    future,
    obstacles,
    memberAddress: account,
    secondsWorked,
    tokenAmountClaimed: tokenAmountClaimed.toString(),
    timeStamp: timestamp.toString(),
  };
};

const fetchShamanLogs = async ({
  shamanAddress,
  chainId,
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
}) => {
  const checkInContract = createContract({
    address: shamanAddress,
    abi: CheckInShamanABI,
    chainId,
  });

  try {
    const logs = await checkInContract.queryFilter('Claim');
    console.log('logs', logs);
    return logs
      .map((log) => resolveEventData(log.args))
      .sort((a, b) => (Number(a.timeStamp) > Number(b.timeStamp) ? -1 : 1));
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.message || 'Error fetching check in logs');
  }
};

export const useCheckInLogs = ({
  shamanAddress,
  chainId,
}: {
  shamanAddress: string;
  chainId: ValidNetwork;
}) => {
  const { data, error, ...rest } = useQuery(
    [`checkInShaman-${shamanAddress}`, { shamanAddress, chainId }],
    () =>
      fetchShamanLogs({
        shamanAddress,
        chainId,
      }),
    { enabled: !!shamanAddress && !!chainId }
  );

  return { logs: data, error: error as Error, ...rest };
};
