export interface AssetBalance {
  symbol: string;
  amount: number;
  averagePrice: number;
  purchaseAmount: number;
  evaluationAmount: number;
  profitLoss: number;
  profitLossPercentage: number;
}

export interface AssetsOverview {
  krwBalance: number;
  totalAssets: number;
  totalPurchase: number;
  totalEvaluation: number;
  totalProfitLoss: number;
  profitRate: number;
  availableOrder: number;
}