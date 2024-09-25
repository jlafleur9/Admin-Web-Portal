import Profile from './Profile';

export default interface Teammate {
  id: number;
  profile: Profile;
  admin: boolean;
  active: boolean;
  status: string;
}
