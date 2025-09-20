export interface WelfareCardRequest {
  cardNumber?: string;
  issueType: string; // اولین بار / المثنی / رفع نقص
  issueDate?: string;
  previousCardNumber?: string;
  description?: string;
  deliveryMethod: string; // پست / حضوری / نماینده
  receiverName?: string;
  issueCost: number;
  postCost?: number;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
