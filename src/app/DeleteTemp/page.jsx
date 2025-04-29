import Payment from '../removeDelTemp/page'
import { Suspense } from 'react'

export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Payment />
      </Suspense>
    );
  }