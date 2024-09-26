import { BasicUserDto } from "./basic-user.dto";


export interface RequestAnnouncementDto {
  id: number | null;
  date: string;
  title: string;
  message: string;
  author: {
    id: number
  }
}

export interface ResponseAnnouncementDto {
  id: number | null;
  date: string;
  title: string;
  message: string;
  author: BasicUserDto;
}
