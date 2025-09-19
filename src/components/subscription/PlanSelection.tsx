import { Plan, plans } from '@/data/card-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface PlanSelectionProps {
  selectedPlan?: Plan;
}

export default function PlanSelection({ selectedPlan }: PlanSelectionProps) {
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-foreground mb-2'>요금제를 선택하세요</h2>
        <p className='text-muted-foreground mb-2'>{'필요에 맞는 플랜을 선택하세요. 언제든지 변경할 수 있습니다.'}</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6'>
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all duration-200 hover:scale-[1.02] flex flex-col h-full ${
              selectedPlan?.id === plan.id ? 'ring-2 ring-primary bg-card shadow-lg' : 'hover:shadow-lg bg-card'
            }`}
          >
            {plan.isPopular && (
              <Badge className='absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground z-10'>
                추천
              </Badge>
            )}
            <CardHeader className='text-center pb-4 flex-shrink-0'>
              <CardTitle className='text-xl font-bold text-card-foreground'>{plan.name}</CardTitle>
              <CardDescription className='text-muted-foreground text-sm'>{plan.description}</CardDescription>
              <div className='mt-4'>
                <span className='text-3xl font-bold text-card-foreground'>₩{plan.price.toLocaleString()}</span>
                <span className='text-muted-foreground'>/월</span>
              </div>
            </CardHeader>
            <CardContent className='flex flex-col flex-grow'>
              <ul className='space-y-3 flex-grow'>
                {plan.features.map((feature, index) => (
                  <li key={index} className='flex items-start gap-2'>
                    <span className='w-4 h-4 text-primary flex-shrink-0 mt-0.5'>✓</span>
                    <span className='text-sm text-card-foreground leading-relaxed'>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className='w-full mt-6' variant={plan.isPopular ? 'default' : 'outline'}>
                {plan.name} 선택
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
