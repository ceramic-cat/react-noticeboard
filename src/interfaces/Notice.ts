export default interface OutputNotice {
  id: number;
  userId: string;
  header: string;
  textBody: number;
  timeStampCreated: string;
  categories: string[];
}