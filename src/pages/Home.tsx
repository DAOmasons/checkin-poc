import { useDHConnect } from '@daohaus/connect';
import {
  Bold,
  Card,
  Divider,
  ErrorText,
  H2,
  Link,
  ParLg,
  ParMd,
  SingleColumnLayout,
} from '@daohaus/ui';
import styled from 'styled-components';
import { useCheckInData } from '../hooks/useCheckInData';
import { TARGET_DAO } from '../targetDAO';

const ClaimsDescription = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Home = () => {
  return (
    <SingleColumnLayout>
      <ClaimsDescription>
        <H2 className="mb-md">DAO Masons</H2>
        <ParLg></ParLg>
        <InfoDisplay />
      </ClaimsDescription>
    </SingleColumnLayout>
  );
};

const CenterBox = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 2rem;
  }
  .space {
    margin-bottom: 2rem;
  }
  width: 60rem;
`;

const InfoDisplay = () => {
  return (
    <CenterBox>
      <ParMd>
        <Bold>Step 1:</Bold> Read the DAOhaus{' '}
        <Link href="/manifesto">Manifesto</Link> and make sure that you align
        with the values.
      </ParMd>
      <ParMd>
        <Bold>Step 2:</Bold> Stake for DAO shares.
        <Link href="/join">here</Link>
      </ParMd>
      <ParMd>
        <Bold>Step 3:</Bold> Verification requires a DAO vote to ensure you are
        a real person, and you are aligned with the DAOhaus mission. Create a
        DAO proposal <Link href="/apply">here</Link>. <Bold>Or</Bold> delegate
        your shares to a verified delegate <Link href="/delegates">here</Link>.
        You can read their platform on their profile page.
      </ParMd>
    </CenterBox>
  );
};

const ShamanDataDisplay = () => {
  const { address } = useDHConnect();

  const { data, isLoading } = useCheckInData({
    shamanAddress: TARGET_DAO.SHAMAN,
    chainId: TARGET_DAO.CHAIN_ID,
    userAddress: address as string,
  });

  if (isLoading)
    return (
      <Card>
        <ParMd>Loading Shaman Data...</ParMd>;
      </Card>
    );

  return (
    <Card>
      <ParLg>Shaman Information</ParLg>
    </Card>
  );
};
