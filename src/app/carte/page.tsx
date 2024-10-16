import dynamic from 'next/dynamic'

const CarteBornes = dynamic(() => import('@/components/CarteBornes'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>
})

export default function CartePage() {
  return (
    <div className="h-[calc(100vh-64px)]">
      <CarteBornes />
    </div>
  )
}