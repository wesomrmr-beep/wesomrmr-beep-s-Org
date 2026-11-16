import React from 'react';

interface SunnaLogoProps {
  variant?: 'light' | 'dark';
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

/**
 * Geometric Arabic logo combining bold letter "ص" with an integrated spanner tool motif.
 * - variant="light": Navy (#1B365D) + Industrial Orange (#F58220) for light backgrounds (#F8F9FA / white)
 * - variant="dark": Crisp White (#FFFFFF) + Industrial Orange (#F58220) for dark backgrounds (#1B365D)
 */
export const SunnaLogo: React.FC<SunnaLogoProps> = ({
  variant = 'light',
  size = 44,
  showWordmark = true,
  className = '',
}) => {
  const primaryColor = variant === 'dark' ? '#FFFFFF' : '#1B365D';
  const accentColor = '#F58220';
  const containerBg = variant === 'dark' ? 'rgba(255,255,255,0.08)' : '#1B365D';
  const innerPrimary = variant === 'dark' ? '#FFFFFF' : '#FFFFFF';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="شعار تطبيق صُنّاع"
        className="shrink-0"
      >
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill={variant === 'dark' ? containerBg : '#1B365D'}
          stroke={variant === 'dark' ? 'rgba(255,255,255,0.22)' : 'none'}
          strokeWidth="1.5"
        />
        {/* Structural architectural grid corner accent */}
        <path
          d="M14 16H28"
          stroke={accentColor}
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Stylized geometric Arabic letter ص (Saad) integrated with Spanner jaw */}
        <path
          d="M48 36C48 27.1634 40.8366 20 32 20C25.5 20 20.5 24 19 29.5L13 36H48Z"
          stroke={innerPrimary}
          strokeWidth="5.2"
          strokeLinejoin="round"
        />
        {/* Base horizontal stroke + downward bowl hook of ص */}
        <path
          d="M13 36V44C13 47.866 16.134 51 20 51H26"
          stroke={innerPrimary}
          strokeWidth="5.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Integrated Spanner Wrench head on the right edge */}
        <path
          d="M36 44H47L51 40M47 44L51 48"
          stroke={accentColor}
          strokeWidth="4.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark && (
        <span
          className="font-display font-extrabold tracking-tight leading-none whitespace-nowrap"
          style={{
            color: primaryColor,
            fontSize: size >= 56 ? '1.85rem' : size >= 40 ? '1.35rem' : '1.1rem',
          }}
        >
          صُنّاع
        </span>
      )}
    </div>
  );
};
