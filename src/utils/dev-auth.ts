export const getDevUserId = (): string => {
  const userId = process.env.NEXT_PUBLIC_DEV_USER_ID;
  if (!userId) {
    throw new Error('DEV_USER_ID가 환경변수에 설정되지 않았습니다.');
  }
  return userId;
};
