import { UUID } from "crypto";
import Image from "./Image";
import User from "./User";

export default interface Find {
  findId: UUID;
  title: string;
  dateCreated: string;
  longitude: number;
  latitude: number;
  description: string;
  image: Image;
  user: User;
}
