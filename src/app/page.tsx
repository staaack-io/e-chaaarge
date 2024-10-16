import AffichageBornes from '@/components/AffichageBornes'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bienvenue sur e-chaaarge</h1>
      <AffichageBornes />
    </div>
  )
}