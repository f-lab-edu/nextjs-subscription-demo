export default function Home() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-foreground mb-2'>구독 서비스</h1>
            <p className='text-muted-foreground'>
              {'간편하게 시작하세요. 언제든지 업그레이드하거나 취소할 수 있습니다.'}
            </p>
          </div>

          <div className='mt-8'>{/* 컴포넌트 위치 */}</div>
        </div>
      </div>
    </div>
  );
}
