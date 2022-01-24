// Doc Link:  https://m8j6huhbzo.feishu.cn/docs/doccn5Sh4ZXxpODCVZ2ddgc6HQc

export interface RawCheckListItem {
  chainId: number;
  address: string;
}

export interface Rules {
    // once hit gain 5 10 20 point in raise of risk factor
  easy: string[];
  medium: string[];
  hard: string[];
}

interface ContractSecurity {
  is_open_source?: 0 | 1;
  is_proxy?: 0 | 1;
  is_mintable?: 0 | 1;
  can_take_back_ownership?: string;
  owner_address?: string;
}

interface Holder {
  address?: string;
  locked?: 0 | 1;
  tag?: string;
  is_contract?: 0 | 1;
  balance?: number;
  percent?: number;
}

interface TokenSecurity {
  holder_count?: number;
  total_supply?: number;
  holders?: Holder[];

  lp_holder_count?: number;
  lp_total_supply?: number;
  lp_holders?: Holder[];

  is_true_token?: 0 | 1;
  is_verifiable_team?: 0 | 1;
  is_airdrop_scam?: 0 | 1;
}
