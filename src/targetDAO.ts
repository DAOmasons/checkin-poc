import { EthAddress } from '@daohaus/utils';
import { ValidNetwork } from '@daohaus/keychain-utils';

export const TARGET_DAO: {
  ID: EthAddress;
  CHAIN_ID: ValidNetwork;
  SHAMAN: EthAddress;
} = {
  ID: '0xddd21798f65b0f3d79929446039f70b3a5641527',
  CHAIN_ID: '0x64',
  SHAMAN: '0x8d53663810824716b2baDBc9B5f486b36C13e4bE',
};

export const RITUAL_DATA = {
  RITUAL_NAME: '',
  SHARES_PER_SECOND: '',
  SHARES_PER_HOUR: '',

};

export const PROJECT_DATA = {
  PROJECT_NAME: 'Build DAO Masons',
  BRIEF: 'Building the DAO Masons DAO, Game Design Doc, and App',
  DESCRIPTION:
    "We're building a DAO. From the social game mechanics of the DAO, to enshrining those mechanics in code. Our goal is to deliver an app that serves as both a showcase demo of our capabilities and a place to coordinate our future projects.",
  KEY_DELIVERABLES: [
    'DAO Masons DAO',
    'Game Design Doc',
    'App',
    'Logos and Branding'
  ],
  KANBAN_LINK: '',
  PROJECT_LINK: '',
  GOALS: [],
};
