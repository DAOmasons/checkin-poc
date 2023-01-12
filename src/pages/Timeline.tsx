import {
  Button,
  Card,
  ParLg,
  ParMd,
  ParSm,
  ParXs,
  SingleColumnLayout,
  Spinner,
  Theme,
  TintSecondary,
  Tooltip,
} from '@daohaus/ui';
import {
  formatPeriods,
  formatShortDateTimeFromSeconds,
  formatValueTo,
  fromWei,
  truncateAddress,
} from '@daohaus/utils';
import React from 'react';
import styled from 'styled-components';
import { useCheckInLogs } from '../hooks/useCheckInLogs';
import { TARGET_DAO } from '../targetDAO';
import { CheckIn, CorruptMetadata } from '../types';

const isCorruptMetadata = (log: any): log is CorruptMetadata => log?.error;

export const Timeline = () => {
  const { logs, isLoading, failureCount } = useCheckInLogs({
    shamanAddress: TARGET_DAO.SHAMAN,
    chainId: TARGET_DAO.CHAIN_ID,
  });

  if (isLoading) {
    return (
      <SingleColumnLayout title="Loading Timeline">
        <Spinner size="12rem" />
        <ParMd>Fetching data from RPC. This may take longer than usual.</ParMd>
        <ParMd>{failureCount}/3 Attempts</ParMd>
      </SingleColumnLayout>
    );
  }

  return (
    <SingleColumnLayout title="Work Timeline">
      {logs?.map((log) => {
        if (isCorruptMetadata(log)) {
          return <MetaDataCorruptLog key={log.id} {...log} />;
        }
        return <Log key={log.id} {...log} />;
      })}
    </SingleColumnLayout>
  );
};

const ClaimCard = styled(Card)`
  width: 100%;
  margin-bottom: 2rem;
`;

const CorruptCard = styled(ClaimCard)`
  background-color: ${({ theme }: { theme: Theme }) => theme.warning.step2};
  border-color: ${({ theme }: { theme: Theme }) => theme.warning.step4};
`;

const TintError = styled.span`
  color: ${({ theme }: { theme: Theme }) => theme.warning.step11};
`;

const Log = ({
  memberAddress,
  tokenAmountClaimed,
  secondsWorked,
  description,
  timeStamp,
  morale,
  obstacles,
  future,
}: CheckIn) => {
  const [showMore, setShowMore] = React.useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <ClaimCard>
      <ParSm className="mb-sm">
        <TintSecondary>
          {formatShortDateTimeFromSeconds(timeStamp)}
        </TintSecondary>
      </ParSm>
      <ParLg className="mb-md">
        {truncateAddress(memberAddress)} claimed{' '}
        {formatValueTo({
          value: fromWei(tokenAmountClaimed),
          decimals: 2,
          format: 'numberShort',
        })}{' '}
        shares for {formatPeriods(secondsWorked)} worked
      </ParLg>
      <Button onClick={toggleShowMore} variant="link" className="mb-md">
        {showMore ? 'Hide Details' : 'Show Details'}
      </Button>
      {showMore && (
        <>
          <ParXs className="uppercase mb-xs">Morale:</ParXs>
          <ParMd className="mb-md">
            <TintSecondary>{morale}</TintSecondary>
          </ParMd>
          <ParXs className="uppercase mb-xs">Work Description:</ParXs>
          <ParMd className="mb-md">
            <TintSecondary>{description}</TintSecondary>
          </ParMd>
          <ParXs className="uppercase mb-xs">Obstacles:</ParXs>
          <ParMd className="mb-md">
            <TintSecondary>{obstacles}</TintSecondary>
          </ParMd>
          <ParXs className="uppercase mb-xs">Future:</ParXs>
          <ParMd className="mb-md">
            <TintSecondary>{future}</TintSecondary>
          </ParMd>
        </>
      )}
    </ClaimCard>
  );
};

const MetaDataCorruptLog = ({
  memberAddress,
  timeStamp,
  secondsWorked,
  tokenAmountClaimed,
  description,
  type,
}: CorruptMetadata) => {
  const [showMore, setShowMore] = React.useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <CorruptCard>
      <ParSm className="mb-sm">
        <TintError>
          <Tooltip content={`${type}: ${description}`} />{' '}
          {formatShortDateTimeFromSeconds(timeStamp)}
        </TintError>
      </ParSm>
      <ParLg className="mb-md">
        {truncateAddress(memberAddress)} claimed{' '}
        {formatValueTo({
          value: fromWei(tokenAmountClaimed),
          decimals: 2,
          format: 'numberShort',
        })}{' '}
        shares for {formatPeriods(secondsWorked)} worked
      </ParLg>
      <Button onClick={toggleShowMore} variant="link" className="mb-md">
        {showMore ? 'Hide Details' : 'Show Details'}
      </Button>
      {showMore && (
        <>
          <ParXs className="uppercase mb-xs">Error Type:</ParXs>
          <ParMd className="mb-md">
            <TintError>{type}</TintError>
          </ParMd>
          <ParXs className="uppercase mb-xs">Error Description:</ParXs>
          <ParMd className="mb-md">
            <TintError>{description}</TintError>
          </ParMd>
        </>
      )}
    </CorruptCard>
  );
};
