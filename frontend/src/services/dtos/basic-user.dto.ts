import {ProfileDto} from "./profile.dto";

export interface BasicUserDto {
  id: number,
  profile: ProfileDto,
  isAdmin: boolean,
  active: boolean,
  status: string
}
