export class CityBankLoanRequest {
  branchName?: string;
  branchCode?: string;
  facilityGiverDesc: string;
  facilityAmount?: number;
  facilityInstalementCount?: number;
  needGuarantor?: boolean;
  referralToCommittee?: boolean;
  requestDescription?: string;
  facilityInstalementAmount?: number;

  constructor() {
    this.facilityGiverDesc = `${this.branchName}-${this.branchCode}`;
  }
}

/*
{
  "installmentAmount": 15483889,
  "guarantorCost": 10000000,
  "description": "",
  "needGuarantor": true,
  "attachments": []
}*/
