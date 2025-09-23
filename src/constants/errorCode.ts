export const ERROR_CODE: Record<string | number, string> = {
  400: '잘못된 요청입니다. 입력 정보를 확인해주세요.',
  401: '인증이 필요합니다. 다시 로그인해주세요.',
  403: '접근 권한이 없습니다.',
  404: '요청하신 정보를 찾을 수 없습니다.',
  408: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
  429: '너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '서버 연결에 문제가 있습니다.',
  503: '서비스를 일시적으로 사용할 수 없습니다.',

  USER_NOT_FOUND: '사용자 정보를 찾을 수 없습니다.',
  USER_UPDATE_FAILED: '사용자 정보 업데이트에 실패했습니다.',
  INVALID_USER_DATA: '올바르지 않은 사용자 정보입니다.',

  CARD_NOT_FOUND: '등록된 카드를 찾을 수 없습니다.',
  CARD_REGISTRATION_FAILED: '카드 등록에 실패했습니다.',
  INVALID_CARD_INFO: '올바르지 않은 카드 정보입니다.',
  PAYMENT_FAILED: '결제에 실패했습니다.',
  PAYMENT_CANCELLED: '결제가 취소되었습니다.',

  SUBSCRIPTION_NOT_FOUND: '구독 정보를 찾을 수 없습니다.',
  SUBSCRIPTION_FAILED: '구독 처리에 실패했습니다.',
  SUBSCRIPTION_ALREADY_EXISTS: '이미 활성화된 구독이 있습니다.',
  PLAN_NOT_FOUND: '선택한 플랜을 찾을 수 없습니다.',

  // 쿠폰 관련 에러
  COUPON_NOT_FOUND: '쿠폰을 찾을 수 없습니다.',
  COUPON_EXPIRED: '만료된 쿠폰입니다.',
  COUPON_ALREADY_USED: '이미 사용된 쿠폰입니다.',
  INVALID_COUPON: '유효하지 않은 쿠폰입니다.',

  NETWORK_ERROR: '네트워크 연결을 확인해주세요.',
  CONNECTION_TIMEOUT: '연결 시간이 초과되었습니다.',

  TOKEN_EXPIRED: '인증 토큰이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_TOKEN: '올바르지 않은 인증 토큰입니다.',

  DATABASE_ERROR: '데이터베이스 오류가 발생했습니다.',
  DATA_NOT_FOUND: '요청한 데이터를 찾을 수 없습니다.',

  default: '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  UNKNOWN_ERROR: '알 수 없는 오류가 발생했습니다.',
} as const;
