import type { Metadata, Viewport } from 'next';
import './globals.css';
import { FitnessProvider } from '../components/fitness-provider';
import { AppShell } from '../components/app-shell';
import { PwaRegister } from '../components/pwa-register';
import { PrintProgram } from '../components/print-program';

export const metadata: Metadata = {
  title: 'FitnessCut | 80 → 68',
  description: 'وب‌اپ شخصی کات، تغذیه، تمرین PPL، مکمل و پیگیری وزن',
  applicationName: 'FitnessCut',
  appleWebApp: { capable:true, statusBarStyle:'black-translucent', title:'FitnessCut' },
  formatDetection: { telephone:false },
  manifest: '/manifest.webmanifest',
  icons: { icon:[{url:'/icons/icon-192.png',sizes:'192x192',type:'image/png'},{url:'/icons/icon-512.png',sizes:'512x512',type:'image/png'}], apple:'/icons/apple-touch-icon.png' }
};
export const viewport: Viewport = { width:'device-width', initialScale:1, viewportFit:'cover', themeColor:'#064E3B' };

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="fa" dir="rtl" suppressHydrationWarning><body><FitnessProvider><PwaRegister/><AppShell>{children}</AppShell><PrintProgram/></FitnessProvider></body></html>
}
