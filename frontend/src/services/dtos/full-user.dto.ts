import {ProfileDto} from "./profile.dto";
import {CompanyDto} from "./company.dto";
import {TeamDto} from "./team.dto";

export interface FullUserDto {
  id: number,
  profile: ProfileDto,
  isAdmin: boolean,
  active: boolean,
  status: string,
  companies: [CompanyDto],
  teams: [TeamDto]
}
