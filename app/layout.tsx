import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {title:{default:'Beauty Mondial Academy | Coworking Beauté',template:'%s | Beauty Mondial Academy'},description:'Un espace de coworking beauté premium et équipé, pensé pour recevoir vos clientes sans engagement.',openGraph:{title:'Beauty Mondial Academy',description:'Coworking beauté premium',type:'website',locale:'fr_FR'},twitter:{card:'summary_large_image'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}</body></html>}
