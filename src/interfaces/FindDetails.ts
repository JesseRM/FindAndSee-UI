import { UUID } from "crypto";

export default interface FindDetails {
  findId: UUID;
  title: string;
  displayName: string;
  dateCreated: string;
  imageUrl: string;
  longitude: number;
  latitude: number;
  description: string;
}
