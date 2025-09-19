export type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
};

export const plans: Plan[] = [
  {
    id: 'plus',
    name: 'Plus',
    price: 9900,
    description: '개인 사용자를 위한 기본 플랜',
    features: ['월 100개 프로젝트', '5GB 저장공간', '기본 지원', '모바일 앱 접근', '기본 분석'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19900,
    description: '전문가를 위한 고급 플랜',
    features: ['월 500개 프로젝트', '50GB 저장공간', '우선 지원', '고급 분석', 'API 접근', '팀 협업 도구'],
    isPopular: true,
  },
  {
    id: 'max',
    name: 'Max',
    price: 39900,
    description: '기업을 위한 최고급 플랜',
    features: [
      '무제한 프로젝트',
      '500GB 저장공간',
      '24/7 전담 지원',
      '고급 보안',
      '사용자 정의 통합',
      '전용 계정 관리자',
    ],
  },
];
