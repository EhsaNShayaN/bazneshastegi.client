/*import {Profile} from './UserResponse';*/
import {Paginated} from './Pagination';

export interface CommentResponse {
  data: Paginated<Comment>;
}

export interface Comment {
  id: string;
  icon: string;
  description: string;
  relatedId: string;
  tableId: number;
  tableName: string;
  data: string;
  answers: string[];
  isConfirmed: boolean;
  creationDate: string;
  //profile: Profile;
}
