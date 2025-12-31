'use client';

import React from 'react';
import { ConfigProvider } from 'antd';
import { StyleProvider } from '@ant-design/cssinjs';

// Convert OKLCH to RGB for Ant Design
// oklch(0.71 0.15 239.15) ≈ rgb(89, 107, 209)
const PRIMARY_COLOR = '#596BD1';

export default function AntdRegistry({ children }: { children: React.ReactNode }) {
  return (
    <StyleProvider hashPriority="high">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR,
            colorLink: PRIMARY_COLOR,
            colorSuccess: '#10b981',
            colorWarning: '#f59e0b',
            colorError: '#ef4444',
            colorInfo: PRIMARY_COLOR,
            colorTextBase: '#1a1a1a',
            colorBgBase: '#ffffff',
            borderRadius: 8,
            fontFamily: 'var(--font-sans)',
          },
          components: {
            Button: {
              controlHeight: 40,
              borderRadius: 8,
            },
            Input: {
              controlHeight: 40,
              borderRadius: 8,
            },
            Select: {
              controlHeight: 40,
              borderRadius: 8,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
}
