export interface HealthBookletRequest {
  firstName: string;
  lastName: string;
  relation: string;
  underSupport: boolean; // تحت تکفل
  requestType: string;   // صدور اولیه / تمدید / تعویض
  deliveryMethod: string; // پست / حضوری
  deliveryCost?: number;
  photo?: File | null;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  uploaded: boolean;
}
