import React from 'react';
import { Brain, TrendingUp, TrendingDown, Minus, Target, Shield } from 'lucide-react';
import { aiInsights } from '../../data/mockData';

export const AIInsights: React.FC = () => {
  const getActionIcon = (action: string) => {
    switch (action) {
      case 'BUY':
        return <TrendingUp className="h-4 w-4 text-profit" />;
      case 'SELL':
        return <TrendingDown className="h-4 w-4 text-loss" />;
      default:
        return <Minus className="h-4 w-4 text-warning" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY':
        return 'text-profit border-profit/20 bg-profit/5';
      case 'SELL':
        return 'text-loss border-loss/20 bg-loss/5';
      default:
        return 'text-warning border-warning/20 bg-warning/5';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">AI Trading Insights</h2>
      </div>

      <div className="space-y-3">
        {aiInsights.map((insight) => (
          <div key={insight.symbol} className="glass-card rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground">{insight.symbol}</h3>
                <p className="text-sm text-muted-foreground">{insight.timeFrame}</p>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getActionColor(insight.action)}`}>
                {getActionIcon(insight.action)}
                <span className="text-sm font-medium">{insight.action}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Confidence</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        insight.confidence >= 80 ? 'bg-profit' : 
                        insight.confidence >= 60 ? 'bg-warning' : 'bg-loss'
                      }`}
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">{insight.confidence}%</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{insight.reason}</p>

              {insight.targetPrice && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <Target className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Target</span>
                  </div>
                  <span className="text-sm font-medium text-profit">₹{insight.targetPrice}</span>
                </div>
              )}

              {insight.stopLoss && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Stop Loss</span>
                  </div>
                  <span className="text-sm font-medium text-loss">₹{insight.stopLoss}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-lg p-4 mt-6">
        <h3 className="font-semibold text-foreground mb-3">Auto-Trading Settings</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Auto-Trading</span>
            <button className="theme-toggle bg-secondary">
              <span className="theme-toggle-thumb bg-primary translate-x-0"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Max Daily Limit</span>
            <span className="text-sm font-medium text-foreground">₹50,000</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Risk Level</span>
            <span className="text-sm font-medium text-warning">Medium</span>
          </div>
        </div>
      </div>
    </div>
  );
};